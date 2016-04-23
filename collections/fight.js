var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var fight = db.collection("fight");

fight.remove(), function(err,result) {
    if (err) throw err;
    if (result) console.log('Deleted!');
};

fight.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});