import { z } from 'zod';

export const zodToSimpleSchema = (schema: z.ZodObject<any>) => {
  const result: Record<string, { type: string }> = {};
  for (const [key, value] of Object.entries(schema.shape)) {
    if (value instanceof z.ZodNumber) {
      result[key] = { type: 'number' };
    } else if (value instanceof z.ZodString) {
      result[key] = { type: 'string' };
    } else if (value instanceof z.ZodBoolean) {
      result[key] = { type: 'boolean' };
    }
  }
  return result;
};
