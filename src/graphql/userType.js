const {
    GraphQLObjectType,
    GraphQLString,
} = require("graphql");


const UserType = () => new GraphQLObjectType({
    name: 'Users',
    description: 'List of users',
    fields: () => {
        return ({
            _id: { type: GraphQLString },
            pass: { type: GraphQLString },
        });
    }
});

module.exports = UserType;
