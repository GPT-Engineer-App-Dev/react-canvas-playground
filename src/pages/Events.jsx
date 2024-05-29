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

  return (
    <Container>
      <Heading as="h1" mb={4}>Events</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Event Name</FormLabel>
          <Input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Event Date</FormLabel>
          <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Event Description</FormLabel>
          <Input value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
        </FormControl>
        <Button onClick={handleAddEvent} colorScheme="teal">Add Event</Button>
      </VStack>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading events.</p>
      ) : (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Invitees</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{event.description}</Td>
                <Td>
                  <Link to={`/events/${event.id}/invitees`} style={{ color: 'teal', textDecoration: 'underline' }}>
                    View Invitees
                  </Link>
                </Td>
                <Td>
                  <Button onClick={() => setEditingEvent(event)} colorScheme="blue" size="sm" mr={2}>Edit</Button>
                  <Button onClick={() => handleDeleteEvent(event.id)} colorScheme="red" size="sm">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {editingEvent && (
        <VStack spacing={4} align="stretch" mt={4}>
          <FormControl>
            <FormLabel>Event Name</FormLabel>
            <Input value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Event Date</FormLabel>
            <Input type="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Event Description</FormLabel>
            <Input value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
          </FormControl>
          <Button onClick={handleUpdateEvent} colorScheme="teal">Update Event</Button>
        </VStack>
      )}
    </Container>
  );
};

export default Events;