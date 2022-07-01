import React, { useContext } from 'react';
import { AppContext } from '../App';
import PaginationBtn from './PaginationBtn';

const AllButtons = () => {
    const { pageCountArr, loading, currentPage, setCurrentPage } = useContext(AppContext)
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className="flex w-3/5 mx-auto gap-2 flex-wrap">
            <button className="btn btn-success" disabled={currentPage === 1} onClick={() => setCurrentPage((pre) => pre - 1)}>&#8592;</button>
            {pageCountArr.map((page) => <PaginationBtn key={page} currentPage={currentPage} setCurrentPage={setCurrentPage}>{page}</PaginationBtn>)}
            <button className="btn btn-success" disabled={pageCountArr.length === currentPage} onClick={() => setCurrentPage((pre) => pre + 1)}>&#8594;</button>
        </div>
    );
};

export default AllButtons;