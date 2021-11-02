var database = require("../db/database.js");
const mongo = require("mongodb");
const sgMail = require("@sendgrid/mail");


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

async function updateAuth(req, data) {
    try {
        var db = await database.getDB("files");
        var o_id = new mongo.ObjectId(data._id);

        data.auth.push(req.body.mail)

        await db.collection.updateOne({"_id": o_id}, {$set: { "auth": data.auth, }});
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
        await db.client.close();
    }
}

async function mail(req) {
    const key = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(key);


    const msg = {
    to: req.body.mail,
    from: 'adei18@student.bth.se', // Use the email address or domain you verified above
    subject: 'Invite to work on file',
    html: '<p>Here is a link to join</p> <br> <a href="http://www.student.bth.se/~adei18/editor/">To Editor</a>',
    };

    sgMail
        .send(msg)
        .then(() => {}, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
    });

    console.log("Mail sent to " + req.body.mail);

}

module.exports = {getAll, getNames, getOne, createOne, updateOne, updateAuth, mail};
