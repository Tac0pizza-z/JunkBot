var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var adj = db.collection("adj");

adj.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var bird = db.collection("bird");

bird.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var idle = db.collection("idle");

idle.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var meme = db.collection("meme");

meme.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var name = db.collection("name");

name.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var noun = db.collection("noun");

noun.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var battle = db.collection("battle");

battle.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var junk = db.collection("junk");

junk.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var fight = db.collection("fight");

fight.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var semi = db.collection("semi");

semi.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var weed = db.collection("weed");

weed.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var use = db.collection("use");

use.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var poll = db.collection("poll");

poll.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

var classdb = db.collection("class");

classdb.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});