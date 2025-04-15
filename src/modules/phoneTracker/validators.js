import { z } from 'zod';
import { createValidator } from '@/modules/core/validators';

// Define the schema for the phone number input
export const phoneNumberInputSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required")
});

// Define the schema for phone number validation errors
export const phoneErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z.any().optional(),
  setupRequired: z.boolean().optional(),
  setupType: z.enum(['missing_key', 'invalid_key']).optional()
});

// Define the schema for successful response from the Abstract API
export const phoneNumberResultSchema = z.object({
  phone: z.string(),
  valid: z.boolean(),
  format: z.object({
    international: z.string().optional(),
    local: z.string().optional()
  }).optional(),
  country: z.object({
    code: z.string().optional(),
    name: z.string().optional(),
    prefix: z.string().optional()
  }).optional(),
  location: z.string().optional().nullable(),
  carrier: z.string().optional().nullable(),
  type: z.string().optional().nullable()
}).or(phoneErrorSchema);

// Create validator functions
export const validatePhoneNumberInput = createValidator(
  phoneNumberInputSchema,
  'PhoneNumberInput'
);

export const validatePhoneNumberResult = createValidator(
  phoneNumberResultSchema,
  'PhoneNumberResult'
);

export const validateError = createValidator(
  phoneErrorSchema,
  'PhoneNumberError'
);