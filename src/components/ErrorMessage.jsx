import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorMessage = ({ message, setupRequired }) => {
  const bgColor = setupRequired ? 'bg-yellow-50' : 'bg-red-50';
  const borderColor = setupRequired ? 'border-yellow-300' : 'border-red-300';
  const textColor = setupRequired ? 'text-yellow-800' : 'text-red-800';
  const iconColor = setupRequired ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className={`mt-4 p-3 ${bgColor} border ${borderColor} rounded-md flex items-start`}>
      <BiErrorCircle className={`${iconColor} text-xl flex-shrink-0 mr-2 mt-0.5`} />
      <div className={textColor}>
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;