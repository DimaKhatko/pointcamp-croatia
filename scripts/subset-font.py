"""Builds src/assets/fonts/KyivTypeSans-Sub.woff2 from the full variable font.

Dev-only (not part of the build). Re-run after replacing the source font or when
the page starts using characters outside the ranges below:
    pip install fonttools brotli
    python3 scripts/subset-font.py

Keeps only the `wght` axis (pinned range 400-800: every weight the page uses; the
CONT and MIDL axes are pinned to their defaults, which is what the page renders)
and the Latin (incl. Extended-A), Cyrillic and punctuation ranges listed in UNICODES.
"""
import io
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/fonts/KyivTypeSans-VarGX.woff2"
OUT = ROOT / "src/assets/fonts/KyivTypeSans-Sub.woff2"

UNICODES = (
    list(range(0x20, 0x7F))  # Basic Latin
    + list(range(0xA0, 0x100))  # Latin-1 (nbsp, «», ©, °, ·, ×, …)
    + list(range(0x100, 0x180))  # Latin Extended-A (š č ž ć đ in Croatian place names)
    + list(range(0x400, 0x460))  # Cyrillic (incl. Ukrainian Є І Ї)
    + [0x490, 0x491, 0x2116]  # Ґ ґ №
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E]  # dashes, quotes
    + [0x2022, 0x2026, 0x2032, 0x2039, 0x203A, 0x20AC, 0x2122]  # • … ′ ‹ › € ™
    + [0x2190, 0x2191, 0x2192, 0x2193, 0x2212, 0x2264, 0x2265]  # arrows, − ≤ ≥
)

font = TTFont(SRC)
options = subset.Options()
options.layout_features = ["*"]
options.name_IDs = ["*"]
options.notdef_outline = True
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=UNICODES)
subsetter.subset(font)

buffer = io.BytesIO()
font.flavor = None
font.save(buffer)
font = TTFont(io.BytesIO(buffer.getvalue()), lazy=False)
font = instancer.instantiateVariableFont(font, {"CONT": 0, "MIDL": 0, "wght": (400, 800)})
font.flavor = "woff2"
font.save(OUT)
print(f"{OUT.relative_to(ROOT)}: {OUT.stat().st_size / 1024:.0f} KiB")
