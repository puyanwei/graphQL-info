const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

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
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
