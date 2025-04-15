import React from 'react';
import { FiSearch } from 'react-icons/fi';

const PhoneInput = ({ phoneNumber, setPhoneNumber, handleSearch, loading }) => {
  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex-grow">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number with country code (e.g. +1234567890)"
            className="input-field"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Include the country code (e.g., +1 for US, +44 for UK)
          </p>
        </div>
        <button
          type="submit"
          className="btn-primary flex items-center justify-center"
          disabled={loading || !phoneNumber.trim()}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching
            </span>
          ) : (
            <span className="flex items-center">
              <FiSearch className="mr-1" />
              Search
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default PhoneInput;