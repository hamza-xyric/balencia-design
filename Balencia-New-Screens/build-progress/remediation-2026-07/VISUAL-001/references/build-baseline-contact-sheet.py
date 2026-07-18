#!/usr/bin/env python3
"""Build the factual VISUAL-001 pilot baseline reference sheet.

The source screenshots are uniformly scaled and framed. Their pixels are not
retouched, recolored, regenerated, or otherwise altered.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[5]
SOURCE = (
    ROOT
    / "Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001"
    / "baselines/local-baseline"
)
OUTPUT = Path(__file__).with_name(
    "reference-image-2-current-prototype-baseline.png"
)

SCREENS = [
    ("03", "Signup"),
    ("07", "CIA onboarding"),
    ("11", "CIA voice"),
    ("12", "Today"),
    ("26", "Fitness"),
    ("43", "Upgrade"),
    ("80", "Music coach"),
]

CANVAS = (1600, 1770)
TILE = (310, 671)
MARGIN_X = 66
GAP_X = 76
ROW_Y = (152, 909)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("/System/Library/Fonts/SFNS.ttf"),
        Path("/System/Library/Fonts/SFNSRounded.ttf"),
        Path("/System/Library/Fonts/Helvetica.ttc"),
    ]
    for candidate in candidates:
        if candidate.exists():
            try:
                return ImageFont.truetype(str(candidate), size=size, index=1 if bold else 0)
            except OSError:
                continue
    return ImageFont.load_default()


def centered_x(width: int, count: int) -> list[int]:
    total = count * TILE[0] + (count - 1) * GAP_X
    start = (width - total) // 2
    return [start + i * (TILE[0] + GAP_X) for i in range(count)]


def main() -> None:
    board = Image.new("RGB", CANVAS, "#0A0A0F")
    draw = ImageDraw.Draw(board)

    # A quiet, deterministic header atmosphere; this does not overlap screens.
    for y in range(112):
        alpha = (1 - y / 112) ** 2
        r = int(10 + 18 * alpha)
        g = int(10 + 5 * alpha)
        b = int(15 + 1 * alpha)
        draw.line((0, y, CANVAS[0], y), fill=(r, g, b))

    draw.text((66, 46), "BALENCIA · CURRENT PROTOTYPE BASELINE", fill="#FEFAF3", font=font(27, True))
    draw.text((66, 88), "Seven-screen pilot · factual rendered evidence · 390 × 844", fill="#A9A4A0", font=font(18))
    draw.rounded_rectangle((1437, 48, 1534, 78), radius=15, fill="#211008", outline="#5A2B17")
    draw.text((1456, 54), "IMAGE 2", fill="#FF8A4A", font=font(14, True))

    rows = (SCREENS[:4], SCREENS[4:])
    for row_index, row in enumerate(rows):
        xs = centered_x(CANVAS[0], len(row))
        y = ROW_Y[row_index]
        for x, (screen_id, label) in zip(xs, row):
            source = SOURCE / f"{screen_id}.png"
            with Image.open(source) as raw:
                screenshot = raw.convert("RGB").resize(TILE, Image.Resampling.LANCZOS)
            # Draw the keyline behind and fully outside the screenshot crop.
            # Pasting second guarantees that no evidence pixel is overpainted.
            draw.rounded_rectangle(
                (x - 3, y - 3, x + TILE[0] + 2, y + TILE[1] + 2),
                radius=32,
                fill="#403733",
            )
            board.paste(screenshot, (x, y))
            draw.text((x, y + TILE[1] + 18), f"{screen_id}  {label}", fill="#D8D2CC", font=font(17, True))

    footer_y = 1722
    draw.line((66, footer_y - 22, 1534, footer_y - 22), fill="#302A28", width=1)
    draw.text((66, footer_y), "BASELINE ONLY · JULY 2026 · NOT ART DIRECTION", fill="#FF8A4A", font=font(16, True))
    draw.text((1092, footer_y), "Source: local strict baseline", fill="#827C78", font=font(16))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    board.save(OUTPUT, "PNG", optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
