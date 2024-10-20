"use client"

import { useState, ChangeEvent } from "react";
import axios from "axios";

const MovieSearchApp = () => {
  const [query, setQuery] = useState("");
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      // Step 1: Search for movies
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=d998873c8af3e4bda38440ea1dd30f4e&query=${query}`
      );
      const data = response.data;

      // Check if there are results
      if (data.results && data.results.length > 0) {
        const movieId = data.results[0].id; // Get the first movie's ID

        // Step 2: Fetch detailed information for the selected movie
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=d998873c8af3e4bda38440ea1dd30f4e&append_to_response=credits`
        );
        console.log(detailsResponse.data); // Log the entire movie details
        setMovieDetails(detailsResponse.data); // Update state with detailed movie data
      } else {
        setError("No movies found.");
      }
    } catch (err) {
      setError("Failed to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie Search App</h1>
      <input
        type="text"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-md p-3 mb-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for any movies..."
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>

      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {movieDetails && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-2">{movieDetails.title}</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Director:</span>
              <span>{movieDetails.credits?.crew.find((member: any) => member.job === 'Director')?.name || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Actors:</span>
              <span>{movieDetails.credits?.cast.map((actor: any) => actor.name).join(", ") || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Runtime:</span>
              <span>{movieDetails.runtime ? `${movieDetails.runtime} mins` : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Released:</span>
              <span>{movieDetails.release_date || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Genres:</span>
              <span>{movieDetails.genres ? movieDetails.genres.map((genre: any) => genre.name).join(", ") : "N/A"}</span>
            </div>
            <div>
              <strong className="font-bold">Overview:</strong>
              <p>{movieDetails.overview || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearchApp;
