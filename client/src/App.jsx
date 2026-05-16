import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'

const App = () => {

  const [empData, setEmpData] = useState([])

  const fetchData = async() => {
    const res = await axios.get('http://localhost:3000/api/user')
    setEmpData(res.data.users)
  }

  useEffect(() =>{
    fetchData()
  }, [])

  return (
    <div>
      <Navbar />
        <div className='flex flex-wrap'>
          {empData.map((elem, idx) =>{
            return <div key={idx}
                    className='bg-gray-700 text-white font-semibold text-md p-2 w-72 rounded-xl'>
                  <p>First Name - {elem.firstName}</p>
                  <p>Last Name - {elem.lastName}</p>
                  <p>D.O.B - {new Date(elem.dob).toLocaleDateString('en-GB')}</p>
                  <p>Gender - {elem.gender}</p>
                  <p>Email - {elem.email}</p>
                  </div>
          })}
        </div>
    </div>
  )
}

export default App
