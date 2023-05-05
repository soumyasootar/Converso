import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "./SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  // to fetch chats again and again 
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats  fetchAgain={fetchAgain}/>}
        {user && <ChatBox  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default ChatPage;
