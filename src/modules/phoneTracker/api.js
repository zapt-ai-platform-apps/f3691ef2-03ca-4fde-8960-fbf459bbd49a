import { internal } from './internal/services';
import { validatePhoneNumberInput, validatePhoneNumberResult, validateError } from './validators';

export const api = {
  validatePhoneNumber(phoneNumber) {
    // This is a simpler API function that doesn't need complex validation
    return internal.validateNumber(phoneNumber);
  },
  
  async searchPhoneNumber(phoneNumber) {
    // Validate input
    const input = validatePhoneNumberInput(
      { phoneNumber },
      {
        actionName: 'searchPhoneNumber',
        location: 'phoneTracker/api.js',
        direction: 'incoming',
        moduleFrom: 'client',
        moduleTo: 'phoneTracker'
      }
    );

    try {
      const result = await internal.fetchPhoneData(input.phoneNumber);
      
      // Validate result
      return validatePhoneNumberResult(
        result,
        {
          actionName: 'searchPhoneNumber',
          location: 'phoneTracker/api.js',
          direction: 'outgoing',
          moduleFrom: 'phoneTracker',
          moduleTo: 'client'
        }
      );
    } catch (error) {
      if (error.data) {
        return validateError(
          error.data,
          {
            actionName: 'searchPhoneNumber',
            location: 'phoneTracker/api.js',
            direction: 'outgoing',
            moduleFrom: 'phoneTracker',
            moduleTo: 'client'
          }
        );
      }
      throw error;
    }
  }
};