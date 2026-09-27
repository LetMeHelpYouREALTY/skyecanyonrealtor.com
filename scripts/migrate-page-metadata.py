#!/usr/bin/env python3
"""Wrap page metadata exports with pageMetadata() for per-path canonicals."""

import re
import sys
from pathlib import Path

APP = Path(__file__).resolve().parents[1] / "app"

TITLE_RE = re.compile(r'^\s*title:\s*("([^"]*)"|`([^`]*)`|\{[^}]+\}),?\s*$', re.M)
DESC_RE = re.compile(
    r'^\s*description:\s*("""[\s\S]*?"""|"[^"]*"|`[^`]*`|\{[^}]+\}),?\s*$',
    re.M,
)


def path_from_file(page: Path) -> str:
    rel = page.relative_to(APP).as_posix()
    if rel == "page.tsx":
        return "/"
    parts = rel.replace("/page.tsx", "").split("/")
    return "/" + "/".join(parts)


def strip_bhhs_from_title(title: str) -> str:
    t = title
    for phrase in (
        " | Berkshire Hathaway HomeServices Nevada Properties",
        " | Berkshire Hathaway HomeServices",
        " | BHHS Nevada Properties",
        "Berkshire Hathaway HomeServices Nevada Properties | ",
        "Berkshire Hathaway HomeServices ",
        "BHHS ",
    ):
        t = t.replace(phrase, " ")
    t = re.sub(r"\s+\|\s+\|", " |", t)
    t = re.sub(r"\s{2,}", " ", t).strip()
    t = re.sub(r"\s+\|$", "", t).strip()
    return t


def migrate_file(page: Path) -> bool:
    text = page.read_text(encoding="utf-8")
    if "pageMetadata(" in text:
        return False
    if "export const metadata" not in text and "export const metadata:" not in text:
        return False
    if "generateMetadata" in text:
        return False

    path = path_from_file(page)

    # Already uses pageMetadata import?
    needs_import = "from \"@/lib/page-metadata\"" not in text

    m = re.search(
        r"export const metadata(?::\s*Metadata)?\s*=\s*\{",
        text,
    )
    if not m:
        return False

    start = m.start()
    brace = text.find("{", m.end() - 1)
    depth = 0
    end = brace
    for i, ch in enumerate(text[brace:], start=brace):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    block = text[brace:end]
    title_m = TITLE_RE.search(block)
    if not title_m:
        return False
    title_raw = title_m.group(1)
    if title_m.group(2):
        title_val = strip_bhhs_from_title(title_m.group(2))
        title_expr = f'"{title_val}"'
    elif title_m.group(3):
        title_val = strip_bhhs_from_title(title_m.group(3))
        title_expr = f'"{title_val}"'
    else:
        title_expr = title_raw.rstrip(",")

    desc_m = DESC_RE.search(block)
    if not desc_m:
        return False
    desc_expr = desc_m.group(1).rstrip(",")

    keywords_m = re.search(r"keywords:\s*(\[[\s\S]*?\]),?", block)
    keywords_part = ""
    if keywords_m:
        keywords_part = f",\n  keywords: {keywords_m.group(1)}"

    new_block = f"""export const metadata = pageMetadata({{
  title: {title_expr},
  description: {desc_expr},
  path: "{path}"{keywords_part},
}})"""

    new_text = text[:start] + new_block + text[end:]

    if needs_import:
        if 'import type { Metadata } from "next";' in new_text:
            new_text = new_text.replace(
                'import type { Metadata } from "next";',
                'import { pageMetadata } from "@/lib/page-metadata";',
            )
        elif "import { pageMetadata }" not in new_text:
            new_text = 'import { pageMetadata } from "@/lib/page-metadata";\n' + new_text

    page.write_text(new_text, encoding="utf-8")
    return True


def main() -> int:
    changed = 0
    for page in sorted(APP.rglob("page.tsx")):
        if migrate_file(page):
            changed += 1
            print(page.relative_to(APP.parent))
    print(f"Migrated {changed} files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
