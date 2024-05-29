import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text, VStack, Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useEvent, useComments, useAddComment } from '../integrations/supabase';

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments(id);
  const addComment = useAddComment();
  const toast = useToast();

  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    try {
      await addComment.mutateAsync({ content: newComment, event_id: id });
      setNewComment('');
      toast({ title: 'Comment added.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error adding comment.', status: 'error', duration: 3000, isClosable: true });
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