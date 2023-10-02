import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../Features/api/authApiSlice';
import {setCredentials} from '../Features/appSlice/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

const login = () => {

  const [email, setEmail] = useState('cabdirisaqjmc88@gmail.com');
  const [password, setPassword] = useState('Mc12345678_9');
  
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth);
  

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[])

  console.log(userInfo)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, data } = await login({ email, password });

    console.log("bakc", data);

    
    if (!error) {
      console.log("succee");
      dispatch(setCredentials({ ...data }));
      navigate("/")
      
    } else {
      console.log("cilad");
    }

   


  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-teal-400 text-2xl'>{userInfo?.username}</h1>
      Login component
      <input value={email} onChange={(e) => setEmail(e.target.value)} className='border border-red-200' type="text" placeholder="Enter your email" />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password" className='border border-red-200' placeholder="Enter your password" />
      <button>Login</button>
    </form>
  );
}

export default login