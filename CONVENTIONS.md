### Engineering conventions

#### Conventions
> When writing code, follow these conventions.

- Write simple, verbose code, over terse, compact, dense code.
- If a function does not have a corresponding test, mention it.
- When building tests, don't mock anything.

#### Project Structure

It's a React Native Expo app, using the app router folder structure.
We use Drizzle ORM for database managment. Local database only, we don't upload anything.

- app: routes
  - (tabs): main application view
  - onboarding: ignore this for now
  - login: ignore this for now
- data: contains the following:
  - database.ts: setup sqlite db with drizzle orm
  - types: ts types
  - schemas: sql schemas used by drizzle orm
  - migrations: db migrations
  - actions: methods to execute read/changes on the db
- theme:
  - unistyles.ts: setup up Unystyles 
  - breakpoints.ts: constants for breakpoints
  - theme.ts: all style constants
- utils: utility functions