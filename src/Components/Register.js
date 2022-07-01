import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from '../App';
import { SyncLoader } from 'react-spinners';
const Register = () => {
    const navigate = useNavigate()
    const [signing, setSigning] = useState(false)
    const { setUser } = useContext(AppContext)
    const handleRegister = async (e) => {
        e.preventDefault()
        if (e.target.confirm.value !== e.target.password.value) {
            toast.error('Confirm password did not match')
            return
        }
        if (e.target.password.value.length < 7) {
            toast.error('Password is too short')
            return
        }
        setSigning(true)
        const userInput = {
            fullname: e.target.name.value,
            password: e.target.password.value,
            email: e.target.email.value,
        }
        try {
            const { data } = await axios({
                method: 'POST',
                data: userInput,
                url: 'http://localhost:5000/api/registration'
            })
            if (data.acknowledged) {
                toast.success('Successfully signed up')
                localStorage.setItem('power-hacker-user', e.target.email.value)
                localStorage.setItem('token', data.token)
                setUser(true)
                navigate('/')
            }
            else {
                setSigning(false)
                toast.error('Something went wrong')
            }
        }
        catch (err) {
            setSigning(false)
            toast.error('Account Already Registered with given mail')
        }
    }
    return (
        <div className="min-h-[500px] flex justify-center items-center">
            <div className="flex flex-col w-3/4 sm:w-2/4">
                <h1 className='text-center text-2xl'>Register</h1>
                <form onSubmit={handleRegister}>
                    <input type="text" className='block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 my-3 leading-tight focus:bg-[#ffffff]' placeholder='Name' name='name' required />
                    <input type="email" className='block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 my-3 leading-tight focus:bg-[#ffffff]' placeholder='Email' name='email' required />
                    <input type="password" className='block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 my-3 leading-tight focus:bg-[#ffffff]' placeholder='Password' name='password' required />
                    <input type="password" className='block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 my-3 leading-tight focus:bg-[#ffffff]' placeholder='Confirm Password' name='confirm' required />
                    {signing && <div className="my-4 flex justify-center"><SyncLoader loading={true} speedMultiplier={4} size={10} color="red" /></div>}
                    <button className="w-full btn btn-success">Register</button>
                </form>
                <p>Already Member ? <span className="text-warning cursor-pointer" onClick={() => navigate('/login')}>Login Now</span></p>
            </div>
        </div>
    );
};

export default Register;