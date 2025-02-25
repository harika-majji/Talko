import React, { useState } from 'react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../components/ui/file-upload";
import { Button, Input, VStack } from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster";
import { PasswordInput } from "../components/ui/password-input";
import { HiUpload } from "react-icons/hi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  

    const submitHandler = async () => { 
        setLoading(true)
        if (!name || !email || !confirmpassword || !password) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                duration: 5000
            });
            setLoading(false)
            return
        }
        if (password !== confirmpassword) {
            toaster.create({
                title: "Password do not match",
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

            const { data } = await axios.post("http://localhost:5001/api/user/", { name, email, password, pic }, config);
            toaster.success({
                title: "Registration Successful",  
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
    
    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toaster.create({
                title: "Please Select an Image!",
                type: "warning",
                duration: 5000
            });
        return;
        }

        if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
        toaster.create({
            title: "Please Select a JPEG or PNG Image!",
            type: "warning",
            duration: 5000
        });
        setLoading(false);
        return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {

        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", "chat-app")
        data.append("cloud_name", "harikamajji")
        axios.post("https://api.cloudinary.com/v1_1/harikamajji/image/upload", data)
            .then((response) => {
            console.log("Cloudinary response:", response);
            setPic(response.data.url.toString());
            setLoading(false);
            toaster.create({
                title: "Image uploaded successfully!",
                type: "success",
                duration: 5000
            });
            })
            .catch((error) => {
            console.log("Cloudinary error:", error);
            setLoading(false);
            });
        }
    }

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
                <FileUploadRoot accept={["image/jpeg"]} onChange={(e)=> postDetails(e.target.files[0])}>
                    <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm">
                        <HiUpload /> Upload file
                        </Button>
                    </FileUploadTrigger>
                    <FileUploadList />
                </FileUploadRoot>
            </FormControl>

            <Button colorPalette="blue" width='100%' style={{ marginTop: 15 }} isLoading={loading} onClick={submitHandler}>
                SignUp
            </Button>
            <Toaster />
            

        </VStack>
  )
}

export default SignUp
