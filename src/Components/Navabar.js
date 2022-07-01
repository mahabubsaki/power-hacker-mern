import React, { useContext } from 'react';
import { AppContext } from '../App';

const Navabar = () => {
    const { totalBillInfo } = useContext(AppContext)
    return (
        <>
            <div class="navbar bg-primary">
                <span class="btn btn-ghost normal-case text-xl">Power Hacker</span>
                <div className="ml-auto">
                    <p>Paid Total : ${totalBillInfo?.paidCount}</p>
                    <button class="ml-4 btn btn-secondary">Logout</button>
                </div>
            </div>
        </>
    );
};

export default Navabar;