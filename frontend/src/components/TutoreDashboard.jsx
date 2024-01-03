import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
const socket = io.connect("http://localhost:4500");

export default function TutoreDashboard() {

  const [onlineUsers, setOnlineUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem('user-details'))

  useEffect(() => {
    const userDetails = user;
    socket.emit('userConnected', userDetails);

    socket.on('updateOnlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("receive_alert", (data) => {
      alert(`Received alert: ${data.subject}, ${data.language}, ${data.msg}`);
    });

    return () => {
      socket.off("receive_alert");
    };
  }, []);

  return (
    <div>
      <h1>TutoreDashboard</h1>

      <div>
        <h2>Online user</h2>
        <ul>
          {onlineUsers.map((user) => (
            <p key={user._id} >{user.name}</p>
          ))}
        </ul>
      </div>

    </div>
  )
}
