import React, { useContext } from 'react';
import { AppContext } from '../App';

const TableBody = ({ bill }) => {
    const { id, fullname, email, phone, amount } = bill
    const { setFormInput, handleDelete } = useContext(AppContext)
    return (
        <tr>
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
                <button className='btn btn-warning mx-1'>Delete</button>
            </td>
        </tr>
    );
};

export default TableBody;