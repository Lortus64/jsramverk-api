var database = require("../db/database.js");
const mongo = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { token } = require("morgan");
const saltRounds = 7;

async function createUser(name, pass) {
    try {
        var db = await database.getDB("users");
        var hash = bcrypt.hashSync(pass, saltRounds);

        await db.collection.insertOne({_id: name, pass: hash});

        return {
            data: {
                msg: "Login user",
                status: 201
            }
        };
    } catch (error) {
        return {
            error: {
                status: 500,
                titel: "Error loggin in user user",
                message: error.message
            }
        };
    } finally {
        await db.client.close();
    }
}

async function getOne(name) {
    try{
        var db = await database.getDB("users");

        return await db.collection.find({"_id": name}, {}).toArray();

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

async function checkPass(name, pass) {
    try {
        const userInfo = await getOne(name);
        var token = "No token";

        const okey = bcrypt.compareSync(pass, userInfo[0].pass);

        if (okey) {
            const user = {name: name};
            const secret = process.env.JWT_SECRET;

            token = jwt.sign(user, secret);
        } else {
            throw error;
        };

        return {
            data: {
                token: token
            }
        };
    } catch (error) {
        return {
            error: {
                status: 500,
                titel: "Error creating new user",
                message: error.message
            }
        };
    }
}

module.exports = {createUser, checkPass};
