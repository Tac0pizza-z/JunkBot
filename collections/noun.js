var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var noun = db.collection("noun");

noun.remove(), function(err,result) {
    if (err) throw err;
    if (result) console.log('Deleted!');
};

noun.insert({noun: "fucker"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "bee"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "cow"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "cur"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "idiot"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "shithead"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "meatbag"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "meathead"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "fascist"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "foot"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "hand"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "nerd"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "weeb"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "cat"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "dog"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "bird"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "pussy"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "wanker"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "meme"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "asshole"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "asshat"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "tumor"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "racist"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "reverse racist"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "dick"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "cunt"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "shlong"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "pusscake"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "bitch"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "asswipe"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "douchebag"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "douchenozel"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "bitchface"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "assface"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "pussface"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "peasant"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "pleb"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "skrub"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "dirt off a bubonic rat's cancerous paw"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "weeaboo"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "jap"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "rectangle"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "square"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "motherfucker"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "wanker"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "baby"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "imbecile"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "communist"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "egg"}, function(err, result) {if (err) throw err;});

noun.insert({noun: "whore"}, function(err, result) {if (err) throw err;});

noun.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});