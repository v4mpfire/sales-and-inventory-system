import z from 'zod';

import { requiredString } from '../helpers';

export const customerSchema = z.object({
  customerId: z.number().optional(),
  name: requiredString('Name'),
  email: z.string().email().or(z.literal('')).optional(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
