# Kawaii Word Count 🌸

A cozy, goal-based word counter with themes, a Pomodoro timer and background music.

## Run it

Double-clicking `index.html` works for almost everything. For YouTube embeds, serve the folder over http, because YouTube refuses to play inside pages opened from `file://`:

```sh
npx serve .
# or
python -m http.server 8000
```

Then open the printed address (for example http://localhost:8000).

## Features

- Live word, character and reading-time counts
- Daily and project goals (up to 99,000 words), optional deadline with a words/day pace, streaks, best day and a 14-day history chart
- "Wrote somewhere else?" to log words written outside the app
- NaNoWriMo mode: fall theme with 1,667/day and 50,000 by Nov 30. Your previous goals come back when you turn it off.
- Pomodoro timer: work up to 60 min, break up to 25 min, with a chime and a tomato count
- Spotify / YouTube player: paste a track, album, playlist or video link
- 10 themes, each with light and dark mode

Everything is saved in your browser's localStorage. Nothing is sent anywhere.
