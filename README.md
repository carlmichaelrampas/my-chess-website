# Blue Knight — Chess

A modern, responsive chess game built with a single `index.html` file — no build step,
no dependencies, no CDN. Everything (HTML, CSS, and JavaScript) lives in one file, so it
works offline and deploys anywhere static files are served.

## Play

Open `index.html` in any modern browser, or visit the GitHub Pages URL for this repo.

## Features

- **Blue & white minimal interface** — centered, high-contrast board that fits desktop and mobile.
- **Drag and drop or tap-to-move** — pointer events work with mouse, trackpad, pen and touch.
- **Full legal move rules** — pins, castling, en passant, pawn promotion (with a picker), and
  check evasion are all enforced by a self-contained engine.
- **Game state detection** — check, checkmate, stalemate, fifty-move rule, threefold repetition,
  and insufficient material (dead position) draws.
- **Live status + move history** — active-turn indicator, captured pieces, material advantage,
  and SAN move list (e.g. `O-O`, `exd6`, `Qxf7#`).
- **Controls** — new game, undo, flip board, and a sound on/off toggle.
- **Keyboard friendly** — `Esc` clears a selection or dismisses the result overlay.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your branch
   (e.g. `main`) and the `/ (root)` folder, then save.
4. Your game will be live at `https://<username>.github.io/<repo>/`.

`index.html` is the only required file.

## Notes

The engine was validated against standard *perft* counts (including Kiwipete and the
castling/en-passant/promotion-heavy test positions) and against a full replay of the
Ruy Lopez main line for SAN correctness.
