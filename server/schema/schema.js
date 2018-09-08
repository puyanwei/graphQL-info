const graphql = require("graphql");

const { GraphQLObjectType, GraphQLStringType } = graphql;

const GameType = new GraphQLObjectType({
    name: `Game`,
    fields: () => {
        id: {
            type: GraphQLStringType;
        }
        name: {
            type: GraphQLStringType;
        }
        genre: {
            type: GraphQLStringType;
        }
    }
});
