import React, { useContext } from 'react';
import { AppContext } from '../App';
import TableBody from './TableBody';

const Main = () => {
    const { criteria, setCriteria, setSearchInput, handleFilter, setFormInput, bills } = useContext(AppContext)
    return (
        <div>
            <div className="w-full flex justify-between px-3 py-4 items-center flex-col-reverse sm:flex-row">
                <div className='w-full flex items-center flex-col sm:flex-row'>
                    <span>Search Billings</span>
                    <div class="form-control mx-auto w-4/5">
                        <div class="input-group ">
                            <select class="select select-bordered"
                                onChange={(e) => setCriteria(e.target.value)} defaultValue={''}>
                                <option value={''}>All</option>
                                <option className='fullname'>By Full Name</option>
                                <option className='phone'>By Phone</option>
                                <option className="email">By Email</option>
                            </select>
                            <input disabled={!criteria}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type="text" placeholder="Type here" class="input w-full border border-purple-400" />
                            <button disabled={!criteria} onClick={handleFilter} class="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>

                </div>
                <button class="btn btn-success" onClick={() => setFormInput({
                    fullname: '',
                    email: '',
                    phone: '',
                    amount: 0
                })}>Add New Bill</button>
            </div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th className='hidden'></th>
                            <th>Billing Id</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.sort((a, b) => b.amount - a.amount).map((bill) => <TableBody
                            key={bill.id}
                            bill={bill}
                        ></TableBody>)}
                    </tbody>
                </table>
            </div>
            <h1>hi</h1>
        </div>
    );
};

export default Main;