import { Grid, Button } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { Box } from '@mui/system';
import React from 'react';
import MessageAndSend from './components/MessageAndSend';
import Login from "./components/Login"
import ServerSent from './components/ServerSent';
const username = localStorage.getItem("username")
function App() {
  type todoItem = {
    text: string
  }
  type todoAction = {
    type: "add" | "remove" | "replace"
  }
  const todoReducer = (state: todoItem[], action: todoAction): todoItem[]  => {
    return [...todo, { text: "hello" }]
  }
  const [todo, dispatch] = useReducer(todoReducer, [{ text: "hellooo" }])
  return (
    <Box sx={{ margin: "25px" }}>
      {<ServerSent />}
      {username? <MessageAndSend /> : <Login />}
      {/* {todo.map((item, index) => {
        return
      })} */}
    </Box>
  );
}

export default App;
