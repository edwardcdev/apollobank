[![Netlify Status](https://api.netlify.com/api/v1/badges/567f877d-68aa-4dac-a323-0fb289d1c73e/deploy-status)](https://app.netlify.com/sites/vigilant-goldwasser-9ac664/deploys)

# apollobank 🚀

A fullstack GraphQL banking application built using React, Node & TypeScript.

## What's included?

- Login/register
- Dashboard
- Accounts
- Transactions
- Credit cards
- Settings
- Spending for this month chart
- Dummy data generator using faker

![dashboard](images/dashboard.png)

## Technologies used

### Server side

- Apollo Server
- bcryptjs
- cors
- Express
- GraphQL
- faker
- jsonwebtoken
- TypeGraphQL
- TypeORM
- TypeScript
- PostgreSQL

### Client side

- Apollo React Hooks
- FontAwesome Icons
- Material UI
- Recharts
- Formik
- Yup

## Todo

- [ ] Don't allow the user to destroy an account if they are in debt or their account balance > 0
- [ ] When deleting and destroying an account, alert the user with another dialog to check if they would like to proceed with this action.
- [ ] Update the chart on the dashboard to show spending such that the y axis is the users account balance.
- [ ] Sort transactions by date & sort chart data by date.
- [ ] Fetch exchange rates from an API.

Flag icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
