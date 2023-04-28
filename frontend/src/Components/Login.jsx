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
import React, { useRef, useState } from "react";
const Login = () => {
  const [show, setshow] = useState(false);
  const ref = useRef(null);
  const toast = useToast();

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const obj = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("obj: ", obj);
    toast({
      title: "Welcome Back",
      description: "Long Time No See !!!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

      // toast({
      //   title: `Password Doesnt Match`,
      //   status: "warning",
      //   isClosable: true,
      //   duration: 9000,
      // });
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
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button type="submit" w={"full"} mt="2" colorScheme="blue">
          Sign Up
        </Button>
      </form>
    </VStack>
  );
};

export default Login;
