import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function FilmEntry({ id, title, description }) {
  return (
    <p>
      <a href={`/film/${id}`}>{title}</a>: {description}
    </p>
  );
}

function FilmList({ films }) {
  return (
    <div>
      <h1>Film List</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <FilmEntry
              id={film.id}
              title={film.title}
              description={film.description}
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => (window.location.href = "/film/create")}
        className="action-button"
      >
        Create Film
      </button>
    </div>
  );
}

async function main() {
  const filmsResponse = await fetch("/api/v1/films");
  const films = await filmsResponse.json();

  const rootElt = document.getElementById("app");
  const root = createRoot(rootElt);
  root.render(<FilmList films={films} />);
}

main();
