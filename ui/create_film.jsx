import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function CreateFilmForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [rentalRate, setRentalRate] = useState("");
  const [length, setLength] = useState("");
  const [replacementCost, setReplacementCost] = useState("");
  const [rating, setRating] = useState("");
  const [specialFeatures, setSpecialFeatures] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      release_year: parseInt(releaseYear),
      language_id: parseInt(languageId),
      rental_duration: parseInt(rentalDuration),
      rental_rate: parseFloat(rentalRate),
      length: parseInt(length),
      replacement_cost: parseFloat(replacementCost),
      rating,
      special_features: specialFeatures,
    };
    try {
      const response = await fetch("/api/v1/film", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const createdFilm = await response.json();
        window.location.href = `/film/${createdFilm.film_id}`;
      } else {
        throw new Error("Failed to create film");
      }
    } catch (error) {
      console.error("Error creating film:", error);
    }
  };

  return (
    <div className="container">
      <h1>Create Film</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="releaseYear">Release Year:</label>
          <input
            type="number"
            id="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="languageId">Language ID:</label>
          <input
            type="number"
            id="languageId"
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rentalDuration">Rental Duration:</label>
          <input
            type="number"
            id="rentalDuration"
            value={rentalDuration}
            onChange={(e) => setRentalDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rentalRate">Rental Rate:</label>
          <input
            type="number"
            id="rentalRate"
            step="0.01"
            value={rentalRate}
            onChange={(e) => setRentalRate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="length">Length:</label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="replacementCost">Replacement Cost:</label>
          <input
            type="number"
            id="replacementCost"
            step="0.01"
            value={replacementCost}
            onChange={(e) => setReplacementCost(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialFeatures">Special Features:</label>
          <input
            type="text"
            id="specialFeatures"
            value={specialFeatures}
            onChange={(e) => setSpecialFeatures(e.target.value.split(","))}
          />
        </div>
        <button type="submit" className="action-button">
          Create
        </button>
      </form>
    </div>
  );
}

const rootElt = document.getElementById("app");
const root = createRoot(rootElt);
root.render(<CreateFilmForm />);
