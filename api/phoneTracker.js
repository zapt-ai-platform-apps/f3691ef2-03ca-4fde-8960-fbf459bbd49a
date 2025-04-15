import axios from 'axios';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Phone tracker API called');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber } = req.body;
  
  if (!phoneNumber) {
    console.error('No phone number provided');
    return res.status(400).json({ error: 'Phone number is required' });
  }

  console.log(`Processing phone number: ${phoneNumber}`);
  
  try {
    const apiKey = process.env.ABSTRACT_API_KEY;
    if (!apiKey) {
      const errorMessage = 'Missing ABSTRACT_API_KEY environment variable. Please add your Abstract API key to the .env file.';
      console.error(errorMessage);
      Sentry.captureException(new Error(errorMessage), {
        extra: {
          requestedPhoneNumber: phoneNumber,
          errorType: 'Configuration Error',
          missingKey: 'ABSTRACT_API_KEY'
        }
      });
      return res.status(500).json({ 
        error: 'Configuration error',
        message: 'Missing API key configuration. Please check the README for instructions on how to obtain and set up your Abstract API key.',
        setupRequired: true
      });
    }

    const response = await axios.get('https://phonevalidation.abstractapi.com/v1/', {
      params: {
        api_key: apiKey,
        phone: phoneNumber
      }
    });

    console.log('API response received:', JSON.stringify(response.data));
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching phone data:', error.message);
    
    // Check for API key related errors from the upstream service
    const isApiKeyError = error.response?.data?.error?.code === 401 || 
                          error.response?.status === 401 ||
                          error.message.includes('api_key');
    
    if (isApiKeyError) {
      Sentry.captureException(error, {
        extra: {
          phoneNumber,
          errorDetails: error.response?.data || error.message,
          errorType: 'API Key Error'
        }
      });
      
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'The provided API key for Abstract API is invalid or has expired. Please check your API key configuration.',
        setupRequired: true
      });
    }
    
    Sentry.captureException(error, {
      extra: {
        phoneNumber,
        errorDetails: error.response?.data || error.message
      }
    });
    
    return res.status(500).json({ 
      error: 'Failed to fetch phone data',
      details: error.response?.data || error.message
    });
  }
}