import React, { useEffect } from 'react';
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
import SignUp from '../components/authentication/SignUp';
import Login from '../components/authentication/Login';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo) {
      navigate('/chats');
    }
    
  },[navigate])
  return (  
    <Container maxW='2xl' centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3} w="100%"
        m="60px 0 15px 0"
        borderRadius="lg"
        borderWidth='1px'
        backgroundColor={'white'}>
        <Text fontSize="4xl" fontFamily="Work sans">Talko</Text>
      </Box>
      <Box bg="white"
        justifyContent='center'
        p={4} w="100%"
        borderRadius="lg"
        borderWidth='1px' >
          <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

    </Container>
  )
}

export default HomePage
