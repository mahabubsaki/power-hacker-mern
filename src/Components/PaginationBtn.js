import React from 'react';

const PaginationBtn = ({ children, currentPage, setCurrentPage }) => {
    return (
        <button className={`btn ${currentPage === children ? 'btn-warning' : 'bg-white text-black hover:text-white'}`} onClick={() => setCurrentPage(children)}>{children}</button>
    );
};

export default PaginationBtn;