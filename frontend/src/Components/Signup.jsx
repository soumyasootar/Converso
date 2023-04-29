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

const Signup = () => {
  const [show, setshow] = useState(false);
  const ref = useRef(null);
  const toast = useToast();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const navigate = useNavigate();
  

  const submitForm = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    const formData = new FormData(ref.current);

    if (formData.get("password") === formData.get("confirm-password")) {
      const obj = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        pic: pic,
      };
      console.log("obj: ", obj);
      toast({
        title: "Account created",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        /* Sending a POST request to the "/api/user" endpoint with the data object and configuration
        options provided, and then destructuring the response data from the returned Promise object.
        The response data is then stored in the `data` variable. */
        const { data } = await axios.post("/api/user", obj, config);
        console.log(data);
        toast({
          title: "Registration Successful",
          description: "We've created your account for you",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
        navigate("/chats");
      } catch (error) {
        toast({
          title: "Error Occured ! While Registering",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
      }
    } else {
      toast({
        title: `Password Doesnt Match`,
        status: "warning",
        isClosable: true,
        duration: 9000,
        position: "top",
      });
    }
  };

  const postDetails = async (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    console.log(pics);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "converso");
      data.append("cloud_name", "dr7k3nwvd");
      fetch("https://api.cloudinary.com/v1_1/dr7k3nwvd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
          toast({
            title: "Picture Uploaded",
            description: "Uploaded to Cloudinary DataBase",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
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

        <FormControl mb={2}>
          <FormLabel>Profile Pic</FormLabel>
          <Input
            type="file"
            name="image"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          type="submit"
          w={"full"}
          mt="2"
          isLoading={picLoading}
          colorScheme="blue"
        >
          Sign Up
        </Button>
      </form>
    </VStack>
  );
};

export default Signup;
