import { z } from 'zod';

const requiredString = (field: string) =>
  z.string({ required_error: `${field} is required` }).min(1, { message: `${field} is required` });

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
