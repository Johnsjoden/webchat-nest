import EventEmitter from 'events';
import React, { useReducer, useState } from 'react'

export default function ServerSent() {
    const eventSource = new EventSource("http://localhost:3000/messages/sse")
    eventSource.onmessage = (data) => {
        console.log(data)
    };
    const emitter = new EventEmitter()
    emitter.on("connection", (data ) => {
        console.log(data)
    })
    emitter.on("eventName", (data) => {
        console.log(data)
    })
    return (
        <div>ServerSent</div>
    )
}
