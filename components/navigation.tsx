import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";

const CustomNavigation = () => {
  return (
    <>
      <Box bg={"#121721"} px={5} pb={5}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Image src={"./filmFavesLogo.png"} alt={"Film Faves Logo"} h="40px" />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}>
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList
                  alignItems={"center"}
                  bg="blackAlpha.400"
                  backdropFilter="auto"
                  backdropBlur="16px"
                  borderColor={"#323232"}
                  borderWidth={"0.5px"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text color={"white"}>John Hancock</Text>
                  </Center>
                  <br />
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CustomNavigation;
