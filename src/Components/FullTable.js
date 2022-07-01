import React, { useContext } from 'react';
import { AppContext } from '../App';
import Loader from './Loader';
import TableBody from './TableBody';

const FullTable = () => {
    const { pageData, loading, currentCondition } = useContext(AppContext)
    if (loading) {
        return <Loader>{currentCondition}</Loader>
    }
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th className='hidden'></th>
                        <th>No</th>
                        <th>Billing Id</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Paid Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pageData.sort((a, b) => b.amount - a.amount).map((bill, index) => <TableBody
                        no={index + 1}
                        key={bill.id}
                        bill={bill}
                    ></TableBody>)}
                </tbody>
            </table>
            {pageData.length === 0 && <p className='text-2xl text-center my-8'>No data found</p>}
        </div>
    );
};

export default FullTable;