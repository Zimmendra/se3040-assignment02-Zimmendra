import React, { useContext } from 'react';
import { Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, useToast, VStack } from '@chakra-ui/react';

import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaSpaceShuttle } from 'react-icons/fa';
import { Text } from '@chakra-ui/react';

function Login() {
    const { login } = useContext(AuthContext);
    const authService = new AuthService();
    const navigate = useNavigate();
    const toast = useToast();

    const validationSchema = Yup.object().shape({
        userName: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:7000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                // Assuming the API returns the user data upon successful registration
                if (data.role && data.token) {
                    // Navigate to home page
                    navigate('/home');
                    window.location.href = `http://localhost:3000/home`;
                    toast({
                        title: 'Login Successful',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: 'Login Failed',
                        description: 'Invalid credentials. Please try again.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Login Error',
                    description: 'An error occurred while logging in.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        },
    });

    return (
        <Stack direction={'row'} spacing={0} minH={'100vh'}>
            <Flex alignItems={'center'} justifyContent={'center'} width={{ base: 0, md: '100%', lg: '100%' }}>
                <VStack p={10} spacing={5}>
                    <Heading fontSize={{ base: '0', md: '5xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'pink.500',
                                zIndex: -1,
                            }}
                        />
                        <br />
                        <Text color={'pink.500'} as={'span'} display="flex" alignItems="center">
                            <FaRocket style={{ marginRight: '0.5rem' }} />
                            Explore{' '}
                            <Text color={'blue.500'} as={'span'} fontWeight="bold">
                                Space
                            </Text>{' '}
                            <FaSpaceShuttle style={{ marginLeft: '0.5rem' }} />
                        </Text>
                    </Heading>
                </VStack>
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <Container>
                    <VStack as={'form'} p={10} onSubmit={formik.handleSubmit} borderRadius={'xl'} boxShadow={'2xl'} spacing={5}>
                        <Heading>Login</Heading>
                        <FormControl isInvalid={formik.touched.userName && formik.errors.userName}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                                name='userName'
                                type='text'
                            />
                            <FormErrorMessage>{formik.errors.userName}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                name='password'
                                type='password'
                            />
                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                        </FormControl>
                        <Button type='submit' colorScheme={'pink'}>
                            Submit
                        </Button>
                    </VStack>
                </Container>
            </Flex>
        </Stack>
    );
}

export default Login;
