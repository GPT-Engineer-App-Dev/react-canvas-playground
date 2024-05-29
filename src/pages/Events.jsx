```jsx
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
      toast({