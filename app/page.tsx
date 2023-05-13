"use client";
import CustomNavigation from "@/components/navigation";
import SearchInput from "@/components/searchInput";
import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Skeleton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import MovieGrid, { SaveState } from "@/components/movieGrid";
import useSWR from "swr";
import CustomPagination from "@/components/pagination";
import { getSavedMovies } from "@/utils/getSavedMovies";
import WatchlistGrid from "@/components/watchlistGrid";
import Head from "next/head";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [savedMovies, setSavedMovies] = useState<SaveState>({} as SaveState);
  const [windowSize, setWindowSize] = useState<number[]>([]);

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
      <Head>
        <title>Film Faves</title>
      </Head>
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
              <SearchInput
                initialWord={searchTerm}
                setSearchTerm={setSearchTerm}
                setPage={setPage}
              />
              {searchTerm.length > 0 ? (
                <MovieGrid
                  setSavedMovies={setSavedMovies}
                  savedMovies={savedMovies}
                  searchTerm={searchTerm}
                  page={page}
                  setPage={setPage}
                />
              ) : (
                <Center>
                  <Text fontWeight="bold" color="white">
                    {"Use the search bar to look up any movie by title"}
                  </Text>
                </Center>
              )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              gap={10}
              mt={10}>
              {Object.keys(savedMovies).length > 0 ? (
                <WatchlistGrid
                  movies={
                    savedMovies
                      ? Object.keys(savedMovies).map(
                          (id: string) => savedMovies[id]
                        )
                      : []
                  }
                  setSavedMovies={setSavedMovies}
                  savedMovies={savedMovies}
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
