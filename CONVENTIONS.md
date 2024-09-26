### Engineering conventions

#### Conventions
> When writing code, follow these conventions.

- Write simple, verbose code, over terse, compact, dense code.
- If a function does not have a corresponding test, mention it.
- When building tests, don't mock anything.
- Keep logic out of components by placing it on custom hooks consumed by components

#### Project Structure

It's a React Native Expo app.
Use yarn as package manager.
For navigation we are using expo-router (where the app folder determines the navigation).
We use expo-sqlite and drizzle-orm for database managment. 
Local database only, we don't upload anything.
For form management we use react-hook-form.
For styling we use react-native-unistyles. Only use constants existing in theme/theme.ts

- app: routes
  - (tabs): main application view
  - onboarding: ignore this for now
  - login: ignore this for now
- components
  - context
    - TinyBaseContext: sets up TinyBase and configures schemas and persistors
- constants
  - index.ts: contains TinyBase schemas, table names, and some other constants
- data: contains the following:
  - types: ts types
  - actions: methods to execute read/changes on the db
- theme:
  - unistyles.ts: setup up react-native-unistyles 
  - breakpoints.ts: constants for breakpoints
  - theme.ts: all style constants
- utils: utility functions