"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MovieDetails, SavedMovie } from "@/utils/types";
import {
  Box,
  Flex,
  SimpleGrid,
  Image,
  Text,
  AspectRatio,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { SiRottentomatoes } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import {
  addUpdateReviewForMovie,
  removeMovie,
  saveMovieToLocalStorage,
  setMovieToWatched,
} from "@/utils/getSavedMovies";
import MovieModal from "./movieModal";

type MovieGridType = {
  movies: MovieDetails[];
  setSavedMovies: Dispatch<SetStateAction<SaveState>>;
  savedMovies: SaveState;
  windowWidth: number;
};

type MovieCardType = {
  movie: MovieDetails;
};

export type SaveState = {
  [id: string]: SavedMovie;
};

const MovieGrid = ({ movies, setSavedMovies, savedMovies }: MovieGridType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails>(
    {} as MovieDetails
  );

  const openMovieModal = (movie: MovieDetails) => {
    setSelectedMovie(movie);
    onOpen();
  };

  const onMarkWatched = (movie: SavedMovie) => {
    setMovieToWatched(movie, savedMovies, setSavedMovies);
  };

  const onRemove = (movie: SavedMovie) => {
    removeMovie(movie, savedMovies, setSavedMovies);
  };

  const onReview = (movie: SavedMovie, text: string) => {
    addUpdateReviewForMovie(movie, text, savedMovies, setSavedMovies);
  };

  const onSaveToWatchlist = (
    movie: MovieDetails,
    watched: boolean,
    review: string
  ) => {
    saveMovieToLocalStorage(
      movie,
      savedMovies,
      setSavedMovies,
      watched,
      review
    );
  };

  const MovieCard = ({ movie }: MovieCardType) => {
    const saved = Object.keys(savedMovies).includes(movie.imdbID);
    return (
      <Box
        onClick={() => openMovieModal(movie)}
        cursor={"pointer"}
        onMouseEnter={() => console.log("Hovering")}
        maxW="300px">
        <Box position={"relative"} width={"full"}>
          <AspectRatio maxW="300px" ratio={2 / 3}>
            <Image
              src={
                movie.Poster != "N/A"
                  ? movie.Poster
                  : "https://cringemdb.com/img/movie-poster-placeholder.png"
              }
              alt={movie.Title}
              objectFit="cover"
            />
          </AspectRatio>
          <Box position={"absolute"} top={0} right={0} p={2}>
            {saved ? (
              <StarIcon
                color={"primary.500"}
                boxSize={8}
                as={"button"}
                onClick={() =>
                  saveMovieToLocalStorage(movie, savedMovies, setSavedMovies)
                }
              />
            ) : (
              <StarIcon
                as={"button"}
                boxSize={8}
                onClick={() =>
                  saveMovieToLocalStorage(movie, savedMovies, setSavedMovies)
                }
              />
            )}
          </Box>
          <VStack
            alignItems={"flex-start"}
            spacing={1}
            bg="blackAlpha.600"
            backdropFilter="auto"
            backdropBlur="16px"
            position={"absolute"}
            width={"full"}
            bottom={0}
            p={2}>
            <Text
              noOfLines={2}
              fontSize={["xs", "sm", "md"]}
              color="white"
              fontWeight={"bold"}>
              {movie.Title}
            </Text>
            <Text
              noOfLines={2}
              fontSize={["3xs", "xs"]}
              color="gray"
              fontWeight={"regular"}>
              {`${movie.Year} - ${movie.Genre}`}
            </Text>
            <Flex gap={3}>
              {movie.Ratings[0] && (
                <Flex alignItems={"center"} gap={2}>
                  <FaImdb color={"yellow"} />
                  <Text fontSize={["2xs", "sm"]} color={"white"}>
                    {movie.Ratings[0].Value}
                  </Text>
                </Flex>
              )}
              {movie.Ratings[1] && (
                <Flex alignItems={"center"} gap={2}>
                  <SiRottentomatoes color={"red"} />
                  <Text fontSize={["2xs", "sm"]} color={"white"}>
                    {movie.Ratings[1].Value}
                  </Text>
                </Flex>
              )}
            </Flex>
          </VStack>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 2, lg: 5 }}
        spacing={{ base: "10px", sm: "20px", md: "40px", lg: "20px" }}>
        {movies.map((movie) => {
          return <MovieCard key={movie.imdbID} movie={movie} />;
        })}
      </SimpleGrid>
      <MovieModal
        movie={selectedMovie}
        isOpen={isOpen}
        onClose={onClose}
        onMarkWatched={onMarkWatched}
        onRemove={onRemove}
        onReview={onReview}
        onSaveToWatchlist={onSaveToWatchlist}
      />
    </>
  );
};

export default MovieGrid;
