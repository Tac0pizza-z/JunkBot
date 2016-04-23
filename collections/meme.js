var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var meme = db.collection("meme");

meme.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});

/*
meme.remove({meme: "https://images-2.discordapp.net/eyJ1cmwiOiJodHRwczovL3dlYmVpbS5yZWdpcy5vcmcvcGhvdG9zL3JlZ2lzL1N0dWRlbnQvMjAxOTE4MDA4LmpwZyJ9.32AgzXTZ6OP8x9CQ_QC-FXeDCks.jpg?width=200&height=250"}), function(err,result) {
    if (err) throw err;
    if (result) console.log('Deleted!');
};
*/