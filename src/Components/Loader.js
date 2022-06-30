import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = ({ children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-20">
            <div className="flex flex-col items-center">
                <HashLoader size={150} color="green" />
                <span className="text-3xl animate-bounce mt-2 font-bold inline-block p-2 bg-[white] rounded-xl">{children}</span>
            </div>
        </div>
    );
};

export default Loader;