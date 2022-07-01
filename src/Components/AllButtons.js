import React, { useContext } from 'react';
import { AppContext } from '../App';
import PaginationBtn from './PaginationBtn';

const AllButtons = () => {
    // extracting states from context
    const { pageCountArr, loading, currentPage, setCurrentPage } = useContext(AppContext)
    // simple loading text while updating something
    if (loading) {
        return <p>Loading...</p>
    }
    // this component contains all the pagination button
    return (
        <div className="flex w-3/5 mx-auto gap-2 flex-wrap my-8">
            {/* if current page is 1 so we can surely tell that user cannot go to previous page */}
            <button className="btn btn-success" disabled={currentPage === 1} onClick={() => setCurrentPage((pre) => pre - 1)}>&#8592;</button>
            {pageCountArr.map((page) => <PaginationBtn key={page} currentPage={currentPage} setCurrentPage={setCurrentPage}>{page}</PaginationBtn>)}
            {/* if current page is the last page so we can surely tell that user cannot go to next page */}
            <button className="btn btn-success" disabled={pageCountArr.length === currentPage} onClick={() => setCurrentPage((pre) => pre + 1)}>&#8594;</button>
        </div>
    );
};

export default AllButtons;