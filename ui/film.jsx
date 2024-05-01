import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function FilmView() {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const filmId = window.location.pathname.split("/")[2];
        const response = await fetch(`/api/v1/film/${filmId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch film");
        }

        const data = await response.json();
        setFilm(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFilm();
  }, []);

  const handleDelete = async () => {
    const filmId = window.location.pathname.split("/")[2];
    try {
      const response = await fetch(`/api/v1/film/${filmId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.href = "/"; // Redirect to the film list page
      } else {
        throw new Error("Failed to delete film");
      }
    } catch (error) {
      console.error("Error deleting film:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!film) {
    return null;
  }

  return (
    <div>
      <h1>{film.title}</h1>
      <p>
        <strong>Description:</strong> {film.description}
      </p>
      <p>
        <strong>Release Year:</strong> {film.release_year}
      </p>
      <p>
        <strong>Language ID:</strong> {film.language_id}
      </p>
      <p>
        <strong>Rental Duration:</strong> {film.rental_duration} days
      </p>
      <p>
        <strong>Rental Rate:</strong> ${film.rental_rate}
      </p>
      <p>
        <strong>Length:</strong> {film.length} minutes
      </p>
      <p>
        <strong>Replacement Cost:</strong> ${film.replacement_cost}
      </p>
      <p>
        <strong>Rating:</strong> {film.rating}
      </p>
      <p>
        <strong>Last Update:</strong> {film.last_update}
      </p>
      <p>
        <strong>Special Features:</strong> {film.special_features}
      </p>
      <p>
        <strong>Fulltext:</strong> {film.fulltext}
      </p>
      <div className="button-group">
        <button onClick={handleDelete} className="action-button">
          Delete Film
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="action-button"
        >
          Back to Film List
        </button>
      </div>
    </div>
  );
}

const rootElt = document.getElementById("app");
const root = createRoot(rootElt);
root.render(<FilmView />);
