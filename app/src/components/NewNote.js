import React, { useState } from 'react'
import axios from 'axios'
import { Note, Input, Spacer, Textarea, Button } from '@geist-ui/react'

export default function NewNote() {
    const API_ENDPOINT = process.env.API_ENDPOINT || 'https://kalyssa-notes-app.herokuapp.com'
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [ success, setSuccess ] = useState(false)

    function handleTitle(event){
        setTitle(event.target.value)
    }

    function handleContent(event){
        setContent(event.target.value)
    }

    function addNote(){
        axios.post(`${API_ENDPOINT}/note`, {
            "title": title,
            "content": content
        })
        .then((res) => {
            console.log(res.body)
            setSuccess(true)
        })
        .catch((err) => {
            console.log(err)
        })
        setTitle('')
        setContent('')
    }

    return (
        <div style={{marginTop: "20px"}} className="newnote--div">
            <h4>New note.</h4>
            { success
            ? setTimeout(() => <Note className="success" label={false}>Successfully added note!</Note>, 3000)
            : <></>
            }
            <Input width="50%" value={title} onChange={handleTitle} placeholder="Title"></Input>

            <Spacer/>

            <Textarea 
            width="25%"
            value={content}
            onChange={handleContent} 
            placeholder="Enter your note content"/>

            <Spacer/>
            <Button size="medium" onClick={addNote}>Add Note!</Button>

        </div>
    )
}
