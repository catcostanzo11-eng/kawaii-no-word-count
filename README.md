<p align="center"><img src="icons/icon-192.png" width="96" alt=""></p>

# Kawaii no Word Count! 🌸

A cozy, goal-based word counter with themes, a Pomodoro timer and background music.

**✨ Try it in your browser: https://catcostanzo11-eng.github.io/kawaii-no-word-count/**

## Get the app

### Windows desktop app

1. Go to the [latest release](https://github.com/catcostanzo11-eng/kawaii-no-word-count/releases/latest).
2. Download `Kawaii-no-Word-Count-Setup-x.y.z.exe` and run it.
3. Windows may show a blue "Windows protected your PC" screen because the app isn't code-signed. Click **More info**, then **Run anyway**.

### Install from the browser (Windows, Mac, Chromebook, Android, iPhone)

- **Chrome or Edge:** open the [live site](https://catcostanzo11-eng.github.io/kawaii-no-word-count/) and click **⬇️ Install app** in the header, or the install icon in the address bar.
- **iPhone / iPad (Safari):** tap Share, then **Add to Home Screen**.
- **Android (Chrome):** tap the ⋮ menu, then **Install app**.

The installed app works offline and updates itself.

## Features

- Live word, character and reading-time counts
- Daily and project goals (up to 99,000 words), optional deadline with a words/day pace, streaks, best day and a 14-day history chart
- "Wrote somewhere else?" to log words written outside the app
- NaNoWriMo mode: fall theme with 1,667/day and 50,000 by Nov 30. Your previous goals come back when you turn it off.
- Pomodoro timer: work up to 60 min, break up to 25 min, with a chime and a tomato count
- Spotify / YouTube player: paste a track, album, playlist, video or livestream link
- 10 themes, each with light and dark mode
- Spelling suggestions: misspelled words get a red squiggle; right-click one for fixes or "Add to dictionary"
- Grammar suggestions: press **Check grammar** to get fixes you can apply with one click (Ctrl+Z undoes them). Checks your selection, or your whole draft (the most recent ~3,000 words for long drafts)
- Accessibility options: easy-read font (Atkinson Hyperlegible), larger text sizes, reduce motion, and spelling underlines on/off. Colours are adjusted automatically so text stays readable (WCAG AA) in every theme, and the app works with a keyboard and screen readers

Everything is saved on your own device. The only time anything leaves your computer is when you press **Check grammar**: the text being checked is sent to [LanguageTool](https://languagetool.org)'s free grammar service (the app asks first). Spelling suggestions run on your device. In the desktop app, the spelling dictionary is downloaded once the first time it's used.

## Development

The app is plain HTML, CSS and JavaScript (`index.html`, `style.css`, `app.js`). The desktop app wraps the same files with [Electron](https://www.electronjs.org/) (`main.js`).

```sh
npm install
npm start        # run the desktop app
npm run dist     # build the Windows installer into dist/
npm run icons    # regenerate icons from scripts/make-icons.mjs
```

To try the web version locally, serve the folder over http (YouTube embeds don't play from `file://`):

```sh
npx serve .
```
