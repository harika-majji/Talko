import React from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box } from "@chakra-ui/layout";
import ChatBox from '../components/ChatBox';
import ChatList from '../components/ChatList';
import SideDrawer from '../components/miscellaenous/SideDrawer';

const ChatPage = () => {
  const { user } = ChatState();
    
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer/>}
      <Box display="flex" justifyContent="space-between" w="100%"  h="91.5vh" p="10px">
        {user && <ChatList />}
         {user && <ChatBox/>} 
      </Box>

    </div>
   
  )
}

export default ChatPage
