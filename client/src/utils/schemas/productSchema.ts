import { z } from 'zod';

import { requiredString } from '../helpers';

export const productSchema = z.object({
  name: requiredString('Name'),
  barcode: z.string().optional(),
  price: requiredString('Price'),
  stockQuantity: z.string().optional(),
  category: z.object({
    categoryId: z.coerce.number(),
    name: requiredString('Category'),
  }),
});

export type ProductSchema = z.infer<typeof productSchema>;
