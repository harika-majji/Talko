import React, { useState } from 'react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../components/ui/file-upload";
import { Button, Input, VStack } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { HiUpload } from "react-icons/hi";

function SignUp() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const submitHandler=()=>{}

    return (
        <VStack spacing='5px'>
            <FormControl w="100%" id='first-name' isRequired>
                <FormLabel>Name </FormLabel>
                <Input value={name} placeholder='Enter Your Name' onChange={e=>{setName(e.target.value)}} />
            </FormControl>
            <FormControl w="100%" id='email' isRequired>
                <FormLabel>Email </FormLabel>
                <Input value={email} placeholder='Enter Your Name' onChange={e=>{setEmail(e.target.value)}} />
            </FormControl>
            <FormControl w="100%" id='password' isRequired>
                <FormLabel>Password </FormLabel>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl w="100%" id='confirm-password' isRequired>
                <FormLabel>Confirm Password </FormLabel>
                <PasswordInput value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
            </FormControl>
            <FormControl w="100%" id='pic' isRequired>
                <FormLabel>Upload your Picture </FormLabel>
                <FileUploadRoot accept={["image/jpeg"]} onChange={(e)=> setPic(e.target.files[0])}>
                    <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm">
                        <HiUpload /> Upload file
                        </Button>
                    </FileUploadTrigger>
                    <FileUploadList />
                </FileUploadRoot>
            </FormControl>

            <Button colorPalette="blue" width='100%' style={{marginTop: 15}} onClick={submitHandler}>
                SignUp
            </Button>
            

        </VStack>
  )
}

export default SignUp
