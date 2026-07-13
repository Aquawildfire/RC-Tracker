# RC Tracker 🏎️

A dark-themed web app built for our school RC car build team to track our daily fund contributions, planned/installed upgrades, and member payments — no backend, fully client-side, data persisted with localStorage.

## Features
- 📢 Leader-postable announcements
- 🔧 Add, remove, and mark upgrades as installed (planned → installed workflow)
- 💰 Track daily member contributions with auto-updating progress bar and totals
- 👥 Add/remove team members, synced across the member list, fund table, and dropdowns
- 📜 Activity log for payments and upgrade history
- 🔐 Simple password-gated Leader Panel (to access the is password 1)
- 💾 All data survives page refresh via localStorage

## Built with
HTML, CSS, and vanilla JavaScript — no frameworks, no build tools.

## What I learned
This was my first full web project. Along the way I learned how to work with the DOM directly, debug real state-sync bugs (like keeping multiple dropdowns and displays in sync with one source of data), and persist data with `localStorage` + `JSON.stringify`/`JSON.parse`.

## Live Demo
https://github.com/Aquawildfire/RC-Tracker.git
