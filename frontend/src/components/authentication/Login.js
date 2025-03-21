import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);
    
    const submitHandler = async () => { 
        setLoading(true)
        if ( !email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', // Ensure the correct content type
                }
            };

            const { data } = await axios.post("api/user/login", { email, password }, config);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
            
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });   
            setLoading(false)    
            
        }
    }

    return (
        <VStack spacing='5px'>
                <FormControl w="100%" id='email' isRequired>
                    <FormLabel>Email </FormLabel>
                <Input value={email} placeholder='Enter Your Name' onChange={e=>{setEmail(e.target.value)}} />
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
            </FormControl>

            <Button colorPalette="blue"  width='100%' style={{marginTop: 15}} onClick={submitHandler}>
                LogIn
            </Button>
            <Button colorPalette="red" width='100%' style={{ marginTop: 15 }}
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("12345");
                }}
            >
                    Get Guest User Credentials
            </Button>
            
            </VStack>
    )
}

export default Login
