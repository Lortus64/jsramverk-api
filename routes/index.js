var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var functions = require("../src/functions/route.js");

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

router.post("/listOne", async (req, res) => {
    console.info(req.body);
    let result = await functions.getOne(req.body.id);

    console.log(result);
    res.json(result);
});


module.exports = router;
