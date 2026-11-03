# Blue Knight — Chess Website

A modern, responsive chess site built with plain HTML, CSS and JavaScript — no build step,
no dependencies, no CDN. Drop it on GitHub Pages (or any static host) and it just works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Landing page — hero, features, how-to-play, calls to action |
| `login.html` | Sign in / create account (browser-only demo, see below) |
| `play.html` | The chess game — fully self-contained (CSS + engine embedded) |
| `assets/site.css` | Shared styles for the landing and login pages |
| `assets/site.js` | Shared script: account chip, mobile nav, scroll reveal |

The game in `play.html` has no external dependencies; you can copy that single file
somewhere else and it still runs.

## Game features

- **Blue & white minimal interface** — centered, high-contrast board for desktop and mobile.
- **Drag and drop or tap-to-move** — pointer events cover mouse, trackpad, pen and touch.
- **Full legal move rules** — pins, castling, en passant, pawn promotion (with picker),
  and check evasion, enforced by a self-contained engine.
- **Game state detection** — check, checkmate, stalemate, fifty-move rule, threefold
  repetition, and insufficient material (dead position) draws.
- **Live status + move history** — active-turn indicator, captured pieces, material
  advantage, and SAN move list (`O-O`, `exd6`, `Qxf7#`).
- **Controls** — new game, undo, flip board, sound on/off. `Esc` clears a selection.

## About the login (important)

This is a **static site**, so the login is a front-end demo:

- Accounts are saved in the browser's `localStorage`; the session lives in
  `sessionStorage` (or `localStorage` when "Keep me signed in" is checked).
- **No password is ever stored or sent anywhere.**
- Signing in is therefore cosmetic — it personalises the header and nothing else.
- It is **not** a security boundary: anyone can open `play.html` directly, and the game
  never requires an account.

If you need real accounts, saved games or online play, you need a backend or a BaaS
(Firebase Auth, Supabase, Auth0…). That can be added without touching the chess engine.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. **Settings → Pages → Deploy from a branch**, pick your branch and `/ (root)`.
3. Visit `https://<username>.github.io/<repo>/` — the landing page loads first.

## Verified

- Move generation checked against standard *perft* counts (start position, Kiwipete,
  and castling / en-passant / promotion-heavy positions).
- SAN replay of the Ruy Lopez main line, plus promotion, en-passant and disambiguation cases.
- Browser-behaviour tests (jsdom) for the board, undo, promotion dialog, and the
  login / session flows.

## Ideas for next steps

- Real authentication + saved games (Firebase or Supabase).
- PGN export/import and shareable FEN links.
- Play vs. computer (Stockfish WASM) or online PvP.
- Dark mode and alternate piece sets.
- Installable PWA with offline caching.
- Daily puzzles and a profile page with stats.
