import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="container mx-auto p-12 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{message}</span>
            </div>
        </div>
    );
};

export default ErrorMessage;