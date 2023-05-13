import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type CustomPaginationType = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalRecords: number;
};

type PagButtonType = {
  disabled?: boolean;
  active?: boolean;
  children?: JSX.Element | JSX.Element[];
  idx: number;
};

const CustomPagination = ({
  page,
  setPage,
  totalRecords,
}: CustomPaginationType) => {
  const numPages = Math.ceil(totalRecords / 10);

  const PagButton = ({ disabled, active, children, idx }: PagButtonType) => {
    const activeStyle = {
      bg: "brand.600",
      _dark: {
        bg: "brand.500",
      },
      color: "white",
    };
    return (
      <Button
        mx={1}
        px={4}
        py={2}
        onClick={() => setPage(idx)}
        rounded="md"
        bg="gray.800"
        color="gray.700"
        opacity={disabled ? 0.6 : 1}
        _hover={!disabled ? activeStyle : {}}
        cursor={disabled ? "not-allowed" : "pointer"}
        {...(active && activeStyle)}>
        {children}
      </Button>
    );
  };

  const getPageButtons = (): number[] => {
    if (numPages <= 5) {
      return Array.from({ length: numPages }, (_, i) => i + 1);
    } else {
      if (page <= 2) return [1, 2, 3, 4, 5];
      if (page >= numPages - 1)
        return [
          numPages - 4,
          numPages - 3,
          numPages - 2,
          numPages - 1,
          numPages,
        ];
      return [page - 2, page - 1, page, page + 1, page + 2];
    }
  };

  return (
    <Flex
      bg="#121721"
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center">
      <Flex>
        <PagButton idx={page == 1 ? 1 : page - 1}>
          <ArrowBackIcon color="gray.700" boxSize={4} />
        </PagButton>
        {getPageButtons().map((button, index) => {
          return (
            <PagButton key={index} active={page == button} idx={button}>
              <Text>{button}</Text>
            </PagButton>
          );
        })}
        <PagButton idx={page == numPages ? numPages : page + 1}>
          <ArrowForwardIcon color="gray.700" boxSize={4} />
        </PagButton>
      </Flex>
    </Flex>
  );
};

export default CustomPagination;
