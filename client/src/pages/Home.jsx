import { Center, Heading, VStack, Box, Text } from '@chakra-ui/react';
import { useCallback, useContext, useEffect } from 'react';
import Nav from '../components/Nav';
import { HStack } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import spaceBg from '../src/svgs/rwow8CCG3C3GrqHGiK8qcJ-1200-80.jpg'; // Replace with the correct path to your space background image

function Home() {
    const { user } = useContext(AuthContext);

    const getData = useCallback(async () => {
        try {
            // Fetch data or perform relevant actions
        } catch (error) {
            console.log(error.message);
        }
    }, [user.id]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <>
            <Nav />
            <Box
                bgImage={`url(${spaceBg})`}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                h="100vh"
                position="relative"
                overflow="hidden"
            >
                <VStack
                    spacing={8}
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    textAlign="center"
                    zIndex="1"
                >
                    <Heading color="black" fontSize="4xl" mb={4} fontWeight="bold" fontFamily="sans-serif">
                        Explore the Space
                    </Heading>
                    <Text color="black" fontSize="xl">
                        Journey through galaxies, discover new planets, and unravel the mysteries of the universe.
                    </Text>
                </VStack>
                <HStack
                    position="absolute"
                    bottom="50px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex="1"
                    spacing={6}
                >
                    <Box
                        bg="teal.400"
                        borderRadius="full"
                        w="10px"
                        h="10px"
                        opacity="0.5"
                        animation="move1 3s infinite alternate"
                    />
                    <Box
                        bg="teal.200"
                        borderRadius="full"
                        w="15px"
                        h="15px"
                        opacity="0.7"
                        animation="move2 2s infinite alternate"
                    />
                    <Box
                        bg="teal.600"
                        borderRadius="full"
                        w="20px"
                        h="20px"
                        opacity="1"
                        animation="move3 1s infinite alternate"
                    />
                </HStack>
            </Box>
        </>
    );
}

export default Home;
