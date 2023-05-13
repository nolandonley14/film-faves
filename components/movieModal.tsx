import { MovieDetails, SavedMovie } from "@/utils/types";
import {
  AspectRatio,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  VStack,
  Text,
  Flex,
  Box,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";

type MovieModalType = {
  movie: SavedMovie | MovieDetails;
  isOpen: boolean;
  onSaveToWatchlist?: (
    movie: MovieDetails,
    watched: boolean,
    review: string
  ) => void;
  onClose: () => void;
  onMarkWatched: (movie: SavedMovie) => void;
  onRemove: (movie: SavedMovie) => void;
  onReview: (movie: SavedMovie, text: string) => void;
};

const MovieModal = ({
  movie,
  isOpen,
  onSaveToWatchlist,
  onClose,
  onMarkWatched,
  onRemove,
  onReview,
}: MovieModalType) => {
  const [editing, setEditing] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState(false);
  const [newReview, setNewReview] = useState("");

  const isWatchlist = onSaveToWatchlist ? false : true;
  const savedMovie = isWatchlist ? (movie as SavedMovie) : null;
  const movieDetails = isWatchlist
    ? (movie as SavedMovie).movie
    : (movie as MovieDetails);

  useEffect(() => {
    if (movieDetails) {
      const data = JSON.parse(localStorage.getItem("savedMovies")!);
      if (Object.keys(data).includes(movieDetails.imdbID)) {
        const specificData = data[movieDetails.imdbID];
        setSaved(true);
        setNewReview(specificData.review);
        setWatched(specificData.watched);
      } else {
        setNewReview("");
        setWatched(false);
        setSaved(false);
      }
      setEditing(false);
    }
  }, [movieDetails, isOpen]);

  useEffect(() => {
    console.log(
      editing,
      reviewText,
      saved,
      watched,
      newReview,
      isWatchlist,
      savedMovie,
      movieDetails
    );
  }, [
    editing,
    reviewText,
    saved,
    watched,
    newReview,
    isWatchlist,
    savedMovie,
    movieDetails,
    isOpen,
  ]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["xs", "md"]} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="blackAlpha.400"
        backdropFilter="auto"
        backdropBlur="16px"
        borderColor={"#323232"}
        borderWidth={"0.5px"}>
        <ModalHeader color={"white"}>{movieDetails?.Title}</ModalHeader>
        <ModalCloseButton color={"white"} />
        <ModalBody>
          <Flex gap={2}>
            <Box w="100px">
              <AspectRatio maxW="100px" ratio={2 / 3}>
                <Image
                  src={
                    movieDetails?.Poster != "N/A"
                      ? movieDetails?.Poster
                      : "https://cringemdb.com/img/movie-poster-placeholder.png"
                  }
                  alt={movieDetails?.Title}
                  objectFit="cover"
                />
              </AspectRatio>
            </Box>
            <VStack alignItems={"flex-start"} spacing={0.5} flex={1}>
              <Text
                fontSize={"2xs"}
                color="primary.500">{`${movieDetails?.Year} • ${movieDetails?.Country}`}</Text>
              <Text fontSize={"2xs"} color="white">
                {movieDetails?.Genre}
              </Text>
              <Flex gap={3} py={1}>
                {movieDetails?.Ratings
                  ? [0] && (
                      <Flex alignItems={"center"} gap={2}>
                        <FaImdb color={"yellow"} />
                        <Text fontSize={["2xs"]} color={"white"}>
                          {movieDetails?.Ratings[0].Value}
                        </Text>
                      </Flex>
                    )
                  : null}
                {movieDetails?.Ratings
                  ? [1] && (
                      <Flex alignItems={"center"} gap={2}>
                        <SiRottentomatoes color={"red"} />
                        <Text fontSize={["2xs"]} color={"white"}>
                          {movieDetails?.Ratings[1].Value}
                        </Text>
                      </Flex>
                    )
                  : null}
              </Flex>
              <Text fontSize={"2xs"} color="gray" noOfLines={6}>
                {movieDetails?.Plot}
              </Text>
            </VStack>
          </Flex>

          {isWatchlist ? (
            <>
              <Text my={2} color="white" fontWeight={"bold"} fontSize={"sm"}>
                Your Review
              </Text>
              {savedMovie!.watched ? (
                savedMovie!.review && !editing ? (
                  <>
                    <Text fontSize="xs" color="white">
                      {savedMovie!.review}
                    </Text>
                    <Button
                      variant="link"
                      colorScheme="primary"
                      w={"full"}
                      my={5}
                      onClick={() => {
                        setReviewText(savedMovie!.review!);
                        setEditing(true);
                      }}>
                      Edit Review
                    </Button>
                  </>
                ) : (
                  <Textarea
                    color={"white"}
                    value={reviewText}
                    onFocus={() => setEditing(true)}
                    onChange={(e) => {
                      setReviewText(e.target.value);
                    }}
                    fontSize={"sm"}
                    placeholder="Type out your review here"
                  />
                )
              ) : (
                <Text fontSize="2xs" color="white">
                  {'You must mark a movie as "Watched" to give it a review'}
                </Text>
              )}
              {editing && (
                <Button
                  variant="link"
                  colorScheme="primary"
                  w={"full"}
                  my={5}
                  onClick={() => {
                    setEditing(false);
                    setReviewText("");
                    onReview(savedMovie!, reviewText);
                  }}>
                  Save Review
                </Button>
              )}
            </>
          ) : saved ? (
            <>
              <Text my={2} color="white" fontWeight={"bold"} fontSize={"sm"}>
                Your Review
              </Text>
              {watched ? (
                <>
                  {newReview && !editing ? (
                    <>
                      <Text fontSize="xs" color="white">
                        {newReview}
                      </Text>
                      <Button
                        variant="link"
                        colorScheme="primary"
                        w={"full"}
                        my={5}
                        onClick={() => {
                          setNewReview(newReview);
                          setEditing(true);
                        }}>
                        Edit Review
                      </Button>
                    </>
                  ) : (
                    <Textarea
                      color={"white"}
                      value={newReview}
                      onFocus={() => setEditing(true)}
                      onChange={(e) => {
                        setNewReview(e.target.value);
                      }}
                      fontSize={"sm"}
                      placeholder="Type out your review here"
                    />
                  )}
                  {editing && (
                    <Button
                      variant="link"
                      colorScheme="primary"
                      w={"full"}
                      my={5}
                      onClick={() => {
                        setEditing(false);
                        setReviewText(newReview);
                        onSaveToWatchlist &&
                          onSaveToWatchlist(movieDetails, watched, newReview);
                      }}>
                      Save Review
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Text fontSize="2xs" color="white">
                    {'You must mark a movie as "Watched" to give it a review'}
                  </Text>
                </>
              )}
            </>
          ) : (
            <>
              <Text my={2} color="white" fontWeight={"bold"} fontSize={"sm"}>
                Your Review
              </Text>
              <Center>
                <Text fontSize="2xs" color="white">
                  {
                    'You must add a movie to your watchlist and mark as "Watched" to review it.'
                  }
                </Text>
              </Center>
            </>
          )}
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          {isWatchlist ? (
            <>
              {savedMovie!.watched ? (
                <Button isDisabled colorScheme="primary" mr={3}>
                  Watched
                </Button>
              ) : (
                <Button
                  variant="solid"
                  colorScheme="primary"
                  mr={3}
                  onClick={() => onMarkWatched(savedMovie!)}>
                  Mark As Watched
                </Button>
              )}
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={() => {
                  setEditing(false);
                  onRemove(savedMovie!);
                  onClose();
                }}>
                Remove
              </Button>
            </>
          ) : (
            <>
              {saved ? (
                watched ? (
                  <Button isDisabled colorScheme="primary" mr={3}>
                    Watched
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    colorScheme="primary"
                    mr={3}
                    onClick={() => {
                      onSaveToWatchlist &&
                        onSaveToWatchlist(movieDetails, watched, newReview);
                      setWatched(true);
                    }}>
                    Mark As Watched
                  </Button>
                )
              ) : (
                <Button
                  variant="solid"
                  colorScheme="primary"
                  mr={3}
                  onClick={() => {
                    onSaveToWatchlist &&
                      onSaveToWatchlist(movieDetails, watched, newReview);
                    setSaved(true);
                  }}>
                  Save to Watchlist
                </Button>
              )}
              {saved && (
                <Button
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => {
                    setEditing(false);
                    setSaved(false);
                    onClose();
                  }}>
                  Remove
                </Button>
              )}
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MovieModal;
