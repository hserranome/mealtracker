import { createTools } from 'tinybase/tools/with-schemas';
import * as TBUIReact from 'tinybase/ui-react/with-schemas';
import type { WithSchemas } from 'tinybase/ui-react/with-schemas';
import { createStore } from 'tinybase/with-schemas';

import { tablesSchema, valuesSchema } from './schemas';

export const DB_NAME = 'local.db';

// Cast the whole module to be schema-based
const TinyBase = TBUIReact as WithSchemas<[typeof tablesSchema, typeof valuesSchema]>;
export const useTinyBase = () => TinyBase;

// Initialize store instance
export const tbStore = createStore().setSchema(tablesSchema, valuesSchema);

if (process.env.NODE_ENV === 'development') {
  const tools = createTools(tbStore);
  const [dTs, ts, uiReactDTs, uiReactTsx] = tools.getStoreApi(DB_NAME);
  // TODO: Export to file. We can't do it here.
}
