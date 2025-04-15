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
      throw new Error('Missing ABSTRACT_API_KEY environment variable');
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