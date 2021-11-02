const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const functions = require("../src/functions/indexF.js");
const middleware = require("../src/functions/middleware.js");

router.use(bodyParser.urlencoded({ extended: true }));

// Return a JSON object with list of all documents within the collection.
router.get("/listNames", async (req, res) => {
    let result = await functions.getNames();

    console.log(result);
    res.json(result);
});

router.post("/update", async (req, res) => {
    var result;

    if (!req.body.id) {
        console.log("New");
        result = await functions.createOne(req.body.name, req.body.content);
    } else {
        console.log("update");
        result = await functions.updateOne(req.body.id, req.body.name, req.body.content);
    }

    console.log(result);
    res.json(result);
});

router.post("/listOne",
    (req, res, next) => middleware.checkToken(req, res, next),
    async (req, res) => {
        console.info(req.body);
        let result = await functions.getOne(req, res);

        console.log(result);
        res.json(result);
    });

    // input id, token, mail
router.post("/mailInvite",
    (req, res, next) => middleware.checkToken(req, res, next),
    async (req, res) => {
        console.info(req.body);
        let data = await functions.getOne(req, res);
        console.log(data);

        let result = await functions.updateAuth(req, data[0]);

        if(!result.error) {
            await functions.mail(req);
        };

        console.log(result);
        res.json(result);
    });


module.exports = router;
