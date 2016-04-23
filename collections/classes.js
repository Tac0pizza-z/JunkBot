var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var classes = db.collection("class");

classes.find().toArray(function(err, dbToArray) {
    if (err) throw err;
    console.log(dbToArray);
});
