import React, { useContext } from 'react';
import { Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, useToast, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import { FaRocket, FaSpaceShuttle } from 'react-icons/fa';
import { useBreakpointValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

function Register() {
    const authService = new AuthService();
    const toast = useToast();
    const { login } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        username: Yup.string().email('Invalid user name, it needs to be a email address').required('Please provide a valid email as the username'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:7000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                // Assuming the API returns the user data upon successful registration
                if (data.role && data.token) {
                    // Determine the destination page based on the role
                    // Redirect the user to the destination page
                    window.location.href = `http://localhost:3000/home`;
                }
                toast({
                    title: 'Register Successful',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Registration Failed',
                    description: 'An error occurred while registering. Please try again later.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        },
    });

    return (
        <Stack direction={'row'} spacing={0} minH={'100vh'}>
            <Flex alignItems={'center'} justifyContent={'center'} width={{ base: 0, md: '100%', lg: '100%' }}>
                <VStack p={10} spacing={5}>
                    <Stack spacing={6} w={'full'} maxW={'lg'}>
                        <Heading fontSize={{ base: '0', md: '5xl', lg: '6xl' }}>
                            <Text
                                as={'span'}
                                position={'relative'}
                                _after={{
                                    content: "''",
                                    width: 'full',
                                    height: useBreakpointValue({ base: '20%', md: '30%' }),
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
                    </Stack>
                </VStack>
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <Container>
                    <VStack as={'form'} p={10} onSubmit={formik.handleSubmit} borderRadius={'xl'} boxShadow={'2xl'} spacing={5}>
                        <Heading>Register</Heading>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                name='firstName'
                                type='text'
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <Text color="red">{formik.errors.firstName}</Text>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                name='lastName'
                                type='text'
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <Text color="red">{formik.errors.lastName}</Text>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                name='email'
                                type='email'
                            />
                            {formik.touched.email && formik.errors.email && (
                                <Text color="red">{formik.errors.email}</Text>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                name='username'
                                type='text'
                            />
                            {formik.touched.username && formik.errors.username && (
                                <Text color="red">{formik.errors.username}</Text>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                name='password'
                                type='password'
                            />
                            {formik.touched.password && formik.errors.password && (
                                <Text color="red">{formik.errors.password}</Text>
                            )}
                        </FormControl>
                        <Button type='submit' colorScheme={'pink'}>Register</Button>
                        <Button as={Link} to={'/login'}>Login</Button>
                    </VStack>
                </Container>
            </Flex>
        </Stack>
    );
}

export default Register;
