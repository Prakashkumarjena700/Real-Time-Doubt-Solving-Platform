import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import StudentDashboard from '../pages/StudentDashboard';
import TutoreDashboard from '../pages/TutoreDashboard';
import Chat from '../pages/Chat';

export default function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/studentDashboard' element={<StudentDashboard/>} ></Route>
        <Route path='/tutoreDashboard' element={<TutoreDashboard/>} ></Route>
        <Route path='/chat' element={<Chat/>} ></Route>
        
    </Routes>
  )
}
