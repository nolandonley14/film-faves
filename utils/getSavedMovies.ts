import { SaveState } from "@/components/movieGrid";
import { Dispatch, SetStateAction } from "react";
import { Movie, MovieDetails, SavedMovie } from "./types";

export const getSavedMovies = (setSavedMovies: Dispatch<SetStateAction<SaveState>>) => {
    const value = localStorage.getItem("savedMovies") || "";
    if (value.length > 0) {
      const parsedValue = JSON.parse(value);
      setSavedMovies(parsedValue as SaveState);
      console.log(parsedValue);
    }
  };

export const saveMovieToLocalStorage = (movie: MovieDetails, savedMovies: SaveState, setSavedMovies: Dispatch<SetStateAction<SaveState>>, watched?: boolean, review?:string) => {
    const newMovie: SavedMovie = {
        movie: movie,
      watched: watched ? watched : false,
      review: review ? review : "",
    };
    const newSavedMovies = savedMovies;
    newSavedMovies[movie.imdbID] = newMovie;
    localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
    getSavedMovies(setSavedMovies);
};

export const setMovieToWatched = (movie: SavedMovie, savedMovies: SaveState, setSavedMovies: Dispatch<SetStateAction<SaveState>>) => {
    const newMovie = movie;
    newMovie.watched = true
    const newSavedMovies = savedMovies;
    newSavedMovies[movie.movie.imdbID] = newMovie;
    localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
    getSavedMovies(setSavedMovies);
};

export const removeMovie = (movie: SavedMovie, savedMovies: SaveState, setSavedMovies: Dispatch<SetStateAction<SaveState>>) => {
    const newSavedMovies = savedMovies;
    delete newSavedMovies[movie.movie.imdbID]
    localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
    getSavedMovies(setSavedMovies);
};

export const addUpdateReviewForMovie = (movie: SavedMovie, review: string, savedMovies: SaveState, setSavedMovies: Dispatch<SetStateAction<SaveState>>) => {
    const newMovie = movie;
    newMovie.review = review
    const newSavedMovies = savedMovies;
    newSavedMovies[movie.movie.imdbID] = newMovie;
    localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
    getSavedMovies(setSavedMovies);
};