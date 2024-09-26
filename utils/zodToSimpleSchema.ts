import { z } from 'zod';

export function zodToSimpleSchema(schema: z.ZodObject<any>) {
  const result: any = {};

  for (const [key, value] of Object.entries(schema.shape)) {
    if (value instanceof z.ZodNumber) {
      result[key] = { type: 'number' };
    } else if (value instanceof z.ZodString) {
      result[key] = { type: 'string' };
    } else if (value instanceof z.ZodBoolean) {
      result[key] = { type: 'boolean' };
    } else if (value instanceof z.ZodArray) {
      result[key] = { type: 'array' };
    } else if (value instanceof z.ZodObject) {
      result[key] = { type: 'object' };
    } else {
      result[key] = { type: 'unknown' };
    }
  }

  return result;
}
