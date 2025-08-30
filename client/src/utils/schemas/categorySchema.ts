import z from 'zod';

import { requiredString } from '../helpers';

export const categorySchena = z.object({
  categoryId: z.number().optional(),
  name: requiredString('Name'),
});

export type CategorySchema = z.infer<typeof categorySchena>;
