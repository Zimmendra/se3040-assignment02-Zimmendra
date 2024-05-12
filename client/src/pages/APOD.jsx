import React, { useState, useEffect } from 'react';
import { Center, Heading, VStack, Image, Text, Input, Button, Flex, Box } from '@chakra-ui/react';
import Nav from '../components/Nav';
import spaceBg from '../src/svgs/rwow8CCG3C3GrqHGiK8qcJ-1200-80.jpg';

export const NEOTracker = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [marsPhotos, setMarsPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch Mars photos');
            }
            const data = await response.json();
            // Assuming the first two items in the response contain Mars photos
            if (data.collection.items.length > 1) {
                setMarsPhotos([data.collection.items[0], data.collection.items[1]]);
            } else if (data.collection.items.length === 1) {
                setMarsPhotos([data.collection.items[0]]);
            } else {
                setMarsPhotos([]);
                setError('No photos found for the search query.');
            }
        } catch (error) {
            console.error('Error fetching Mars photos:', error);
            setError('Error fetching Mars photos. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    return (
        <>
            <Nav />
            <Box
                bgImage={`url(${spaceBg})`} // Use the background image here
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                h="100vh"
                position="relative"
                overflow="hidden"
            >
                <Center>
                    <VStack spacing={8} alignItems="center" mt={8} maxW="800px" mx="auto">
                        <Heading >Explore Space Images using the image wizard</Heading>
                        <Flex alignItems="flex-start"> {/* Align items to the top */}
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for space-related images"
                                mr={2}
                            />
                            <Button onClick={handleSearch} isLoading={loading}>
                                Search
                            </Button>
                        </Flex>
                        {error && <Text color="red.500">{error}</Text>}
                        {marsPhotos.length > 0 ? (
                            <Flex justifyContent="center">
                                {marsPhotos.map((photo, index) => (
                                    <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md" mr={4}>
                                    <Box h="200px" w="200px"> {/* Set fixed height and width for the container */}
                                        <Image src={photo.links[0].href} alt={photo.data[0].title} w="100%" h="100%" objectFit="cover" /> {/* Set image to cover the container */}
                                    </Box>
                                    <Text mt={2} Text color="white" fontSize="sm">{photo.data[0].description}</Text> {/* Set font size for the description */}
                                </Box>
                                ))}
                            </Flex>
                        ) : (
                            <Text>No photos found for the search query.</Text>
                        )}
                    </VStack>
                </Center>
            </Box>
        </>
    );
};

export default NEOTracker;
