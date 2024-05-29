import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";

const Navbar = () => (
  <Box bg="teal.500" px={4}>
    <Flex h={16} alignItems="center" justifyContent="space-between">
      <Box>
        <Link as={NavLink} to="/" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.700' }} _activeLink={{ bg: 'teal.700' }} color="white">
          Home
        </Link>
        <Link as={NavLink} to="/events" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.700' }} _activeLink={{ bg: 'teal.700' }} color="white">
          Events
        </Link>
      </Box>
    </Flex>
  </Box>
);

function App() {
  return (
    <Router>
      <Box>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;