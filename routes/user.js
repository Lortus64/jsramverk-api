var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var functions = require("../src/functions/userF");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/create", async (req, res) => {
    console.info(req.body);
    let result = await functions.createUser(req.body.name, req.body.pass);

    console.log(result);
    res.json(result);
});

router.post("/auth", async (req, res) => {
    console.info(req.body);
    let result = await functions.checkPass(req.body.name, req.body.pass);

    console.log(result);
    res.json(result);
});

module.exports = router;
