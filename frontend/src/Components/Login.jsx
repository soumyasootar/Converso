import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setshow] = useState(false);
  const ref = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const obj = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("obj: ", obj);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login", obj, config);

      toast({
        title: "Welcome Back",
        description: "Long Time No See !!!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      navigate("/chats");
    } catch (error) {
      console.log("error: ", error);
      toast({
        title: "Error Occured while Logging In!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={"5px"}>
      <form ref={ref} style={{ width: "100%" }} onSubmit={submitForm}>
        <FormControl isRequired mb={2}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter your email" type="email" name="email" />
        </FormControl>
        <FormControl isRequired mb={2}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter your name"
              type={show ? "Text" : "password"}
              name="password"
            />
            <InputRightElement width={"4em"}>
              <Button
                onClick={() => {
                  setshow(!show);
                }}
                backgroundColor={"transparent"}
              >
                {!show ? <ViewIcon/> : <ViewOffIcon/>}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          type="submit"
          w={"full"}
          mt="2"
          isLoading={loading}
          colorScheme="blue"
        >
          Sign Up
        </Button>
      </form>
    </VStack>
  );
};

export default Login;
