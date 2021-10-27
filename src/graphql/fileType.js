const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = require("graphql");


const FileType = () => new GraphQLObjectType({
    name: 'Files',
    description: 'File name and its content',
    fields: () => {
        return ({
            _id: { type: GraphQLID },
            name: { type: GraphQLString },
            content: { type: GraphQLString },
            auth: { type: new GraphQLList(GraphQLString) }
        });
    }
});

module.exports = FileType;
