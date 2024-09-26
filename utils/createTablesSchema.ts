import { z } from 'zod';

import { zodToSimpleSchema } from './zodToSimpleSchema';

type SchemaMap = {
  [key: string]: z.ZodObject<any>;
};

export function createTablesSchema<T extends SchemaMap>(schemaMap: T) {
  // TODO: avoid mutation if possible
  const result: {
    [K in keyof T]: ReturnType<typeof zodToSimpleSchema>;
  } = {} as any;

  for (const [key, schema] of Object.entries(schemaMap)) {
    result[key as keyof T] = zodToSimpleSchema(schema);
  }

  return result;
}
