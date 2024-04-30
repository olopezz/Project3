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
    <div>
      <h1>Create Film</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

const rootElt = document.getElementById("app");
const root = createRoot(rootElt);
root.render(<CreateFilmForm />);
