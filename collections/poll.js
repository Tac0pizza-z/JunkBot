var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var poll = db.collection("poll");

poll.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});