import * as Sentry from '@sentry/browser';

export const trackPhoneSearch = (phoneNumber) => {
  try {
    // Remove sensitive parts of the phone number for analytics
    const sanitizedNumber = phoneNumber.slice(0, 4) + 'XXXX' + phoneNumber.slice(-2);
    
    // Track the event if umami is available
    if (window.umami) {
      window.umami.track('phone_search', {
        phonePrefix: phoneNumber.slice(0, 4)
      });
    }
    
    // Record details to Sentry for debugging without storing full phone numbers
    Sentry.addBreadcrumb({
      category: 'search',
      message: 'Phone search initiated',
      data: {
        phonePrefix: phoneNumber.slice(0, 4),
        timestamp: new Date().toISOString()
      },
      level: 'info'
    });
    
  } catch (error) {
    console.error('Error tracking phone search:', error);
  }
};

export const trackSearchResult = (success, errorMessage = null) => {
  try {
    if (window.umami) {
      window.umami.track('search_result', {
        success,
        hasError: !!errorMessage
      });
    }
    
    if (!success && errorMessage) {
      Sentry.addBreadcrumb({
        category: 'error',
        message: 'Phone search failed',
        data: {
          error: errorMessage,
          timestamp: new Date().toISOString()
        },
        level: 'error'
      });
    }
  } catch (error) {
    console.error('Error tracking search result:', error);
  }
};