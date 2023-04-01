# Mat Do React App

## Setup

Create a `.env.local` file and set the following environments:
- `HTTPS=true` - must be true to use the browers Geolocation API
- `REACT_APP_API_BASE_URL`
  - Set this to `http://localhost:3030` to use the local `json-server`
- If you want to use the local `json-server` the `REACT_APP_AUTH_*` environments are optional
  - `REACT_APP_AUTH_DOMAIN`
  - `REACT_APP_AUTH_CLIENT_ID`
  - `REACT_APP_AUTH_AUDIENCE`
  - `REACT_APP_AUTH_CALLBACK_URI`

## Data

### Seeding

To seed some local (`json-server`) server data, run `npm run seed`. Pass the following optional positional args to control output.

`npm run seed -- [position 0] [position 1]`
- position 0 is the number of items (default 10).
- position 1 is the `userId` (default `generated-user-id`).

*Example*: `npm run seed -- 10 some-user-id` 
- will generate `10` items all with the `userId` property set to `some-user-id`.