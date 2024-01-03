import React from 'react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket= io.connect("http://localhost:4500");

export default function Chat() {
    const [data, setData] = useState('')
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([]);
  
  
    const sendMessage=()=>{
      socket.emit("send_message",{message, room})
    }
  
    useEffect(()=>{
      socket.on("receive_message",(data)=>{
       console.log(data)
      })
    },[socket])
  
    const JoinRoom=()=>{
      socket.emit("join_room", room)
    }
  
    useEffect(() => {
      const userDetails = { username: Math.random(2,30) }; 
      socket.emit('userConnected', userDetails);
  
      socket.on('updateOnlineUsers', (users) => {
        setOnlineUsers(users);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  return (
    <div><input type="text" onChange={(e)=>setMessage(e.target.value)} />
    <button onClick={sendMessage} >Send Message</button>
   
    <input type="text" placeholder='Room Id' onChange={(e)=>setRoom(e.target.value)} />
    <button onClick={JoinRoom} >Join room</button>

    <div>
  <h2>Online Users</h2>
  <ul>
    {onlineUsers.map((user) => (
      <p key={user.username}>{user.username}</p>
    ))}
  </ul>
</div></div>
  )
}
