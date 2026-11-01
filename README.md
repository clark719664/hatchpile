# Hatchpile

**Drop eggs. Merge critters. Hatch the Dragon.**

A Suika-style physics merge puzzle in a single `index.html`. Phone-first, plays with touch, mouse or keyboard, and ships a new shared puzzle every day.

## Play

Open `index.html` from any static host (see below). Pick **Daily** or **Endless**, aim, drop, merge.

## How it works

**Modes**

- **Daily**: everyone gets the same egg sequence that day, seeded from the local date. Numbered from #1 on 2026-10-31. Your best for the day is kept.
- **Endless**: a fresh random sequence every run.

**Evolution chain** (11 tiers)

Egg → Slime → Shroomling → Bat → Frog → Cat → Owl → Boar → Bear → Golem → Dragon

Two touching critters of the same tier merge into the next one. Two Dragons vanish together for a 300 point bonus ("Dragon ascends").

**Golden Eggs**

After the first 15 drops, about 1 in 22 pieces is a Golden Egg. It merges with the first critter it touches, up to a Boar, and that merge scores double. Touch anything bigger and it cracks into a plain Egg.

**Dragon's Breath**

Hatching a Dragon incinerates the six smallest critters in the jar, 5 points each, which buys room to keep going.

**Scoring**

Merging into tier *n* scores the triangular series 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66. Merges within 0.9 s of each other chain a combo. Each combo step adds 25%.

**Game over**

A settled critter sitting above the dashed danger line for about 1.1 s ends the run.

**Sharing**

The result screen renders a 1080x1350 PNG card (background, top critter, score, chain). On phones Share hands the image plus text to the share sheet. On desktop it copies the text and "Save card" downloads the PNG. The text looks like this:

```
Hatchpile #12
Top critter: 🦉 Owl
Score 2,340 · 31 merges
🥚🟢🍄🦇🐸🐱🦉⬛⬛⬛⬛
https://your-host/
```

**Critterdex**

Discovered critters persist in `localStorage` and show in the chain bar at the bottom of the jar.

## Controls

| Input | Action |
| --- | --- |
| Tap / drag | Aim |
| Release | Drop |
| ← → | Aim |
| Space / Enter / ↓ | Drop |
| M | Mute |

## Run locally

Any static server works. For example:

```bash
python -m http.server 8741
```

Then open <http://localhost:8741>.

## Deploy

No build step. Upload the folder to GitHub Pages, Cloudflare Pages, Netlify or any static host. Matter.js and the font load from CDNs.

## Art credits

Everything in `assets/` was generated with [PixelLab](https://pixellab.ai):

- `c00.png` to `c10.png` and `gold.png`: `create_object_pro_flash`, with the Egg as the shared style anchor. Sprites are trimmed to their visible pixels at load time so the physics circle matches what you see.
- `bg.png`: the wizard's hatchery backdrop, `create_image_pixflux` at 220x380, drawn at 2x.
- `hatchpile.ttf`: the UI font, `create_font` (16px, bold).
- `panel.png`: the title-screen frame, `create_ui_asset`, used as a CSS border-image.

Music and sound effects are synthesized in WebAudio at runtime.

## License

MIT
