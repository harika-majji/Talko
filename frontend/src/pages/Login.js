import React, { useState } from 'react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Input, VStack } from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster";
import { PasswordInput } from "../components/ui/password-input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const submitHandler = async () => { 
        setLoading(true)
        if ( !email || !password) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                duration: 5000
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
            toaster.success({
                title: "Login Successful",  
                duration: 5000
            });

            localStorage.setItem("UserInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
            
        } catch (error) {
            toaster.create({
                title: "Error Occured!",
                description: error.response.data.message,
                type: "error",
                duration: 5000
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
                <FormControl w="100%" id='password' isRequired>
                    <FormLabel>Password </FormLabel>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
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
            <Toaster />
            
                

            </VStack>
    )
}

export default Login
