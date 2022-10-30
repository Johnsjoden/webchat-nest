import { useState, useEffect } from 'react'
import { Grid, Button, Input, Typography, Card, Alert, TextField, } from '@mui/material';
import Message from '../interface/message';
import { io } from 'socket.io-client';
import { fetchData } from '../Api';
const socket = io(`${process.env.REACT_APP_WEBCHAT_API}`)
export default function MessageAndSend() {
    const [messageText, setMessageText] = useState<string>()
    const [message, setMessage] = useState<Message>()
    const [messages, setMessages] = useState<Message[]>([])
    const [isConnected, setIsConnected] = useState<Boolean>(false)
    const [error, setError] = useState<string>("")
    const [text, setText] = useState<string>("")
    const handleMessage = (message: string): void => {
        const user = localStorage.getItem("username")
        if (user) {
            setText(message)
            setMessage({
                text: message,
                username: user
            })
        }
    }
    const sendMessage = (e: any): void => {
        const user = localStorage.getItem("username")
        e.preventDefault()
        socket.emit("message", message)
        window.location.href = '#buttonScroll';
    }
    const logOut = (): void => {
        localStorage.removeItem("username")
        window.location.reload()
    }
    const fetchMessages = async (): Promise<void> => {
        const response = await fetchData("messages")
        setMessages(response.data)
        window.location.href = '#buttonScroll';
    }
    useEffect(() => {
        fetchMessages()
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on("messageError", (error: string) => {
            setError(error)
        })
        socket.on("messageClient", (messages: Message[]) => {
            setError("")
            setMessages(messages)
            window.location.href = '#buttonScroll';
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
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "left" }}>
                    <Button onClick={() => logOut()}>Log out</Button>
                </Grid>
                <Grid item xs={12} md={5} sx={{ overflow: "scroll", width: "20%", height: "500px" }}>
                    {messages.map((item, index) => {
                        return <Grid key={index} direction="column" sx={{ display: "flex", justifyContent: "center", border: 1, padding: "15px", borderRadius: 5 }}>
                            <Typography variant="h5">{item.username}</Typography>
                            <Typography sx={{ wordWrap: "break-word" }} >{item.text}</Typography>
                            <Typography>{item.timeStamp}</Typography>
                        </Grid>
                    })}
                    <Typography id="buttonScroll"></Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    {error ? <Alert severity="error">{error}</Alert> : ""}
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: 'left' }}>
                    <TextField id="standard-multiline-static" label="new message" multiline rows={4} variant="standard" value={text} onChange={(e) => handleMessage(e.target.value)}
                    />
                    <Button onClick={(e) => sendMessage(e)}>send</Button>
                </Grid>
                {error ? "" : error}
            </Grid>
        </Grid>
    )
}