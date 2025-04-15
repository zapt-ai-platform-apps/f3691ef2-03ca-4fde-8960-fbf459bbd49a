import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { eventBus } from '@/modules/core/events';
import { trackPhoneSearch } from '@/modules/core/analytics';
import { events } from '../events';
import * as Sentry from '@sentry/browser';

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

const fetchPhoneData = async (phoneNumber) => {
  eventBus.publish(events.PHONE_SEARCH_INITIATED, { phoneNumber });
  trackPhoneSearch(phoneNumber);
  
  try {
    const response = await fetch('/api/phoneTracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || data.error || 'Failed to fetch phone data');
      error.data = data;
      eventBus.publish(events.PHONE_SEARCH_FAILED, { 
        phoneNumber, 
        error: data.message || data.error,
        setupRequired: data.setupRequired
      });
      throw error;
    }

    console.log('Phone data received:', data);
    eventBus.publish(events.PHONE_SEARCH_COMPLETED, { 
      phoneNumber, 
      result: data 
    });
    
    return data;
  } catch (error) {
    console.error('Error during phone search:', error);
    Sentry.captureException(error, {
      extra: { phoneNumber }
    });
    throw error;
  }
};

export const internal = {
  validateNumber,
  fetchPhoneData
};