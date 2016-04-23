var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var adj = db.collection("adj");

adj.remove(), function(err,result) {
    if (err) throw err;
    if (result) console.log('Deleted!');
};

adj.insert({adj: "smelly"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "cancerous"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "salty"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "moist"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "cranky"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "dried up"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "insignificant"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "homophobic"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "ugly"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "super dank"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "oriental"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "gay"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "unentertaining"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "boring"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "racist"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "misshapen"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "slimy"}, function(err, result) {if (err) throw err;});

adj.insert({adj: "nuclear"}, function(err, result) {if (err) throw err;});

adj.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});