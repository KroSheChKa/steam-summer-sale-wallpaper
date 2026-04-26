# steam-summer-sale-wallpaper

A live wallpaper with a pixel-style clock and date. Dedicated to Steam Summer Sale.

https://github.com/user-attachments/assets/8394208e-9a31-4005-9cdb-e1c990e08fcb

> **Download / subscribe on the Steam Workshop:** [steamcommunity.com/sharedfiles/filedetails/?id=3661347807](https://steamcommunity.com/sharedfiles/filedetails/?id=3661347807)

This wallpaper is designed to run **only inside [Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/)** — it is not a standalone webpage and is not intended to be opened in a regular browser. Subscribe to it on the Steam Workshop using the link above, or load this folder in Wallpaper Engine as a "web" wallpaper.

## Overview

The wallpaper is a static set of HTML/CSS/JS files loaded by Wallpaper Engine as a "web" wallpaper. There is no build step and no runtime dependencies. The page renders an animated GIF background, overlays a pixel clock (`HH:MM` or `HH:MM:SS`), a pixel date line (weekday + month + day) and two symmetric audio-reactive equalizer groups on the left and right of the clock.

All visual elements are pre-rendered pixel sprites (PNG) composited as `<img>` tags. The layout was originally authored for a native `3440x1440` ultrawide setup, but it is **resolution-agnostic**: every size, spacing and offset is rescaled proportionally to the current viewport height at runtime, so it adapts to any width and any height (16:9, 21:9, 32:9, vertical, etc.) while keeping the pixel art crisp.

## Project structure

```
.
├── index.html          # Markup: background <img>, clock glyphs, date container, EQ bars
├── style.css           # CSS variables (sizes, spacings, offsets) + pixelated rendering rules
├── script.js           # All runtime logic (see "How the runtime works" below)
├── project.json        # Wallpaper Engine manifest: title, preview, FPS, user properties
├── preview.gif         # Preview shown in Wallpaper Engine / Workshop
└── assets/             # All visual sprites (see breakdown below)
```

### `assets/` — sprites

```
assets/
├── background.gif                  # Original raw background animation (full-size source)
├── background_100%.gif             # Downscaled version actually used by index.html
├── digits/                         # Large pixel digits for the main clock (HH:MM[:SS])
│   ├── 0.png … 9.png               # One sprite per digit
│   └── colon.png                   # Colon glyph between HH/MM and MM/SS (blinks)
├── small_digits/                   # Smaller digits used in the date line (the day number)
│   └── 0.png … 9.png
├── small_upper_case_letters/       # Smaller A–Z pixel letters used in the date line
│   └── A.png … Z.png               # Used for weekday and month names (always uppercase)
└── spectrum_bars/                  # 7 height levels for one equalizer bar
    └── 1.png … 7.png               # 1 = shortest / idle, 7 = tallest / loudest
```

## How the runtime works

`script.js` is a single self-contained script. The high-level flow is:

1. **Sprite path tables** — `DIGIT_PATHS`, `SMALL_DIGIT_PATHS`, `SMALL_LETTER_PATHS` and `BAR_PATHS` map characters / EQ levels to their PNG paths under `assets/`.
2. **Settings** — the `settings` object holds the current values for sizes, offsets, time format, timezone, equalizer parameters, etc. It is initialized with defaults and overwritten at runtime by Wallpaper Engine via `window.wallpaperPropertyListener.applyUserProperties`.
3. **Layout scaling** — all sizes/offsets in `settings` are authored against a `3440x1440` reference viewport (`BASE_VIEWPORT_WIDTH/HEIGHT`), which is the resolution the wallpaper was originally designed for. This is just a reference — on every layout pass the script computes a scale factor from the actual `window.innerHeight` and applies it to CSS variables (`--digit-height`, `--digit-spacing`, `--small-height`, `--eq-bar-spacing`, …) and to absolute positions of the clock, date and EQ groups, so the result adapts to any viewport size.
4. **Background positioning** — the background GIF is sized to the viewport height while keeping the original aspect ratio (pixel-perfect), then horizontally/vertically nudged by `bgOffsetX/Y`.
5. **Clock rendering** — `updateTimer()` reads the current time (local or GMT-offset), formats it as 12h or 24h, and assigns the matching PNG to each `<img>` glyph. The colon blinks at `blinkIntervalMs`; both colons (between HH/MM and MM/SS) blink in sync. Seconds glyphs are hidden when `showSeconds` is off.
6. **Date rendering** — `updateDate()` builds the string `WEEKDAY MONTH DD` using `WEEKDAYS`/`MONTHS`, then dynamically creates `<img>` glyphs for each character (digits from `small_digits/`, letters from `small_upper_case_letters/`) plus blank `<span class="space">` spacers between words.
7. **Update scheduling** — `scheduleUpdates()` ticks every minute by default, or every second if `showSeconds` is enabled, and only redraws the date once per midnight.
8. **Audio equalizer** — `initAudioListener()` registers a `wallpaperRegisterAudioListener` callback. The 128-bin Wallpaper Engine spectrum is folded to a unified mono spectrum (left+right averaged), divided by a hand-tuned **pink-noise calibration table** (`PINK_NOISE`) for a flat perceived response, normalized against a slowly-decaying running peak, and mapped to `EQ_TOTAL_BARS = 24` bars (`12` per side, mirrored). Each bar's amplitude is converted to one of `7` discrete levels and the corresponding sprite from `spectrum_bars/` is swapped in. A health-check timer every 5s detects a stalled audio callback (e.g. when Wallpaper Engine reinjects the API late) and re-registers the listener.
9. **Wallpaper Engine properties** — every slider/toggle declared in `project.json` has a matching branch in `applyUserProperties`. After applying the new values, the script recomputes layout, restarts the colon blink, and reschedules updates.

## Wallpaper Engine properties

All user-tweakable values are declared in `project.json` and are exposed in Wallpaper Engine's property panel. Grouped roughly:

- **Background**: `bgOffsetX`, `bgOffsetY`
- **Clock layout**: `posX`, `posY`, `digitHeight`, `digitSpacing`, `blinkIntervalMs`
- **Time/date**: `timeFormat24`, `useLocalTime`, `timeZoneOffsetHours`, `showSeconds`
- **Date layout**: `dateOffsetX`, `dateOffsetY`, `smallHeight`, `smallSpacing`, `smallSpaceWidth`
- **Equalizer**: `showEqualizer`, `eqBarSpacing`, `eqOffsetX`, `eqOffsetY`, `eqSensitivity`

All sliders are interpreted in the `3440x1440` reference space and re-scaled to the current viewport at runtime.

## Run

The intended (and only supported) way to run this wallpaper is through **Wallpaper Engine**:

- Subscribe via the Steam Workshop: [steamcommunity.com/sharedfiles/filedetails/?id=3661347807](https://steamcommunity.com/sharedfiles/filedetails/?id=3661347807), **or**
- Load this folder locally as a "web" wallpaper from inside Wallpaper Engine.

The audio equalizer relies on `wallpaperRegisterAudioListener`, which is provided by Wallpaper Engine, so the wallpaper will not run as expected outside of it.

## Checklist
- [x] Base HTML/CSS layout
- [x] Pixel glyph timer (HH:MM) or (HH:MM:SS)
- [x] Pixel glyph date (weekday + month + day)
- [x] Wallpaper Engine properties wiring
- [x] Background image offset controls
- [x] 12/24h time format toggle
- [x] GMT offset and local time selection
- [x] Optional seconds with synced double-colon blink
- [x] Pixel-perfect background scaling from original GIF
- [x] Auto-relative layout scaling from the `3440x1440` reference setup (works at any resolution)
- [x] Audio spectrum equalizer (12+12 unified mono bars with running peak normalization)
- [x] Pink noise frequency calibration for balanced EQ response
- [x] Resilient audio API init (retry on delayed WE injection)
