//MongoDB
const mongo = require("mongodb").MongoClient;
let config;

const database = {
    getDB: async function getDB(collectionName) {
        let dsn;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        } else {
            try {
                config = require("./config.json");

                dsn = `mongodb+srv://editor:${config.password}@cluster0.sa828.mongodb.net/db?retryWrites=true&w=majority`;
            } catch (error) {}
        }

        const client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
