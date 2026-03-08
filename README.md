# Competitive Exam Notes (React)

Simple React app to organize your Quantitative Aptitude HTML notes.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

## Add new concept notes

1. Put your HTML file inside `public/notes/`.
2. Add an entry in `public/notes/manifest.json`.

Example:

```json
[
  { "title": "Incircle", "file": "Incircle.html" },
  { "title": "Percentage", "file": "Percentage.html" }
]
```

Each entry becomes a button under **Quantitative Aptitude**.
Clicking a button opens the note in the in-app viewer, with option to open in a new tab.

## Mobile + Web responsiveness

- Responsive two-column desktop layout.
- Single-column mobile layout below 880px.
- Viewer and controls scale for both phone and desktop screens.
