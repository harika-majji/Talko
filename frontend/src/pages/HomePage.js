import React from 'react';
import { Container, Box, Text, Flex, Tabs } from "@chakra-ui/react";
import SignUp from './SignUp';
import Login from './Login';

const HomePage = () => {
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
        <Text fontSize="4xl" fontFamily="Work sans">Talk-A-Tive</Text>
      </Box>
      <Box bg="white"
        justifyContent='center'
        p={4} w="100%"
        borderRadius="lg"
        borderWidth='1px' >
        <Flex minH="dvh">
          <Tabs.Root defaultValue="1" width="full">
            <Tabs.List mb='1em'>
              <Tabs.Trigger width="50%" justifyContent='center' key={"Login"} value={"Login"}>
                  Login
              </Tabs.Trigger>
              <Tabs.Trigger width="50%" justifyContent='center' key={"Sign Up"} value={"Sign Up"}>
                  Sign Up
              </Tabs.Trigger>
            </Tabs.List>
            <Box pos="relative" minH="200px" width="full">
              <Tabs.Content
                  key={"1"}
                  value={"Login"}
                  position="absolute"
                  inset="0"
                  _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                  }}
                  _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                  }}
                >
                  <Login/>
              </Tabs.Content>
              <Tabs.Content
                  key={"2"}
                  value={"Sign Up"}
                  position="absolute"
                  inset="0"
                  _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                  }}
                  _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                  }}
                >
                  <SignUp/>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>

      </Box>

    </Container>
  )
}

export default HomePage
