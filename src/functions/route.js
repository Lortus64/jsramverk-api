var database = require("../db/database.js");
const mongo = require("mongodb");


/**
 asd asjdlkajlsdjl
*/

async function getNames() {
    try {
        var db = await database.getDB();

        return await db.collection.find({}, { projection: {name: 1}}).toArray();
    } catch (error) {
        return {
            error: {
                status: 500,
                titel: "Error getting names",
                message: error.message
            }
        };
    } finally {
        await db.client.close();
    }
}

/**
 asd asjdlkajlsdjl
*/

async function getOne(criteria) {
    try {
        var db = await database.getDB();
        var o_id = new mongo.ObjectId(criteria);

        return await db.collection.find({"_id": o_id}, {}).toArray();
    } catch (error) {
        return {
            error: {
                status: 500,
                titel: "Error getting one",
                message: error.message
            }
        };
    } finally {
        await db.client.close();
    }
}

/**
 asd asjdlkajlsdjl
*/

async function createOne(name, content) {
    try {
        var db = await database.getDB();

        await db.collection.insertOne({name: name, content: content});
        return {
            data: {
                msg: "Creating new file in database",
                status: 201
            }
        };
    } catch (error) {
        return {
            error: {
                status: 500,
                titel: "Error creating new database row",
                message: error.message
            }
        };
    } finally {
        await db.client.close();
    }
}


/**
 asd asjdlkajlsdjl
*/

async function updateOne(criteria, name, content) {
    try {
        var db = await database.getDB();
        var o_id = new mongo.ObjectId(criteria);

        await db.collection.updateOne({"_id": o_id}, {$set: { "name": name, "content": content }});
        return {
            data: {
                msg: "Updating file in database",
                status: 201
            }
        };
    } catch (error) {
        return {
            error: {
                status: 500,
                titel: "Error updating database row",
                message: error.message
            }
        };
    } finally {
        console.log(criteria);
        console.log(content);
        await db.client.close();
    }
}

module.exports = {getNames, getOne, createOne, updateOne};
