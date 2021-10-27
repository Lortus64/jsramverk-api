var database = require("../db/database.js");
const mongo = require("mongodb");


/**
 asd asjdlkajlsdjl
*/

async function getAll() {
    try {
        var db = await database.getDB("files");

        let result = await db.collection.find({}).toArray();

        console.log(result);

        return result
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



async function getNames() {
    try {
        var db = await database.getDB("files");

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

async function getOne(req, res) {
    try {
        var db = await database.getDB("files");
        var o_id = new mongo.ObjectId(req.body.id);

        var file = await db.collection.find({"_id": o_id}, {}).toArray();

        if(file[0].auth.includes(res.locals.token.name) || file[0].auth.includes("ALL")) {
            return file;
        };

        return {
            error: {
                status: 500,
                titel: "Not authorised",
            }
        };

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
        var db = await database.getDB("files");

        await db.collection.insertOne({name: name, content: content, auth:["ALL"]});
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
        var db = await database.getDB("files");
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

module.exports = {getAll, getNames, getOne, createOne, updateOne};
