import { useEffect, useMemo, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadManifest() {
      try {
        const res = await fetch("/notes/manifest.json", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Manifest could not be loaded");
        }
        const data = await res.json();
        const parsed = Array.isArray(data)
          ? data.filter((item) => item?.title && item?.file)
          : [];
        setNotes(parsed);
        if (parsed.length > 0) {
          setActiveNote(parsed[0]);
        }
      } catch (err) {
        setError("Could not load notes manifest. Check public/notes/manifest.json");
      }
    }
    loadManifest();
  }, []);

  const activeSrc = useMemo(() => {
    if (!activeNote) return "";
    return `/notes/${activeNote.file}`;
  }, [activeNote]);

  return (
    <div className="app-shell">
      <header className="hero">
        <h1>Competitive Exam Notes</h1>
        <p>Organize and launch your Quantitative Aptitude concepts quickly.</p>
      </header>

      <main className="content">
        <section className="notes-section">
          <div className="section-head">
            <h2>Quantitative Aptitude</h2>
            <span>{notes.length} concepts</span>
          </div>

          {error ? <p className="error">{error}</p> : null}

          <div className="selector-wrap">
            <label htmlFor="concept-select" className="selector-label">
              Select concept
            </label>
            <select
              id="concept-select"
              className="concept-select"
              value={activeNote?.file ?? ""}
              onChange={(e) => {
                const selected = notes.find((note) => note.file === e.target.value) ?? null;
                setActiveNote(selected);
              }}
              disabled={notes.length === 0}
            >
              {notes.length === 0 ? <option value="">No concepts available</option> : null}
              {notes.map((note) => (
                <option key={note.file} value={note.file}>
                  {note.title}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="viewer-section">
          <div className="section-head">
            <h2>Concept Viewer</h2>
            {activeNote ? (
              <a href={activeSrc} className="open-link">
                Open full page
              </a>
            ) : null}
          </div>

          {activeNote ? (
            <iframe
              title={activeNote.title}
              src={activeSrc}
              className="note-frame"
            />
          ) : (
            <div className="placeholder">
              Select a concept from Quantitative Aptitude to preview it here.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
