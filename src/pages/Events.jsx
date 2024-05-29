import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Heading, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const toast = useToast();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = async () => {
    try {
      await addEvent.mutateAsync(newEvent);
      setNewEvent({ name: '', date: '', description: '' });
      toast({ title: 'Event added.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error adding event.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent.mutateAsync(editingEvent);
      setEditingEvent(null);
      toast({ title: 'Event updated.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error updating event.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: 'Event deleted.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error deleting event.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events.</div>;

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Events</Heading>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            placeholder="Event Name"
          />
        </FormControl>
        <FormControl id="date">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Event Description"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>

        {editingEvent && (
          <>
            <Heading as="h2" size="lg">Edit Event</Heading>
            <FormControl id="edit-name">
              <FormLabel>Name</FormLabel>
              <Input
                value={editingEvent.name}
                onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                placeholder="Event Name"
              />
            </FormControl>
            <FormControl id="edit-date">
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
              />
            </FormControl>
            <FormControl id="edit-description">
              <FormLabel>Description</FormLabel>
              <Input
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                placeholder="Event Description"
              />
            </FormControl>
            <Button colorScheme="teal" onClick={handleUpdateEvent}>Update Event</Button>
            <Button colorScheme="red" onClick={() => setEditingEvent(null)}>Cancel</Button>
          </>
        )}

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>
                  <Link to={`/events/${event.id}`} style={{ color: 'teal', textDecoration: 'underline' }}>
                    {event.name}
                  </Link>
                </Td>
                <Td>{event.date}</Td>
                <Td>{event.description}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Events;