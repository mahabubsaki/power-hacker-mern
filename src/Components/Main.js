import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import AllButtons from './AllButtons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FullTable from './FullTable';
import toast from 'react-hot-toast';

const Main = () => {
    const navigate = useNavigate()
    const [option, setOption] = useState('')
    const { setSearchOptions, setFormInput, setCurrentPage, setBills, setUser, setLoading, setTotalInfo, setPageCountArr, setPageData, bills, searchOptions, currentPage } = useContext(AppContext)
    const handleSearch = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setSearchOptions({ criteria: option, searchInput: e.target.search.value })
    }
    const handleOption = (e) => {
        if (e.target.value) {
            setOption(e.target.value)
        }
        else {
            setOption('')
            setSearchOptions({ criteria: '', searchInput: '' })
        }
    }
    useEffect(() => {
        const getBillings = async () => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: 'http://localhost:5000/api/billing-list',
                    headers: {
                        email: localStorage.getItem('power-hacker-user'),
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                setBills(data)
            }
            catch (err) {
                setUser(false)
                localStorage.removeItem('power-hacker-user')
                localStorage.removeItem('token')
                toast.error('Something went wrong, Please Sign in again', { id: 'sssss' })
                navigate('/login')
            }
        }
        getBillings()
    }, [])
    useEffect(() => {
        const getBillInfo = async () => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: 'http://localhost:5000/api/all-bills-info',
                    headers: {
                        email: localStorage.getItem('power-hacker-user'),
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                setTotalInfo(data)
                const initalArr = []
                for (let i = 1; i <= Math.ceil(data?.billCount / 10); i++) {
                    initalArr.push(i)
                }
                setPageCountArr(initalArr)
            }
            catch (err) {

                setUser(false)
                localStorage.removeItem('power-hacker-user')
                localStorage.removeItem('token')
                toast.error('Something went wrong, Please Sign in again', { id: 'sss' })
                navigate('/login')
            }
        }
        getBillInfo()
    }, [])
    useEffect(() => {
        const getMaxTen = async () => {
            try {
                setLoading(true)
                const { data } = await axios({
                    method: 'GET',
                    url: `http://localhost:5000/api/bills-max-ten?currentpage=${currentPage}&${searchOptions.criteria}=${searchOptions.searchInput}`,
                    headers: {
                        email: localStorage.getItem('power-hacker-user'),
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                const initalArr = []
                if (searchOptions.searchInput) {
                    const actual = bills.filter(b => b[searchOptions.criteria] === searchOptions.searchInput)
                    for (let i = 1; i <= Math.ceil(actual.length / 10); i++) {
                        initalArr.push(i)
                    }
                }
                else {
                    const { data } = await axios({
                        method: 'GET',
                        url: 'http://localhost:5000/api/all-bills-info', headers: {
                            email: localStorage.getItem('power-hacker-user'),
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    })
                    for (let i = 1; i <= Math.ceil(data?.billCount / 10); i++) {
                        initalArr.push(i)
                    }
                }
                setPageCountArr(initalArr)
                setPageData(data)
                setLoading(false)
            }
            catch (err) {
                setCurrentPage(1)
                setSearchOptions({ criteria: '', searchInput: '' })
                setUser(false)
                localStorage.removeItem('power-hacker-user')
                localStorage.removeItem('token')
                toast.error('Something went wrong, Please Sign in again', { id: 'ss' })
                navigate('/login')
            }
        }
        getMaxTen()
    }, [currentPage, searchOptions])
    return (
        <div>
            <div className="w-full flex justify-between px-3 py-4 items-center flex-col-reverse sm:flex-row">
                <div className='w-full flex items-center flex-col sm:flex-row'>
                    <span>Search Billings</span>
                    <form onSubmit={handleSearch} className="mx-auto w-4/5">
                        <div class="form-control">
                            <div class="input-group ">
                                <select name='criteria' class="select select-bordered" onChange={handleOption}
                                    defaultValue={''}>
                                    <option value={''}>All</option>
                                    <option value='fullname'>By Full Name</option>
                                    <option value='phone'>By Phone</option>
                                    <option value="email">By Email</option>
                                </select>
                                <input disabled={!option}
                                    name='search'
                                    type="text" placeholder="Type here" class="input w-full border border-purple-400" />
                                <button disabled={!option} type="submit" class="btn btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <button class="btn btn-success" onClick={() => setFormInput({
                    fullname: '',
                    email: '',
                    phone: '',
                    amount: 0
                })}>Add New Bill</button>
            </div>
            <FullTable />
            <AllButtons />
        </div>
    );
};

export default Main;