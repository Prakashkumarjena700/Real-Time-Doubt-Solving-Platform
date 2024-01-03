import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
const socket = io.connect("http://localhost:4500");

export default function StudentDashboard() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showDoubt, setshowDoubt] = useState(false)
  const [subject, setSubject] = useState('')
  const [language, setLanguage] = useState("")
  const [msg, setMsg] = useState('')

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

  const sendMessage = () => {
    const messageData = {
      subject,
      language,
      msg,
    };

    socket.emit("send_message", messageData);

  }

  return (
    <div>
      <div>
        <h1>StudentDashboard</h1>
        <img width='50px' src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="" />
        <p>{user.name}</p>
      </div>

      <button onClick={() => setshowDoubt(true)}  >ASK DOUBT</button>

      <div>
        <h2>Online user</h2>
        <div className='onLineUsersList' >
          {onlineUsers.map((user) => (
            <div key={user._id} >
              <h3>{user.name}</h3>
              <p>{user.email}</p>

            
            </div>
          ))}
        </div>
      </div>

      {
        showDoubt &&
        <div>
          <select onChange={(e) => setSubject(e.target.value)} >
            <option value="">Select subject</option>
            <option value="mathematics">mathematics</option>
            <option value="science">science</option>
            <option value="english">english</option>
            <option value="hindi">hindi</option>
            <option value="geography">geography</option>
            <option value="history">history</option>
          </select>

          <select onChange={(e) => setLanguage(e.target.value)} >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="odia">Odia</option>
          </select>

          <textarea onChange={(e) => setMsg(e.target.value)} name="" id="" cols="30" rows="10" placeholder='Ask doubt...'></textarea>
          <button onClick={sendMessage} >Send</button>
        </div>
      }


    </div>
  )
}
