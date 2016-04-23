var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var use = db.collection("use");

use.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});