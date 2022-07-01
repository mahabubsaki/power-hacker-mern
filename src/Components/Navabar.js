import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AppContext } from '../App';
import { useNavigate } from "react-router-dom";
const Navabar = () => {
    const { totalBillInfo, user, setUser } = useContext(AppContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        Swal.fire({
            title: 'Logout',
            text: "Are You sure you want to logout?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16DD29',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('power-hacker-user')
                setUser(false)
                navigate('/login')
            }
        })
    }
    return (
        <>
            <div class="navbar bg-primary">
                <span class="btn btn-ghost normal-case text-xl">Power Hacker</span>
                <div className="ml-auto">
                    {user && <p>Paid Total : ${totalBillInfo?.paidCount}</p>}
                    {user && <button class="ml-4 btn btn-secondary" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </>
    );
};

export default Navabar;