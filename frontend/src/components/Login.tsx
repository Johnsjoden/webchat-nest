import { Grid, Input, Button, Typography } from '@mui/material'
import { useState} from 'react'
import react from "react"

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const createUser = (): void => {
        localStorage.setItem("username", username)
        window.location.reload();
    }
  return (
    <Grid>
        <Grid sx={{display: "flex", justifyContent: "center"}}>
            <Typography variant="h5">Type in a username to login</Typography>
        </Grid>
        <Grid sx={{display: "flex", justifyContent: "center"}}>
           <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Button onClick={() => createUser()}>Submit</Button> 
        </Grid>
        
    </Grid>
  )
}
