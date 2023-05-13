"use client";
import CustomNavigation from "@/components/navigation";
import SearchInput from "@/components/searchInput";
import {
  Accordion,
  Box,
  Center,
  Container,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MovieDetails, SavedMovie } from "@/utils/types";
import MovieGrid, { SaveState } from "@/components/movieGrid";
import useSWR from "swr";
import CustomPagination from "@/components/pagination";
import { getSavedMovies } from "@/utils/getSavedMovies";
import WatchlistGrid from "@/components/watchlistGrid";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());

export default function Home() {
  const [word, setWord] = useState("Avengers");
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [savedMovies, setSavedMovies] = useState<SaveState>({} as SaveState);
  const [windowSize, setWindowSize] = useState<number[]>([]);
  const { data: movies, isLoading } = useSWR(
    `/api/search?term=${searchTerm}&page=${page}`,
    fetcher
  );

  useEffect(() => {
    !isLoading && setTotalRecords(movies?.totalResults);
  }, [movies, isLoading]);

  useEffect(() => {
    getSavedMovies(setSavedMovies);
  }, [setSavedMovies]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Box w="full" h="full" m={0} backgroundColor={"#121721"}>
      <CustomNavigation />
      <Tabs
        isFitted={windowSize[0] <= 500}
        position="relative"
        variant="unstyled"
        defaultIndex={0}
        px={10}
        colorScheme="primary">
        <TabList>
          <Tab color={"white"}>Search</Tab>
          <Tab color={"white"}>Watchlist</Tab>
        </TabList>
        {windowSize && (
          <TabIndicator
            mt="-1.5px"
            w="full"
            height={windowSize[0] <= 500 ? "2px" : "2px"}
            bg="primary.500"
            borderRadius="1px"
          />
        )}
        <TabPanels>
          <TabPanel>
            <Flex direction={"column"} justifyContent={"center"} gap={10}>
              {word.length > 0 && (
                <SearchInput
                  initialWord={word}
                  setSearchTerm={setSearchTerm}
                  setPage={setPage}
                />
              )}
              {isLoading ? (
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 5 }} w="full" p={4}>
                  <Skeleton rounded="lg" height="200px" m={5} />
                  <Skeleton rounded="lg" height="200px" m={5} />
                  <Skeleton rounded="lg" height="200px" m={5} />
                  <Skeleton rounded="lg" height="200px" m={5} />
                  <Skeleton rounded="lg" height="200px" m={5} />
                </SimpleGrid>
              ) : movies?.returnData.length > 0 ? (
                <MovieGrid
                  movies={movies.returnData}
                  setSavedMovies={setSavedMovies}
                  savedMovies={savedMovies}
                  windowWidth={windowSize[0]}
                />
              ) : null}
              {!isLoading ? (
                movies?.returnData.length > 0 ? (
                  <div style={{ display: "none" }}>
                    <MovieGrid
                      movies={movies.returnData}
                      setSavedMovies={setSavedMovies}
                      savedMovies={savedMovies}
                      windowWidth={windowSize[0]}
                    />
                  </div>
                ) : null
              ) : null}
              <CustomPagination
                page={page}
                setPage={setPage}
                totalRecords={totalRecords}
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              gap={10}
              mt={10}>
              {isLoading ? (
                <Skeleton></Skeleton>
              ) : Object.keys(savedMovies).length > 0 ? (
                <WatchlistGrid
                  movies={Object.keys(savedMovies).map(
                    (id: string) => savedMovies[id]
                  )}
                  setSavedMovies={setSavedMovies}
                  savedMovies={savedMovies}
                  windowWidth={windowSize[0]}
                />
              ) : (
                <Center>
                  <Text fontWeight="bold" color="white">
                    {"No movies saved yet  :("}
                  </Text>
                </Center>
              )}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
