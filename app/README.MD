# Mat Do React App

## Data

### Seeding

To seed some local (`json-server`) server data, run `npm run seed`. Pass the following optional positional args to control output.

`npm run seed -- [position 0] [position 1]`
- position 0 is the number of items (default 10).
- position 1 is the `userId` (default `generated-user-id`).

*Example*: `npm run seed -- 10 some-user-id` 
- will generate `10` items all with the `userId` property set to `some-user-id`.