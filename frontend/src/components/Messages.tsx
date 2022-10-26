import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Message from '../interface/message';
export default function Messages(props: {onSend:() => void; user: Message | undefined}) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if(props.user){
      console.log("2")
    }
  }, [props.user])
  return (
    <Grid direction="column" sx={{ display: "flex", border: 1, padding: "120px", borderRadius: 5}}>
              {messages.map((item, index) => {
                return <Grid key={index} sx={{display: "flex", justifyContent: "center"}}>
                <Typography >{item.text}</Typography>
              </Grid>
            })}  
            </Grid>
  )
}
