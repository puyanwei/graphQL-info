const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const games = [
    { name: 'Overwatch', genre: 'First Person Shooter', id: 1 },
    { name: 'Street Fighter', genre: 'Beat em up', id: 2 },
    { name: 'Mario', genre: 'Platformer', id: 3 }
];

const GameType = new GraphQLObjectType({
    name: `Game`,
    fields: () => {
        id: {
            type: GraphQLString;
        }
        name: {
            type: GraphQLString;
        }
        genre: {
            type: GraphQLString;
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: `RootQueryType`,
    fields: {
        game: {
            type: GameType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // code to get data from db/other source
                return _.find(games, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

game(id: 2) {
    name
    genre
}