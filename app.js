"use strict";
//Express
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const visual = true;
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema
} = require("graphql");
const RootQueryTypeInject = require('./src/graphql/rootType.js');

const app = express();
const port = process.env.PORT || 1337;

const index = require('./routes/index');
const userR = require('./routes/user');

app.use(cors());

//?Socket
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket) {
    console.log("User connected"); // Nått lång och slumpat

    socket.on('create', function(room) {
        console.log("Creating room: " + room)
        socket.join(room);
    });

    socket.on('update', function(data) {
        console.log(data);
        socket.to(data.dataObj._id).emit("dataB", data.text);
    });

    socket.on('leave', function(room) {
        console.log("Leaving room: " + room)
        socket.leave(room);
    });

    socket.on('disconnect', function() {
        console.log("User disconnected")
    });
});



//?Middleware
// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined'));
}



const types = {};
types.RootQueryType = RootQueryTypeInject(types);
const RootQueryType = types.RootQueryType;

const schema = new GraphQLSchema({
    query: RootQueryType
});



//?routes
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual
}));

app.use('/', index);

app.use('/user', userR);


//? routes for 404 and error handling
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
const server = httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
