# Mat Do React App

## Setup

Create a `.env.local` file and set the following environments:
- `REACT_APP_API_BASE_URL`
  - Set to `http://localhost:5001/mat-do-5ab6a/us-central1/api` for firebase emulator
- TODO: firebase auth
  
## Data

Run the firebase emulator suite from the firebase backend project.

### Seeding
**`@deprecated - Use Firebase Enmulator Suite instead.`**

To seed some local (`json-server`) server data, run `npm run seed`. Pass the following optional positional args to control output.

`npm run seed -- [position 0] [position 1]`
- position 0 is the number of items (default 10).
- position 1 is the `userId` (default `generated-user-id`).

*Example*: `npm run seed -- 10 some-user-id` 
- will generate `10` items all with the `userId` property set to `some-user-id`.