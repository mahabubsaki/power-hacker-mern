import React from 'react';
import { ClockLoader } from 'react-spinners';

const PageLoad = () => {
    // a simple page loader
    return (
        <div className="min-h-screen flex justify-center items-center border">
            <ClockLoader color='red' loading={true} size={150} speedMultiplier={3} />
        </div>
    );
};

export default PageLoad;