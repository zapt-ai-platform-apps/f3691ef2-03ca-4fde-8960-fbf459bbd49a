import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">Phone Number Tracker</h3>
            <p className="text-gray-400 text-sm mt-1">Find location details from any phone number worldwide</p>
          </div>
          
          <div className="text-sm">
            <p className="mb-2">This tool respects privacy and only uses information available in public records.</p>
            <p>&copy; {new Date().getFullYear()} Phone Number Tracker. All rights reserved.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs text-gray-400">
          <p>Results are based on carrier data and may not always reflect the actual current location of a phone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;