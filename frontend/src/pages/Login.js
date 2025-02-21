import React, { useState } from 'react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Input, VStack } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const submitHandler=()=>{}

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
            
                

            </VStack>
    )
}

export default Login
