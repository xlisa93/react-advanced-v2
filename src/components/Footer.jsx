import { Box, Divider, Flex } from "@chakra-ui/react";
import { ChatIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";

export const Footer = () => {
  return (
    <div className="Footer">
      <Divider w="75%" m="0 auto" />
      <Flex
        flexDir={["column", "row"]}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        m={4}
        gap={6}
      >
        <Box> © reACTivities 2024</Box>
        <Flex fontWeight="bold" gap={6}>
          {" "}
          Contact:
          <ChatIcon />
          <EmailIcon />
          <PhoneIcon />
        </Flex>
      </Flex>
    </div>
  );
};
