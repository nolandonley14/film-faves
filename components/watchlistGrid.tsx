"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Movie, MovieDetails, SavedMovie } from "@/utils/types";
import {
  Box,
  Flex,
  SimpleGrid,
  Image,
  Text,
  AspectRatio,
  Center,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { SiRottentomatoes } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import {
  addUpdateReviewForMovie,
  getSavedMovies,
  removeMovie,
  saveMovieToLocalStorage,
  setMovieToWatched,
} from "@/utils/getSavedMovies";
import MovieModal from "./movieModal";

type WatchlistGridType = {
  movies: SavedMovie[];
  setSavedMovies: Dispatch<SetStateAction<SaveState>>;
  savedMovies: SaveState;
  windowWidth: number;
};

type MovieCardType = {
  movie: SavedMovie;
};

export type SaveState = {
  [id: string]: SavedMovie;
};

const WatchlistGrid = ({
  movies,
  setSavedMovies,
  savedMovies,
  windowWidth,
}: WatchlistGridType) => {
  //const [savedMovies, setSavedMovies] = useState<SaveState>({} as SaveState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMovie, setSelectedMovie] = useState<SavedMovie>(
    {} as SavedMovie
  );

  //   useEffect(() => {
  //     getSavedMovies(setSavedMovies);
  //   }, [setSavedMovies]);

  const openMovieModal = (movie: SavedMovie) => {
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

  const MovieCard = ({ movie }: MovieCardType) => {
    const saved = Object.keys(savedMovies).includes(movie.movie.imdbID);
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
                movie.movie.Poster != "N/A"
                  ? movie.movie.Poster
                  : "https://cringemdb.com/img/movie-poster-placeholder.png"
              }
              alt={movie.movie.Title}
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
                  saveMovieToLocalStorage(
                    movie.movie,
                    savedMovies,
                    setSavedMovies
                  )
                }
              />
            ) : (
              <StarIcon
                as={"button"}
                boxSize={8}
                onClick={() =>
                  saveMovieToLocalStorage(
                    movie.movie,
                    savedMovies,
                    setSavedMovies
                  )
                }
              />
            )}
          </Box>
          <VStack
            alignItems={"flex-start"}
            spacing={1}
            bg="blackAlpha.400"
            backdropFilter="auto"
            backdropBlur="16px"
            position={"absolute"}
            width={"full"}
            bottom={0}
            p={2}>
            <Text fontSize={["xs", "md"]} color="white" fontWeight={"bold"}>
              {movie.movie.Title}
            </Text>
            <Text fontSize={["3xs", "sm"]} color="gray" fontWeight={"regular"}>
              {`${movie.movie.Year} - ${movie.movie.Genre}`}
            </Text>
            <Flex gap={3}>
              {movie.movie.Ratings[0] && (
                <Flex alignItems={"center"} gap={2}>
                  <FaImdb color={"yellow"} />
                  <Text fontSize={["2xs", "md"]} color={"white"}>
                    {movie.movie.Ratings[0].Value}
                  </Text>
                </Flex>
              )}
              {movie.movie.Ratings[1] && (
                <Flex alignItems={"center"} gap={2}>
                  <SiRottentomatoes color={"red"} />
                  <Text fontSize={["2xs", "md"]} color={"white"}>
                    {movie.movie.Ratings[1].Value}
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
          return <MovieCard key={movie.movie.imdbID} movie={movie} />;
        })}
      </SimpleGrid>
      <MovieModal
        movie={selectedMovie}
        isOpen={isOpen}
        onClose={onClose}
        onMarkWatched={onMarkWatched}
        onRemove={onRemove}
        onReview={onReview}
      />
    </>
  );
};

// background: rgba(255, 255, 255, 0.35);
// border-radius: 16px;
// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
// backdrop-filter: blur(16.2px);
// -webkit-backdrop-filter: blur(16.2px);

export default WatchlistGrid;
