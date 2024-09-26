import * as TBUIReact from 'tinybase/ui-react/with-schemas';
import type { WithSchemas } from 'tinybase/ui-react/with-schemas';
import { createStore } from 'tinybase/with-schemas';

import { tablesSchema, valuesSchema } from './schemas';

// Cast the whole module to be schema-based
const TinyBase = TBUIReact as WithSchemas<[typeof tablesSchema, typeof valuesSchema]>;
export const useTinyBase = () => TinyBase;

// Initialize store instance
export const tbStore = createStore().setSchema(tablesSchema, valuesSchema);
