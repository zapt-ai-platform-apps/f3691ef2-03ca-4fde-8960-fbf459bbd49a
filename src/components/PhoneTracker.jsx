import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneInput from './PhoneInput';
import ResultCard from './ResultCard';
import ErrorMessage from './ErrorMessage';
import { trackPhoneSearch } from '../services/analytics';
import * as Sentry from '@sentry/browser';

const PhoneTracker = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [setupRequired, setSetupRequired] = useState(false);

  const validateNumber = (number) => {
    if (!number) return false;
    
    try {
      const phoneNumber = parsePhoneNumberFromString(number);
      return phoneNumber?.isValid() || false;
    } catch (error) {
      console.error('Error validating phone number:', error);
      Sentry.captureException(error, {
        extra: { phoneNumber: number }
      });
      return false;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setSetupRequired(false);
    
    const isValid = validateNumber(phoneNumber);
    if (!isValid) {
      setError('Please enter a valid phone number with country code.');
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      
      console.log('Searching for phone number:', phoneNumber);
      trackPhoneSearch(phoneNumber);
      
      const response = await fetch('/api/phoneTracker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.setupRequired) {
          setSetupRequired(true);
        }
        throw new Error(data.message || data.error || 'Failed to fetch phone data');
      }

      console.log('Phone data received:', data);
      setResult(data);
    } catch (error) {
      console.error('Error during phone search:', error);
      Sentry.captureException(error, {
        extra: { phoneNumber }
      });
      
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h2 className="text-center text-xl font-semibold mb-6">Track Phone Number Location</h2>
        
        <PhoneInput 
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleSearch={handleSearch}
          loading={loading}
        />
        
        {error && (
          <ErrorMessage 
            message={error} 
            setupRequired={setupRequired}
          />
        )}
      </div>

      {searched && (
        loading ? (
          <div className="card text-center">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-6 h-6 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
              <p>Searching...</p>
            </div>
          </div>
        ) : result ? (
          <ResultCard result={result} />
        ) : !error && (
          <div className="card bg-orange-50 border border-orange-200">
            <p className="text-center text-orange-700">No results found for this number.</p>
          </div>
        )
      )}

      {setupRequired && (
        <div className="card mt-4 bg-yellow-50 border-2 border-yellow-400">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">API Key Required</h3>
          <p className="text-yellow-800 mb-2">
            This app requires an API key from Abstract API to function. The key hasn't been configured yet.
          </p>
          <h4 className="font-medium text-yellow-800 mt-3 mb-1">How to set up your API key:</h4>
          <ol className="list-decimal list-inside text-yellow-800 space-y-1">
            <li>Visit <a href="https://www.abstractapi.com/api/phone-validation-api" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Abstract API</a> and create an account</li>
            <li>Get your API key from the Phone Validation API section</li>
            <li>Add your key to the .env file as <code className="bg-yellow-100 px-2 py-1 rounded">ABSTRACT_API_KEY=your_key_here</code></li>
            <li>Restart the application</li>
          </ol>
          <p className="text-yellow-800 mt-3">
            For more details, please check the README file.
          </p>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">About This Tool</h3>
        <p className="text-sm text-blue-800">
          This phone tracker allows you to find the location and carrier information for any phone number worldwide. 
          Enter a complete phone number including the country code (e.g., +1 for US numbers) to get started.
        </p>
        <p className="text-sm text-blue-800 mt-2">
          Note: The accuracy of results depends on the phone number's registration and may vary by country.
        </p>
        <p className="text-sm text-blue-800 mt-2">
          <strong>Important:</strong> This service requires a valid API key. If you're experiencing issues, please make sure the API key is properly configured.
        </p>
      </div>
    </div>
  );
};

export default PhoneTracker;