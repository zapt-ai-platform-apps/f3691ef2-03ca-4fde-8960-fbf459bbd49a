import React from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaKey } from 'react-icons/fa';

const ErrorMessage = ({ message, details, setupRequired, setupType }) => {
  if (setupRequired) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md mb-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <FaKey className="h-5 w-5 text-amber-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-amber-800">API Key {setupType === 'missing_key' ? 'Missing' : 'Invalid'}</h3>
            <div className="mt-2 text-amber-700">
              <p className="mb-2">{message}</p>
              <div className="bg-white p-4 rounded border border-amber-200 mt-3">
                <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" /> How to get your API key:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Visit <a href="https://www.abstractapi.com/api/phone-validation-api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Abstract API's Phone Validation API</a></li>
                  <li>Create a free account or sign in</li>
                  <li>Locate your API key on the dashboard</li>
                  <li>Add your API key to the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">.env</code> file as:</li>
                  <li className="pl-5 list-none">
                    <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm block ml-2 mt-1">ABSTRACT_API_KEY=your_api_key_here</code>
                  </li>
                  <li>Restart your application</li>
                </ol>
                <div className="mt-4 text-xs text-amber-600">
                  <p>The free plan includes 500 requests per month, which is sufficient for testing and personal use.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FaExclamationTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message || 'An error occurred while processing your request.'}</p>
            {details && (
              <p className="mt-2 text-xs text-red-600">
                Details: {details}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;