import React, { useState } from 'react';
import { api } from '../api';
import { eventBus } from '@/modules/core/events';
import { events } from '../events';
import PhoneInput from './PhoneInput';
import ResultCard from './ResultCard';
import ErrorMessage from './ErrorMessage';
import * as Sentry from '@sentry/browser';

const PhoneTracker = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setIsValid(api.validatePhoneNumber(value));
    // Clear previous results and errors when input changes
    if (error) setError(null);
    if (result) setResult(null);
  };

  const handleSearch = async () => {
    if (!api.validatePhoneNumber(phoneNumber)) {
      setIsValid(false);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Searching for phone number:', phoneNumber);
      const data = await api.searchPhoneNumber(phoneNumber);
      console.log('Search result:', data);
      
      if (data.error) {
        setError({
          message: data.message || data.error,
          details: data.details,
          setupRequired: data.setupRequired,
          setupType: data.setupType
        });
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error('Error searching phone number:', error);
      Sentry.captureException(error, {
        extra: { phoneNumber }
      });
      
      let errorMessage = 'An error occurred while fetching phone data.';
      let errorDetails = error.message;
      let setupRequired = false;
      let setupType = null;
      
      if (error.data) {
        errorMessage = error.data.message || error.data.error || errorMessage;
        errorDetails = error.data.details;
        setupRequired = error.data.setupRequired;
        setupType = error.data.setupType;
      }
      
      setError({ 
        message: errorMessage, 
        details: errorDetails,
        setupRequired,
        setupType
      });
      
      // Publish error event
      eventBus.publish(events.PHONE_SEARCH_FAILED, { 
        phoneNumber, 
        error: errorMessage,
        setupRequired
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPhoneNumber('');
    setResult(null);
    setError(null);
    setIsValid(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Phone Number Lookup</h2>
        <p className="text-gray-600">
          Enter a phone number including the country code (e.g., +1 for US, +44 for UK)
        </p>
      </div>

      {error && (
        <ErrorMessage 
          message={error.message} 
          details={error.details}
          setupRequired={error.setupRequired}
          setupType={error.setupType}
        />
      )}

      <PhoneInput 
        value={phoneNumber}
        onChange={handlePhoneChange}
        onSearch={handleSearch}
        isValid={isValid}
        loading={loading}
      />

      {result && (
        <div className="mt-6">
          <ResultCard result={result} />
          <div className="mt-4 text-center">
            <button
              onClick={handleClear}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Search Another Number
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>This app uses <a href="https://www.abstractapi.com/api/phone-validation-api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Abstract API</a> for phone number validation and tracking.</p>
        <p className="mt-1">All information provided is based on public telecom data and does not track individuals.</p>
      </div>
    </div>
  );
};

export default PhoneTracker;