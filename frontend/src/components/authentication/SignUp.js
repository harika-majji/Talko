import React, { useState } from 'react';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
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
    const toast = useToast();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    
    const submitHandler = async () => { 
        setLoading(true)
        if (!name || !email || !confirmpassword || !password) {
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
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
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

            const { data } = await axios.post("http://localhost:5001/api/user/", { name, email, password, pic }, config);
            toast({
                title: "Registration Successful",
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
    
    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        return;
        }

        if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
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
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                <Input
                    type={show ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button colorPalette="blue" width='100%' style={{ marginTop: 15 }} isLoading={loading} onClick={submitHandler}>
                SignUp
            </Button>

        </VStack>
  )
}

export default SignUp
