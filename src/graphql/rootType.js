const {
    GraphQLObjectType,
    GraphQLList,
} = require("graphql");

const FileTypeInject = require('./fileType');
const functions = require('../functions/indexF')
const types = {};
types.FileType = FileTypeInject(types);
const FileType = types.FileType;



// const UserTypeInject = require('./userType');
// const UF = require('../functions/userF')
// types.UserType = UserTypeInject(types);
// const UserType = types.UserType;


const RootQueryType = () => new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => {
        return ({
            files: {
                type: new GraphQLList(FileType),
                description: 'List of files',
                resolve: async function() {
                    return await functions.getAll();
                }
            }
        });
    }
});

module.exports = RootQueryType;
