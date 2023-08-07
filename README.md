# Install, migrate and seed

```
npm install
npm run knex migrate:latest
npm run knex seed:run
```

## Exercise

In this challenge, we're going to build a CLI tool to read data from the database using `join`s

### As a Passenger

1. List all my tickets given a `passengers.id`
1. List all my tickets by `passengers.dob`
1. Count all my tickets by `passengers.dob`
1. How many luggage have you lost?
1. What is the total weight of your luggage where `is_lost` equals `true`?
1. List the airport `phone` and `email` where your lost luggage are found at, so that you can contact them
1. Print the boarding pass
   - Navigate to `http://localhost:3000/1234` to view the ticket (boarding pass)
   - Write a db function that queries all ticket information in one query
   - Call the db function in `server.js`
   - Go to `views/ticket` and replace the hardcoded values with data passed from `viewData`

### As an Airport staff

1. For a given airport, list the phone numbers for all passengers who have lost their luggage so that the Airport staff can call them
1. For a given airport, display the names and phone numbers for all passengers who own suspicious luggage
