### Engineering conventions

#### Conventions
> When writing code, follow these conventions.

- Write simple, verbose code, over terse, compact, dense code.
- If a function does not have a corresponding test, mention it.
- When building tests, don't mock anything.
- Keep logic out of components by placing it on custom hooks consumed by components
- Never do default exports
- When styling, only use Unistyles and existing values in our theme (theme/theme.ts)

#### Project guidelines

- It's a React Native Expo app.
- Use yarn as package manager.
- For navigation use expo-router (app folder routing).
- We use Tinybase for data management. 
- Local database only, we don't upload anything.
- For form management we use react-hook-form.
- For styling we use react-native-unistyles. 

#### Project structure

- app: routes
  - (tabs): main application view
  - onboarding: ignore this for now
  - login: ignore this for now
- components
  - contexts
    - TinyBaseContext: sets up TinyBase and configures schemas and persistors
- constants
- data: contains the following:
  - index.ts: exports all
  - schemas.ts: contains data schemas, table names, and key names, used by TinyBasetable names
  - types: ts types
  - tinybase.ts: sets up Tinybase with the schemas and typings
- theme:
  - unistyles.ts: setup up react-native-unistyles 
  - breakpoints.ts: constants for breakpoints
  - theme.ts: style constants. when styling use these constants
- utils: utility functions