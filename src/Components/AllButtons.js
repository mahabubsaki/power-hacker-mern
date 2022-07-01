import React, { useContext } from 'react';
import { AppContext } from '../App';
import PaginationBtn from './PaginationBtn';

const AllButtons = () => {
    const { pageCountArr, loading, currentPage, setCurrentPage } = useContext(AppContext)
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className="flex w-3/5 mx-auto border gap-2">
            {pageCountArr.map((page) => <PaginationBtn key={page} currentPage={currentPage} setCurrentPage={setCurrentPage}>{page}</PaginationBtn>)}
        </div>
    );
};

export default AllButtons;