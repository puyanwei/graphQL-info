const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// mock data
const games = [
    { name: 'Overwatch', genre: 'First Person Shooter', id: '1' },
    { name: 'Street Fighter', genre: 'Beat em up', id: '2' },
    { name: 'Mario', genre: 'Platformer', id: '3' }
];

const characters = [
    { name: 'Tracer', country: 'England', id: '1' },
    { name: 'Ryu', country: 'Japan', id: '2' },
    { name: 'Mario', country: 'Italy', id: '3' }
];

const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        country: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        game: {
            type: GameType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db/other source
                return _.find(games, { id: args.id });
            }
        },
        character: {
            type: CharacterType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db/other source
                return _.find(characters, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
