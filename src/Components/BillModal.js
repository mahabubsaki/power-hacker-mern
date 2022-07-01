import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AppContext } from '../App';
const BillModal = ({ formInput, setFormInput, setLoading }) => {
    // destructuring the input object if user want to update a bill
    const { id, fullname, email, amount, phone } = formInput
    // extracting data from context
    const { currentCondition, setCurrentCondition, bills, setBills, setTotalInfo, totalBillInfo, setSearchOptions, setUser } = useContext(AppContext)
    const navigate = useNavigate()
    const handleForm = (e) => {
        e.preventDefault()
        // email validat
        const emailVal = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.email.value)
        if (!emailVal) {
            toast.error('Invalid email address')
            return
        }
        // phone number validate
        const number = e.target.phone.value.split('')
        const filter = number.filter(n => isNaN(n))
        if (number.length !== 11 || filter.length > 0 || !(number[0] === '0') || !(number[1] === '1')) {
            toast.error('Invalid phone number')
            return
        }
        // Amount validate
        if (!(e.target.amount.value > 0) || isNaN(e.target.amount.value)) {
            toast.error('Amount should greater than zero')
            return
        }
        // creating userinput object
        const userInput = {
            fullname: e.target.fullName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            amount: Number(e.target.amount.value),
        }
        if (currentCondition === 'adding') {
            // getting into this function as user now adding a bill;
            const addOnDb = async () => {
                setFormInput(null)
                setLoading(true)
                // genereting a random id
                userInput.id = Math.round(Math.random() * 10000000000).toString(16)
                try {
                    const { data } = await axios({
                        method: 'POST',
                        data: userInput,
                        url: 'http://localhost:5000/api/add-billing',
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                            email: localStorage.getItem('power-hacker-user'),
                        }
                    })
                    if (data.acknowledged) {
                        setBills([...bills, userInput])
                        setTotalInfo({
                            ...totalBillInfo,
                            paidCount: totalBillInfo.paidCount + userInput.amount
                        })
                        setSearchOptions({ criteria: '', searchInput: '' })
                        toast.success('Successfully added billing to database')
                    }
                    else {
                        toast.error('Something went wrong')
                    }
                }
                // in error we returning user to login
                catch (err) {
                    setUser(false)
                    localStorage.removeItem('power-hacker-user')
                    localStorage.removeItem('token')
                    toast.error('Something went wrong, Please Sign in again')
                    navigate('/login')
                }
                setCurrentCondition('')
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
            addOnDb()
        }
        else if (currentCondition === 'updating') {
            // getting to this function as user is updating a bill
            const updateOnDb = async () => {
                setFormInput(null)
                setLoading(true)
                userInput.id = id
                const restBills = bills.filter(bill => bill.id !== id)

                try {
                    const { data } = await axios({
                        method: 'PUT',
                        data: userInput,
                        url: `http://localhost:5000/api/update-billing/${id}`,
                        headers: {
                            email: localStorage.getItem('power-hacker-user'),
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    })
                    if (data.acknowledged) {
                        setBills([...restBills, userInput])
                        setTotalInfo({
                            ...totalBillInfo,
                            paidCount: (totalBillInfo.paidCount - amount) + userInput.amount
                        })
                        setSearchOptions({ criteria: '', searchInput: '' })
                        toast.success('Successfully updated billing')
                    }
                    else {
                        toast.error('Something went wrong')
                    }
                }
                // in error we returning user to login
                catch (err) {
                    setUser(false)
                    localStorage.removeItem('power-hacker-user')
                    localStorage.removeItem('token')
                    toast.error('Something went wrong, Please Sign in again')
                    navigate('/login')
                }
                setCurrentCondition('')
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
            updateOnDb()
        }
    }
    return (
        <>
            <input type="checkbox" id="my-modal-3" checked={true} class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setFormInput(null)}>✕</label>
                    {id ? <h3 class="text-lg font-bold mb-3 text-center">Update Bill</h3> : <h3 class="text-lg font-bold mb-3 text-center">Add a New Bill</h3>}
                    <form onSubmit={handleForm}>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:bg-[#ffffff]"
                            defaultValue={fullname && fullname}
                            name='fullName' type="text" placeholder="Full Name" required />
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:bg-[#ffffff]"
                            name='email'
                            defaultValue={email && email}
                            type="text" placeholder="Email" required />
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:bg-[#ffffff]"
                            type="tel"
                            name='phone'
                            defaultValue={phone && phone}
                            placeholder="Phone Number" required />
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:bg-[#ffffff]"
                            name='amount'
                            type="number"
                            defaultValue={amount > 0 && amount}
                            placeholder="Paid Amount" required />
                        {id ? <button className='btn btn-success w-full' type='submit' onClick={() => setCurrentCondition('updating')}>Update</button> : <button className='btn btn-success w-full' type='submit' onClick={() => setCurrentCondition('adding')}>Add</button>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default BillModal;