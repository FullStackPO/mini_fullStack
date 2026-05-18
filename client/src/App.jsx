import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'

const App = () => {

  const [empData, setEmpData] = useState([])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    gender: ''
  })

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3000/api/user')
    setEmpData(res.data.users)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:3000/api/user',
        formData
      )

      console.log(res.data)

      fetchData()

      setFormData({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        gender: ''
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />

      <div className='flex gap-4'>

        <div className='form p-8'>

          <form
            onSubmit={submitHandler}
            className='flex flex-col gap-5 p-10 w-fit outline-1 rounded-xl'>

            <h1 className='font-bold text-3xl text-gray-600'>
            Register Employee
            </h1>

            <div className='flex flex-col'>
            <label
            className='font-semibold text-xl' 
            htmlFor='firstName'>First Name</label>
            <input
              id='firstName'
              type="text"
              name="firstName"
              placeholder='Enter First Name'
              className='outline-1 p-2 rounded w-72'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            </div>

            <div className='flex flex-col'>
            <label
            className='font-semibold text-xl' 
            htmlFor='lastName'>Last Name</label>
            <input
             id='lastName'
              type="text"
              name="lastName"
              placeholder='Enter Last Name'
              className='outline-1 p-2 rounded'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            </div>

            <div className='flex flex-col'>
            <label
            className='font-semibold text-xl' 
            htmlFor='dob'>Date of Birth</label>
            <input
              id='dob'
              type="date"
              name="dob"
              className='outline-1 p-2 rounded'
              value={formData.dob}
              onChange={handleChange}
              required
            />
            </div>


            <div className='flex flex-col'>
            <label
            className='font-semibold text-xl' 
            htmlFor='email'>Email</label>
            <input
              id='email'
              type="email"
              name="email"
              placeholder='Enter Email'
              className='outline-1 p-2 rounded'
              value={formData.email}
              onChange={handleChange}
              required
            />
            </div>

            <div className='flex flex-col'>
            <label
            className='font-semibold text-xl' 
            htmlFor='gender'>Gender</label>
            <select
              id='gender'
              name="gender"
              className='outline-1 p-2 rounded'
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            </div>

            <button 
            className='bg-green-500 text-white p-2 rounded-xl font-bold text-xl'>
              Submit
            </button>

          </form>

        </div>

        <div className='flex flex-wrap gap-4 p-4'>
          {empData.map((elem, idx) => {
            return (
              <div key={idx}
              className='bg-gray-700 text-white font-semibold text-md p-4 w-72 rounded-xl h-fit'>
                <p>First Name - {elem.firstName}</p>
                <p>Last Name - {elem.lastName}</p>
                <p>
                  D.O.B - {new Date(elem.dob).toLocaleDateString('en-GB')}
                </p>
                <p>Gender - {elem.gender}</p>
                <p>Email - {elem.email}</p>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default App