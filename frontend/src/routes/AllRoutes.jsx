import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import Dashboard from '../pages/Dashboard';

export default function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/chat' element={<Chat/>} ></Route>
        <Route path='/dashboard' element={<Dashboard/>} ></Route>
    </Routes>
  )
}
