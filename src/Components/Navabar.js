import React from 'react';

const Navabar = () => {
    return (
        <div class="navbar bg-primary">
            <span class="btn btn-ghost normal-case text-xl">Power Hacker</span>
            <div className="ml-auto">
                <p>Paid Total : $0</p>
                <button class="ml-4 btn btn-secondary">Logout</button>
            </div>
        </div>
    );
};

export default Navabar;