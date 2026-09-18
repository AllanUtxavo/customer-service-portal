import { z } from 'zod';

export const createRequestSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must contain at least 3 characters.')
    .max(120, 'Title cannot exceed 120 characters.'),

  description: z
    .string()
    .min(10, 'Description must contain at least 10 characters.')
    .max(2000, 'Description cannot exceed 2000 characters.'),

  category: z
    .string()
    .min(2, 'Category must contain at least 2 characters.')
    .max(50, 'Category cannot exceed 50 characters.'),

  priority: z.enum([
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL',
  ]),

  requesterName: z
    .string()
    .min(2, 'Requester name must contain at least 2 characters.')
    .max(100, 'Requester name cannot exceed 100 characters.'),

  requesterEmail: z
    .email('Enter a valid email address.')
    .max(254, 'Email cannot exceed 254 characters.'),
});

export type CreateRequestFormData = z.infer<
  typeof createRequestSchema
>;