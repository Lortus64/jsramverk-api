var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var database = require("../src/db/database.js");
const mongo = require("mongodb");

router.use(bodyParser.urlencoded({ extended: true }));

// Return a JSON object with list of all documents within the collection.
router.get("/listNames", async (req, res) => {
        let result = await getNames();

        console.log(result);
        res.json(result);
});

router.post("/update", async(req, res) => {
    if(!req.body.id){
        console.log("New");
        result = await createOne(req.body.name, req.body.content);
    } else{
        console.log("update");
        result = await updateOne(req.body.id, req.body.name, req.body.content);
    }

    console.log(result);
    res.json(result);
});

router.post("/listOne", async(req, res) => {
    console.info(req.body);
    let result = await getOne(req.body.id);

    console.log(result);
    res.json(result);
});



/**
    * Find documents in an collection by matching search criteria.
    *
    * @async
    *
    * @param {string} dsn        DSN to connect to database.
    * @param {string} colName    Name of collection.
    * @param {object} criteria   Search criteria.
    * @param {object} projection What to project in results.
    * @param {number} limit      Limit the number of documents to retrieve.
    *
    * @throws Error when database operation fails.
    *
    * @return {Promise<array>} The resultset as an array.
*/

/**
 asd asjdlkajlsdjl
*/

async function getNames() {
    try {
        db = await database.getDB();
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
        db = await database.getDB();
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
        db = await database.getDB();
        await db.collection.insertOne({name: name, content: content})
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
        db = await database.getDB();
        var o_id = new mongo.ObjectId(criteria);
        await db.collection.updateOne({"_id": o_id}, {$set: { "name": name,"content": content }})
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


module.exports = router;