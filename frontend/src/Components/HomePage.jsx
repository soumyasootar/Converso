import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

const HomePage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        p="3"
        m="40px 0 20px 0"
        borderRadius={"xl"}
        borderWidth={"thick"}
        fontFamily={"Carlito"}
        bg={"white"}
        w={"100%"}
      >
        <Text fontSize={"4xl"} textAlign={"center"} fontWeight={"extrabold"}>
          C o n v e r s o
        </Text>
      </Box>

      <Box
        borderWidth={"1px"}
        p="4"
        borderRadius={"lg"}
        fontFamily={"Carlito"}
        bg={"white"}
        w={"100%"}
        color={"black"}
      >
        <Tabs variant="soft-rounded" >
          <TabList >
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign-Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
