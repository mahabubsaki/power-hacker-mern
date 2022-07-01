import React from 'react';

const PaginationBtn = ({ children, currentPage, setCurrentPage }) => {
    // mapping the pagecount array end rendering a button
    return (
        <button className={`btn ${currentPage === children ? 'btn-warning' : 'bg-white text-black hover:text-white'}`} onClick={() => setCurrentPage(children)}>{children}</button>
    );
};

export default PaginationBtn;