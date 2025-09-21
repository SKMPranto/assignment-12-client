import React from 'react';
import { RiseLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="min-h-[calc(100vh-60px)] flex justify-center items-center">
            <RiseLoader size="30px" />
        </div>
    );
};

export default Loader;