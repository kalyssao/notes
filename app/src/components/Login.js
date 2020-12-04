import React, { useState } from 'react'
import { Note, Card, Input, Button, Spacer } from '@geist-ui/react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    let history = useHistory()
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState(false)
    
    function handleUsername(event){
        setUsername(event.target.value)
    }

    function handlePassword(event){
        setPassword(event.target.value)
    }
    function logIn(){
        axios.post('user/login', {
            username: username,
            password: password
        }).then((res) => {
            if(res.status === 200){
                history.push("/home")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Card shadow>
            {
                error
                ? <Note label="error">Incorrect username or password</Note>
                : <></>

            }
            
            <Input 
            value={username} 
            onChange={handleUsername} 
            placeholder="Username"/>

            <Spacer/>

            <Input.Password 
            value={password}
            onChange={handlePassword}
            placeholder="Password"/>
            <Spacer/>

            <Button onClick={logIn}>Log In</Button>
            
        </Card>
    )
}
