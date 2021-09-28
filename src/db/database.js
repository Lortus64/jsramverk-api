//MongoDB
const mongo = require("mongodb").MongoClient;
try {
    const config = require("./config.json");
} catch (error) {
    console.log(error)
};
const collectionName = "files";

const database = {
    getDB: async function getDB() {
        let dsn = `mongodb+srv://editor:${config.password}
                    @cluster0.sa828.mongodb.net/db?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
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
