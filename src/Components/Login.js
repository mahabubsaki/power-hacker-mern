import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import { AppContext } from '../App';

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(AppContext)
    const [logining, setLogining] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        setLogining(true)
        try {
            const { data } = await axios({
                method: 'GET',
                url: `https://lower-hockey-29859.herokuapp.com/api/login?email=${e.target.email.value}&password=${e.target.password.value}`,
            })
            if (data.acknowledged) {
                toast.success('Successfully logged in')
                localStorage.setItem('power-hacker-user', e.target.email.value)
                localStorage.setItem('token', data.token)
                setUser(true)
                navigate('/')
            }
            else {
                setLogining(false)
                toast.error('Something went wrong')
            }
        }
        catch (err) {
            setLogining(false)
            toast.error('Password is incorrect or Account not Found with Given Email')
        }
    }
    return (
        <div className="min-h-[500px] flex justify-center items-center">
            <div className="flex flex-col w-3/4 sm:w-2/4">
                <h1 className='text-center text-2xl'>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="email" className='block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 my-3 leading-tight focus:bg-[#ffffff]' placeholder='Email' name='email' required />
                    <input type="password" className='block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 my-3 leading-tight focus:bg-[#ffffff]' placeholder='Password' name='password' required />
                    {logining && <div className="my-4 flex justify-center"><SyncLoader loading={true} speedMultiplier={4} size={10} color="red" /></div>}
                    <button className="w-full btn btn-success">Login</button>
                </form>
                <p>New Here ? <span className="text-warning cursor-pointer" onClick={() => navigate('/register')}>Register Now</span></p>
            </div>
        </div>
    );
};

export default Login;