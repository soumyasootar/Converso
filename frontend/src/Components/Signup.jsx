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

const Signup = () => {
  const [show, setshow] = useState(false);
  const ref = useRef(null);
  const toast = useToast();

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(ref.current);
    if (formData.get("password") === formData.get("confirm-password")) {
      const obj = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        pic: formData.get("image"),
      };
      console.log("obj: ", obj);
      toast({
        title: "Account created",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Password Doesnt Match`,
        status: "warning",
        isClosable: true,
        duration: 9000,
      });
    }
  };
  return (
    <VStack spacing={"5px"}>
      <form ref={ref} style={{ width: "100%" }} onSubmit={submitForm}>
        <FormControl isRequired mb={5}>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter your name" type="text" name="name" />
        </FormControl>
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
        <FormControl isRequired mb={2}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Enter your name"
            type={"password"}
            name="confirm-password"
          />
        </FormControl>

        <FormControl  mb={2}>
          <FormLabel>Profile Pic</FormLabel>
          <Input type="file" name="image" p={1.5} accept="image/*" />
        </FormControl>
        <Button type="submit" w={"full"} mt="2" colorScheme="blue">
          Sign Up
        </Button>
      </form>
    </VStack>
  );
};

export default Signup;
