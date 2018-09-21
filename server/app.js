const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connect to mlab database

const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect(
    'mongodb://puyan:Sx3R5E36ywWa@ds211613.mlab.com:11613/gql-tutorial',
    options
);

mongoose.connection.once('open', () => {
    console.log('connected to mlabs database');
});

// Middleware that hands off the request to express-graphQL to handle when a request is made to /graphql
app.use(
    '/graphql',
    graphQLHTTP({
        schema,
        graphiql: true
    })
);

// Schema needs to be passed into graphQL, which tells express-graphQL how the data is formatted

app.listen(1337, () => {
    console.log(`listening to requests on port 1337`);
});
