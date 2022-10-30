import React from 'react';
import MessageAndSend from './components/MessageAndSend';
import Login from "./components/Login"
import axios from 'axios';
import { Box, Grid } from '@mui/material';
const username = localStorage.getItem("username")
function App() {
  return (
    <Box sx={{ margin: "25px", flexGrow: 1 }}>
      {username ? <MessageAndSend /> : <Login />}
    </Box>
  );
}

export default App;
