import React from 'react'
import { useNavigate } from 'react-router-dom'


function NotFoundPage() {
    const navigate = useNavigate();

    function redirectHome(){
        navigate('/home')
    }


  return (
    <div className='flex flex-col items-center'>
      <img className='mt-20' src='https://res.cloudinary.com/dak7gtph6/image/upload/v1755007690/erroring_1_ho4klt.png' />
      <p className='text-gray-500 mt-5'>We are sorry, the page you requested could not be found. <br/> Please go back to home page.</p>
      <button onClick={redirectHome}  className='bg-blue-400 text-white h-10 w-40 mt-5 rounded-xl'>Home Page</button>
    </div>
    
  )
}

export default NotFoundPage
