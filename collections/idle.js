var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var idle = db.collection("idle");

/*idle.remove(), function(err,result) {
    if (err) throw err;
    if (result) console.log('Deleted!');
};*/

idle.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

