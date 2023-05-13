"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type SearchInputType = {
  initialWord: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const SearchInput = ({
  initialWord,
  setSearchTerm,
  setPage,
}: SearchInputType) => {
  const [term, setTerm] = useState(initialWord);

  const onButtonPress = () => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      setSearchTerm(term);
      setPage(1);
    }
  };

  return (
    <Flex justifyContent={"center"} gap={5}>
      <Input
        bg={"#1C202F"}
        borderRadius={10}
        maxWidth={["100%", "100%", "50%"]}
        color={"white"}
        border="none"
        placeholder="Search for a movie..."
        _placeholder={{ color: "#FFFFFF" }}
        value={term}
        size={"md"}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
      />
      {term.length > 0 && (
        <IconButton
          isActive
          size={"md"}
          aria-label="Search Movies"
          colorScheme="primary"
          icon={<SearchIcon />}
          onClick={() => onButtonPress()}
        />
      )}
    </Flex>
  );
};

export default SearchInput;
