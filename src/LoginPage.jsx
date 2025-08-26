import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function LoginPage() {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('authToken');
    if(token){
      navigate('/home', {replace: true}) // redirects to home page and replace:true preventscoming back to login
    }
  }, []) //add dependency array to run onlt once on mount

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')


    function userValue(event){
      setUserName(event.target.value);
    }

    function passwordValue(event){
        setPassword(event.target.value);
        console.log(event.target.value)
    }

    async function onSubmitForm(event){
        event.preventDefault();
        const userDetails = {
            username:userName, password
        }
        const url = '/apis/login';
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(data.jwt_token!=undefined){
            console.log("okiee")
            // here in local storage the jwt_token is getting stored in a key value pair where key is authToken and value is jwt_token.
            localStorage.setItem('authToken', data.jwt_token); 
            navigate('/home', { replace: true }); // Redirect and replace login history
        }
        else{
          setErrMsg(data.error_msg)
        }
    }

  return (
    <div>
      <div className='flex flex-row justify-center justify-evenly mt-50'>
        <img className='h-80 w-120 mt-10' src='https://res.cloudinary.com/dak7gtph6/image/upload/v1752294671/Illustration_vud2ja.jpg' />
        <form onSubmit={onSubmitForm}  className='h-100 w-120 flex flex-col items-center shadow-xl'>
           <img className='' src='https://res.cloudinary.com/dak7gtph6/image/upload/v1752295100/logo_n05zia.jpg' />
           <h1 className='font-bold text-xl'>Insta Share</h1>
           <div className='flex flex-col gap-10 mt-10'>
            <div className='mr-10'>
              <p className='text-sm font-bold'>USERNAME</p>
              <input value={userName} onChange={userValue} className='bg-gray-200 border-none focus:outline-none w-80 h-10 rounded-sm' type='text' placeholder='   username'/>
            </div>
            <div className='mr-10'>
              <p className='font-bold text-sm'>PASSWORD</p>
              <input value={password} onChange={passwordValue} className='bg-gray-200 border-none focus:outline-none w-80 h-10 rounded-sm' type='password' placeholder='   password' />
            </div>
            <div>
                <button type='submit' className='text-white font-bold bg-blue-500 h-10 w-80 rounded-sm'>Login</button>
                {<p className='text-red-500 mt-3' >{errMsg}</p>}
            </div>
           </div>      
        </form>
      </div>
    </div>
  )
}

export default LoginPage