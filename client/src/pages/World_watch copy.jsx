import React, { useState } from 'react';
import { Center, Heading, VStack, Input, Button, Text, Box } from '@chakra-ui/react';
import Nav from '../components/Nav';
import axios from 'axios'; // Import axios for HTTP requests
import spaceBg from '../src/svgs/rwow8CCG3C3GrqHGiK8qcJ-1200-80.jpg';

export const Fact_wizard = () => {
    const [spaceFactData, setSpaceFactData] = useState({ explanation: '', url: '' });
    const [selectedDate, setSelectedDate] = useState('');

    const fetchAPOD = async (date) => {
        try {
            const response = await axios.get('https://api.nasa.gov/planetary/apod', {
                params: {
                    api_key: 'njTFkut9CqVIdhAEfWwrduLezVzdg9MQdJa2uMxU', // Replace with your actual NASA API key
                    date: date,
                },
            });
            setSpaceFactData({
                explanation: response.data.explanation,
                url: response.data.url,
            });
        } catch (error) {
            console.error('Error fetching APOD:', error);
            setSpaceFactData({
                explanation: 'Failed to fetch Astronomy Picture of the Day.',
                url: '',
            });
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleFetchClick = () => {
        if (selectedDate.trim() !== '') {
            fetchAPOD(selectedDate);
        } else {
            alert('Please enter a valid date.');
        }
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
                overflowY="auto" // Enable vertical scrolling
            >
                <Center>
                    <VStack spacing={8} alignItems="flex-start" mt={8} maxW="800px" mx="auto">
                        <Heading>Astronomy Picture of the Day</Heading>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            max={new Date().toISOString().split('T')[0]} // Restrict to today or earlier
                        />
                        <Button onClick={handleFetchClick}>Fetch APOD</Button>
                        {spaceFactData.url && (
                            <img src={spaceFactData.url} alt="Astronomy Picture of the Day" />
                        )}
                        {spaceFactData.explanation && (
                            <Text mt={4} Text color="white">{spaceFactData.explanation}</Text>
                        )}
                    </VStack>
                </Center>
            </Box>
        </>
    );
};

export default Fact_wizard;
