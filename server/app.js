const express = require("express");
const graphQLHTTP = require("express-graphql");

const app = express();

// Middleware that hands off the request to express-graphQL to handle when a request is made to /graphql
app.use("/graphql", graphQLHTTP({}));

// Schema needs to be passed into graphQL, which tells express-graphQL how the data is formatted

app.listen(1337, () => {
    console.log(`listening to requests on port 1337`);
});
