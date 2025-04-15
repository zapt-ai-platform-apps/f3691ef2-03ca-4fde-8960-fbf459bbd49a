import { z } from 'zod';
import { createValidator } from '@/modules/core/validators';

// Phone number input validation
export const phoneNumberInputSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required')
});

export const validatePhoneNumberInput = createValidator(
  phoneNumberInputSchema, 
  'PhoneNumberInput'
);

// Phone number result validation
export const phoneNumberResultSchema = z.object({
  valid: z.boolean().optional(),
  phone: z.string().optional(),
  format: z.object({
    international: z.string().optional(),
    local: z.string().optional()
  }).optional(),
  country: z.union([
    z.object({
      name: z.string().optional(),
      code: z.string().optional()
    }),
    z.string()
  ]).optional(),
  country_code: z.string().optional(),
  location: z.string().optional(),
  carrier: z.string().optional(),
  line_type: z.union([z.string(), z.null()]).optional(),
  type: z.string().optional()
});

export const validatePhoneNumberResult = createValidator(
  phoneNumberResultSchema, 
  'PhoneNumberResult'
);

// Error schema
export const errorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  setupRequired: z.boolean().optional(),
  details: z.any().optional()
});

export const validateError = createValidator(
  errorSchema, 
  'Error'
);