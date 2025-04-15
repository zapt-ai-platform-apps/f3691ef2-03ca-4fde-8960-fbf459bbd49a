import React from 'react';
import { FiMapPin, FiPhone, FiGlobe, FiFlag, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ResultCard = ({ result }) => {
  // Format for the map URL
  const mapUrl = result.location ? 
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${result.location || ''} ${result.country || ''}`
    )}` : null;

  const renderInfoItem = (icon, label, value, className = "") => {
    if (!value) return null;
    return (
      <div className={`flex items-start mb-3 ${className}`}>
        <div className="text-blue-500 mr-2 mt-1">{icon}</div>
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="font-medium">{value}</div>
        </div>
      </div>
    );
  };

  const renderValidationItem = (label, isValid, info = "") => {
    return (
      <div className="flex items-center mb-2">
        {isValid ? (
          <FiCheckCircle className="text-green-500 mr-2" />
        ) : (
          <FiXCircle className="text-red-500 mr-2" />
        )}
        <div>
          <span className="mr-1">{label}:</span>
          <span className={isValid ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {isValid ? "Valid" : "Invalid"}
          </span>
          {info && <span className="text-sm text-gray-500 ml-1">({info})</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Phone Number Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3 text-blue-600">Location Information</h3>
          
          {renderInfoItem(
            <FiPhone />, 
            "Phone Number", 
            result.phone || result.format?.international || "N/A"
          )}
          
          {renderInfoItem(
            <FiGlobe />, 
            "Country", 
            result.country?.name || result.country || "N/A"
          )}
          
          {renderInfoItem(
            <FiFlag />, 
            "Country Code", 
            result.country?.code || result.country_code || "N/A"
          )}
          
          {renderInfoItem(
            <FiMapPin />, 
            "Location", 
            result.location || "N/A"
          )}
          
          {mapUrl && (
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 text-blue-600 hover:underline"
            >
              View on Map
            </a>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 text-blue-600">Carrier Information</h3>
          
          {renderInfoItem(
            <FiPhone />, 
            "Carrier", 
            result.carrier || "N/A"
          )}
          
          {renderInfoItem(
            <FiPhone />, 
            "Line Type", 
            result.line_type || result.type || "N/A"
          )}
          
          <h3 className="text-lg font-medium mt-5 mb-3 text-blue-600">Validation Results</h3>
          
          {renderValidationItem(
            "Phone Number", 
            result.valid || false,
            result.format?.local || ""
          )}
          
          {result.format && (
            <div className="mt-4 text-sm">
              <div className="text-gray-500 mb-1">Formatted Number:</div>
              <div className="font-medium">{result.format.international || "N/A"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;