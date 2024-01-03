import React, { useState } from 'react'

export default function Register() {
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [subjects, setSubjects] = useState([]);
  const [classgrad, setClassgrad] = useState('')
  const [standard, setStandard] = useState([])
  const [dob, setDob] = useState('')
  const [language, setLanguage] = useState('')

  const subjectOptions = ["mathematics", "science", "english", "hindi", "geography", "history"];
  const tutoreStandardOptions = [6, 7, 8, 9, 10, 12];
  const languageOptions=["english","hindi","odia"]

  const ChooseSubjects = (label) => {
    if (subjects.includes(label)) {
      setSubjects(subjects.filter((val) => val !== label));
    } else {
      setSubjects([...subjects, label]);
    }
  };

  const ChooseStandard = (label) => {
    if (standard.includes(label)) {
      setStandard(standard.filter((val) => val !== label));
    } else {
      setStandard([...standard, label]);
    }
  }

  const ChooseLanguage=(label)=>{
    if (language.includes(label)) {
      setLanguage(language.filter((val) => val !== label));
    } else {
      setLanguage([...language, label]);
    }
  }

  const Register = () => {

    const selectedSubjected = subjects.join(', ');
    const selectedLanguage=language.join(', ');
    let selectedStandard;

    if(role==='student'){
      selectedStandard=standard
    }else{
       selectedStandard = standard.join(', ');
    }
   

    const registerData={
      role,
      name,
      email,
      password,
      phone,
      subjects:selectedSubjected || [],
      classgrad,
      standard:selectedStandard,
      dob,
      language:selectedLanguage
    };

    console.log(registerData)

  }

  return (
    <div>
      <div>
        <div>
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Enter your name...' />
        </div>
        <div>
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email...' />
        </div>
        <div>
          <label>Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password...' />
        </div>
        <div>
          <label>Phone</label>
          <input type="number" onChange={(e) => setPhone(e.target.value)} placeholder='Enter your phone...' />
        </div>

        {
          role==='tutore' && <div>
          <label >Choose subjects : </label>
          {subjectOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={subjects.includes(option)}
                onChange={() => ChooseSubjects(option)}
              />
              {option}
            </label>
          ))}
        </div>

        }
        <div>
          <select onChange={(e) => setClassgrad(e.target.value)} >
            <option value="">Select Class grad</option>
            <option value="a+">A+</option>
            <option value="a">A</option>
            <option value="b+">B+</option>
            <option value="b">B</option>
            <option value="c+">C+</option>
            <option value="c">C</option>
            <option value="d+">D+</option>
            <option value="d">D</option>
            <option value="e">E</option>
          </select>
        </div>

        {
          role === 'student' ?

            <div>
              <label>Select Standard</label>
              <select onChange={(e)=>setStandard(e.target.value)} >
                <option value="">Select Standard</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="12">12</option>
              </select>
            </div> 
            :
            <div>
              <label>Choose standards : </label>
              {
                tutoreStandardOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={standard.includes(option)}
                      onChange={() => ChooseStandard(option)}
                    />
                    {option}
                  </label>
                ))
              }
            </div>
        }

        <div>
          <label >Date of Birth</label>
          <input type="text" onChange={(e)=>setDob(e.target.value)} placeholder='DD/MM/YYYY' />
        </div>

        <div>
        <label>Choose Language : </label>
              {
                languageOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={language.includes(option)}
                      onChange={() => ChooseLanguage(option)}
                    />
                    {option}
                  </label>
                ))
              }
        </div>


        <button onClick={Register} > Submit</button>

      </div>



      <div>
        <button onClick={() => setRole('student')} >Register as Student</button>
        <button onClick={() => setRole('tutore')} >Register as Tutor</button>
      </div>
    </div>
  )
}
