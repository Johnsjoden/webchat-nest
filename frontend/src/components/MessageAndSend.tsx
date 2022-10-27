import { useState, useEffect } from 'react'
import { Grid, Button, Input, Typography, Card, } from '@mui/material';
import { Box } from '@mui/system';
import Message from '../interface/message';
import { io } from 'socket.io-client';
import { fetchData } from '../Api';
const socket = io(`${process.env.REACT_APP_WEBCHAT_API}`)
export default function MessageAndSend() {
    const [messageText, setMessageText] = useState<string>()
    const [message, setMessage] = useState<Message>()
    const [messages, setMessages] = useState<Message[]>([])
    const [isConnected, setIsConnected] = useState<Boolean>(false)
    const handleMessage = (message: string): void => {
        const user = localStorage.getItem("username")
        if (user) {
            setMessage({
                text: message,
                username: user
            })
        }
    }
    const sendMessage = (): void => {
        socket.emit("message", message)

    }
    const logOut = (): void => {
        localStorage.removeItem("username")
        window.location.reload()
    }
    const fetchMessages = async () => {
        const result = await fetchData("messages")
        setMessages(result.data)
    }
    useEffect(() => {
        fetchMessages()
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on("messageClient", (messages: Message[]) => {
            console.log(messages)
            setMessages(messages)
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
            <Grid >
                {messages.map((item, index) => {
                    return <Grid key={index} direction="column" sx={{ width: "20%", justifyContent: "center", border: 1, padding: "15px", borderRadius: 5 }}>
                        <Typography variant="h5">{item.username}</Typography>
                        <Typography >{item.text}</Typography>
                        <Typography>{item.timeStamp}</Typography>
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
