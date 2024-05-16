import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Image } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex
      flexDir={["column", "row"]}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      mt={4}
      marginX={4}
    >
      <Box p={6} gap={4}>
        <Link to="/">
          <Image src="/logo2.png" h="100px" />
        </Link>
      </Box>
      <Button colorScheme="teal" variant="ghost" fontSize={"2xl"} p={6} gap={4}>
        <Link to="/">Homepage</Link>
      </Button>
      <Button colorScheme="teal" variant="ghost" fontSize={"2xl"} p={6} gap={4}>
        <Link to="/">About us</Link>
      </Button>
      <Button colorScheme="teal" variant="ghost" fontSize={"2xl"} p={6} gap={4}>
        <Link to="/">Jobs</Link>
      </Button>
    </Flex>
  );
};
