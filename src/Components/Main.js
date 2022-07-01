import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import AllButtons from './AllButtons';
import FullTable from './FullTable';
import Loader from './Loader';
import PaginationBtn from './PaginationBtn';
import TableBody from './TableBody';

const Main = () => {
    const [option, setOption] = useState('')
    const { searchOptions, setSearchOptions, setFormInput, bills, currentPage, setCurrentPage, pageCountArr, setPageCountArr, loading, currentCondition, pageData } = useContext(AppContext)
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