import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AppContext } from '../App';

const TableBody = ({ bill, no }) => {
    const { id, fullname, email, phone, amount } = bill
    const { setFormInput, handleDelete } = useContext(AppContext)
    // asking for confirmation
    const confirmation = () => {
        Swal.fire({
            title: 'Delete',
            text: "Are You sure you want to delete this billing?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16DD29',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id)
            }
        })
    }
    return (
        <tr>
            <td>{no}</td>
            <td>{id}</td>
            <td>{fullname}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>${amount}</td>
            <td className='flex'>
                <button className='btn btn-success mx-1' onClick={() => setFormInput({
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    amount: amount,
                    id: id
                })}>Update</button>
                <button className='btn btn-warning mx-1' onClick={confirmation}>Delete</button>
            </td>
        </tr>
    );
};

export default TableBody;