# Blue Knight — a pocket guide to chess

A small, free chess **reference and learning site** built with plain HTML, CSS and JavaScript.
No build step, no dependencies, no CDN — deploy it to GitHub Pages as-is.

The look is a dark editorial theme: warm near-black, cream type, brass accents, a floating
board and a serif display face — inspired by premium chess landing pages — and it carries
through to the practice board.

The site is about chess knowledge: how the game works, how to start a game, the tactical
patterns that decide games, and where the game came from. A practice board is included as an
optional extra, not the main feature.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — what the guide covers, lesson cards, chess in numbers, reading list |
| `basics.html` | Lesson 1 — board, pieces, castling, en passant, promotion, check/mate/draws, piece values |
| `openings.html` | Lesson 2 — opening principles, eight rules, six openings with real move lines |
| `tactics.html` | Lesson 3 — forks, pins, skewers, discovered/double check, back-rank mate, quiz |
| `history.html` | Lesson 4 — origins, modern rules, timeline, all 18 world champions |
| `login.html` | Member sign-in / sign-up (browser-only demo) |
| `play.html` | Optional practice board — the full chess game |
| `assets/site.css` | Shared design system for the whole site |
| `assets/site.js` | Account chip, mobile nav, reading list, save buttons, scroll reveal |

## Reading list (what the login is for)

Signing up gives you a small member area, stored entirely in the browser:

- **Save to reading list** on any lesson; saved lessons appear on the home page.
- Accounts are kept in `localStorage`; the session goes to `sessionStorage`, or to
  `localStorage` when "Keep me signed in" is checked.
- **No password is ever stored or sent anywhere.** Sign-in checks that a local account
  exists for the email, nothing more.

This is a front-end demo, not real authentication: it personalises the site, and it is not
a security boundary. Real accounts, synced reading lists or cloud-saved games need a
backend or a BaaS such as Firebase or Supabase.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. **Settings → Pages → Deploy from a branch**, pick your branch and `/ (root)`.
3. Visit `https://<username>.github.io/<repo>/`.

`play.html` is still fully self-contained — its styles and chess engine live inside that one
file, so it can be copied out standalone if you only want the game.

## Verified

- Chess engine checked against standard *perft* counts (start position, Kiwipete, and
  castling / en-passant / promotion-heavy positions) plus SAN replay of the Ruy Lopez.
- Browser-behaviour tests (jsdom) for the board, undo, promotion dialog, login/session
  flows, lesson bookmarks and the home-page reading list.
- Internal links and HTML structure checked across all seven pages.

## Possible next steps

- Real authentication with Firebase or Supabase, and synced reading lists.
- A searchable opening database with diagrams for each line.
- Interactive board diagrams inside the lessons (click through the moves).
- A glossary of chess terms and a "chess clock" explainer.
- Dark mode, i18n (English/Tagalog), and a PWA install.
