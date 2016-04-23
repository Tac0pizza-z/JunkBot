var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var battle = db.collection("battle");
/*
battle.remove(), function(err,result) {
    if (err) throw err;
    if (result) console.log('Deleted!');
};
*/
battle.find().toArray(function(err, dbToArray) {
    if (err) throw err;
    console.log(dbToArray);
});
