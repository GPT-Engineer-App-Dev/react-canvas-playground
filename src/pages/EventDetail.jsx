import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text, VStack, Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useEvent, useComments, useAddComment, useAddEventSignup } from '../integrations/supabase';

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments(id);
  const addComment = useAddComment();
  const addEventSignup = useAddEventSignup();
  const toast = useToast();

  const [newComment, setNewComment] = useState('');
  const [signup, setSignup] = useState({ name: '', email: '' });

  const handleAddComment = async () => {
    try {
      await addComment.mutateAsync({ content: newComment, event_id: id });
      setNewComment('');
      toast({ title: 'Comment added.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error adding comment.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleSignup = async () => {
    try {
      await addEventSignup.mutateAsync({ ...signup, event_id: id });
      setSignup({ name: '', email: '' });
      toast({ title: 'Signed up successfully.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error signing up.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  if (eventLoading || commentsLoading) return <div>Loading...</div>;
  if (eventError || commentsError) return <div>Error loading event details.</div>;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl">{event.name}</Heading>
        <Text fontSize="lg">{event.date}</Text>
        <Text>{event.description}</Text>
        <Box w="100%" mt={8}>
          <Heading as="h2" size="lg" mb={4}>Sign Up for Event</Heading>
          <FormControl id="signup-name" mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={signup.name}
              onChange={(e) => setSignup({ ...signup, name: e.target.value })}
              placeholder="Your name"
            />
          </FormControl>
          <FormControl id="signup-email" mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={signup.email}
              onChange={(e) => setSignup({ ...signup, email: e.target.value })}
              placeholder="Your email"
            />
          </FormControl>
          <Button colorScheme="teal" mt={2} onClick={handleSignup}>Sign Up</Button>
        </Box>
        <Box w="100%" mt={8}>
          <Heading as="h2" size="lg" mb={4}>Comments</Heading>
          {comments.map((comment) => (
            <Box key={comment.id} p={4} bg="gray.100" borderRadius="md" mb={4}>
              <Text>{comment.content}</Text>
            </Box>
          ))}
          <FormControl id="new-comment" mt={4}>
            <FormLabel>Add a Comment</FormLabel>
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Your comment"
            />
            <Button colorScheme="teal" mt={2} onClick={handleAddComment}>Submit</Button>
          </FormControl>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventDetail;