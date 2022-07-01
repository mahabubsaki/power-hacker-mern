import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = ({ children }) => {
    return (
        <div className="flex justify-center items-center h-[400px]">
            <div className="flex flex-col items-center">
                <HashLoader size={150} color="green" />
                <span className="text-3xl animate-bounce mt-2 font-bold inline-block p-2 rounded-xl">{children === 'adding' && 'Genereting Id'}
                    {children === 'updating' && 'Updating Bill'}
                    {children === 'deleting' && 'Deleting Bill'}</span>
            </div>
        </div>
    );
};

export default Loader;