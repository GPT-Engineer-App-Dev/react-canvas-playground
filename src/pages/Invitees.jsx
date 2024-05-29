import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text, VStack, Box, useToast } from '@chakra-ui/react';
import { useEvent, useEventSignups } from '../integrations/supabase';

const Invitees = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: signups, isLoading: signupsLoading, isError: signupsError } = useEventSignups(id);
  const toast = useToast();

  if (eventLoading || signupsLoading) return <div>Loading...</div>;
  if (eventError || signupsError) return <div>Error loading invitees.</div>;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl">Invitees for {event.name}</Heading>
        <Text fontSize="lg">{event.date}</Text>
        <Text>{event.description}</Text>
        <Box w="100%" mt={8}>
          <Heading as="h2" size="lg" mb={4}>Invitees</Heading>
          {signups.length === 0 ? (
            <Text>No invitees yet.</Text>
          ) : (
            signups.map((signup) => (
              <Box key={signup.id} p={4} bg="gray.100" borderRadius="md" mb={4}>
                <Text>Name: {signup.name}</Text>
                <Text>Email: {signup.email}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Invitees;