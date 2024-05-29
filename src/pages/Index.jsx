import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to Your Blank Canvas</Heading>
        <Text fontSize="lg">Start creating your masterpiece by editing this page.</Text>
        <Button leftIcon={<FaEdit />} colorScheme="teal" variant="solid" size="lg" mt={6}>
          Start Editing
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;