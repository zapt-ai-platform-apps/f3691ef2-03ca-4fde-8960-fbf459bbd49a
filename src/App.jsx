import React from 'react';
import PhoneTracker from './components/PhoneTracker';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-0">Phone Number Tracker</h1>
          <p className="text-blue-100 mt-1">Find location details from any phone number</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PhoneTracker />
      </main>
      
      <Footer />
      
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="zapt-badge"
      >
        Made on ZAPT
      </a>
    </div>
  );
}