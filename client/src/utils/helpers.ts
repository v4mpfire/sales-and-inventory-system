import z from 'zod';

export const requiredString = (field: string) =>
  z.string({ required_error: `${field} is required` }).min(1, { message: `${field} is required` });
