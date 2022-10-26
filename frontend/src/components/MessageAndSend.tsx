import { useState, useEffect } from 'react'
import { Grid, Button, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Message from '../interface/message';
import { io } from 'socket.io-client';
const socket = io("http://localhost:3000")
export default function MessageAndSend() {
    const fake_message = {
        id: "1",
        text: "hellos",
        username: "john",
    }
    const [messageText, setMessageText] = useState<string>()
    const [message, setMessage] = useState<Message>(fake_message)
    const [messages, setMessages] = useState<Message[]>([fake_message])
    const [isConnected, setIsConnected] = useState<Boolean>(false)
    const handleMessage = (message: string): void => {
        const user = localStorage.getItem("username")
        if (user) {
            setMessage({
                text: message,
                username: user,
            })
        }
    }
    const sendMessage = (): void => {
        console.log(message)
        socket.emit("message", message)

    }
    const logOut = (): void => {
        localStorage.removeItem("username")
        window.location.reload()
    }
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on("messageClient", (message) => {
            setMessages(message)
        })
        socket.on("disconnect", () => {
            setIsConnected(false)
        })
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        }
    }, [])
    return (
        <Grid>
            <Grid sx={{ display: "flex", justifyContent: "left" }}>
                <Button onClick={() => logOut()}>Log out</Button>
            </Grid>
            <Grid direction="column" sx={{ display: "flex", border: 1, padding: "120px", borderRadius: 5 }}>
                {messages.map((item, index) => {
                    return <Grid key={index} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography >{item.text}</Typography>
                    </Grid>
                })}
            </Grid>

            {/* <Messages onSend={sendMessage} user={message} /> */}
            <Grid sx={{ display: "flex", justifyContent: 'center' }}>
                <Input value={messageText} onChange={(e) => handleMessage(e.target.value)}></Input>
                <Button onClick={() => sendMessage()}>send</Button>
            </Grid>
        </Grid>
    )
}
