import React from 'react'
import StudentDashboard from '../components/StudentDashboard';
import TutoreDashboard from '../components/TutoreDashboard';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const navigate=useNavigate()

  let user=JSON.parse(localStorage.getItem('user-details'));

  let role;


  if(user==null){
    navigate('/login')
  }else{
    role=user.role
  }

  return (
    <div>
      {
        role=='student' ? 
        <StudentDashboard/> : <TutoreDashboard/>
      }
    </div>
  )
}
