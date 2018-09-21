const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

// mock data
const games = [
    { name: 'Overwatch', id: '1', genreID: '1' },
    { name: 'Street Fighter', id: '2', genreID: '2' },
    { name: 'Super Mario Bros', id: '3', genreID: '3' },
    { name: 'Starcraft', id: '4', genreID: '4' },
    { name: 'Sonic The Hedgehog', id: '5', genreID: '3' },
    { name: 'Red Alert', id: '6', genreID: '4' }
];

const genres = [
    { name: 'First Person Shooter', id: '1' },
    { name: 'Beat Em Up', id: '2' },
    { name: 'Platformer', id: '3' },
    { name: 'Real Time Strategy', id: '4' }
];

const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: {
            type: GenreType,
            resolve(parent, args) {
                return _.find(genres, { id: parent.genreID });
            }
        }
    })
});

const GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        games: {
            type: new GraphQLList(GameType),
            resolve(parent, args) {
                return _.filter(games, { genreID: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        game: {
            type: GameType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(games, { id: args.id });
            }
        },
        genre: {
            type: GenreType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(genres, { id: args.id });
            }
        },
        games: {
            type: new GraphQLList(GameType),
            resolve(parent, args) {
                return games;
            }
        },
        genres: {
            type: new GraphQLList(GenreType),
            resolve(parent, args) {
                return genres;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
