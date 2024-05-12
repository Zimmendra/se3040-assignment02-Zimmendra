import React, { useState, useEffect } from 'react';
import { Center, Heading, VStack, Select, Grid, GridItem, Image, Text, Box } from '@chakra-ui/react';
import Nav from '../components/Nav';
import spaceBg from '../src/svgs/rwow8CCG3C3GrqHGiK8qcJ-1200-80.jpg'; // Import the space background image

export const MarsExploration = () => {
    const [rovers, setRovers] = useState([]);
    const [selectedRover, setSelectedRover] = useState('');
    const [roverData, setRoverData] = useState([]);

    useEffect(() => {
        // Fetch list of Mars rovers
        const fetchRovers = async () => {
            try {
                const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=njTFkut9CqVIdhAEfWwrduLezVzdg9MQdJa2uMxU');
                if (!response.ok) {
                    throw new Error('Failed to fetch rovers');
                }
                const data = await response.json();
                setRovers(data.rovers);
            } catch (error) {
                console.error('Error fetching rovers:', error);
            }
        };

        fetchRovers();
    }, []);

    useEffect(() => {
        if (selectedRover) {
            // Fetch photos for selected rover
            const fetchRoverPhotos = async () => {
                try {
                    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/latest_photos?api_key=njTFkut9CqVIdhAEfWwrduLezVzdg9MQdJa2uMxU`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch rover photos');
                    }
                    const data = await response.json();
                    setRoverData(data.latest_photos);
                } catch (error) {
                    console.error('Error fetching rover photos:', error);
                }
            };

            fetchRoverPhotos();
        }
    }, [selectedRover]);

    const handleRoverChange = (event) => {
        setSelectedRover(event.target.value);
    };

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
                overflowY="auto" // Enable vertical scrolling if needed
            >
                <Center>
                    <VStack spacing={8} alignItems="flex-start" mt={8} maxW="800px" mx="auto">
                        <Heading>Mars Exploration</Heading>
                        <p>Exploring Mars has been a fascinating endeavor, showcasing humanity's relentless curiosity and technological prowess. Through the lenses of NASA's Mars rovers, we get glimpses of the Martian landscape, its geological features, and the ever-evolving understanding of our neighboring planet. These images not only unveil the mysteries of Mars but also inspire us to push the boundaries of space exploration further, fueling dreams of future missions and discoveries that await us among the stars.</p>
                        <Select value={selectedRover} onChange={handleRoverChange} placeholder="Select Rover">
                            {rovers.map((rover) => (
                                <option key={rover.id} value={rover.name}>
                                    {rover.name}
                                </option>
                            ))}
                        </Select>
                        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} justifyContent="left">
                            {roverData.map((photo) => (
                                <GridItem key={photo.id}>
                                    <Image src={photo.img_src} alt="Mars Rover" maxW="100%" />
                                    <Text textAlign="center" Text color="white">{photo.earth_date}</Text>
                                </GridItem>
                            ))}
                        </Grid>
                    </VStack>
                </Center>
            </Box>
        </>
    );
};

export default MarsExploration;
