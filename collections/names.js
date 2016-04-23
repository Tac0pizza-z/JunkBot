var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var name = db.collection("name");

name.remove(), function(err,result) {
    if (err) throw err;
    if (result) console.log('Deleted!');
};

name.insert({firstName: "Jack", lastName: "Baldwin"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "John", lastName: "Chiaramonte"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Enrique", lastName: "Colon"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Kieran", lastName: "Emmons"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Christopher", lastName: "Frick"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Edward", lastName: "Jarvis"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Lucas", lastName: "Ludgate"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Matthew", lastName: "Peeks"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Derek", lastName: "Rosario"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Andrew", lastName: "Sullivan"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Jack", lastName: "Tomeo"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Trevor", lastName: "Wertheimer"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Tyler", lastName: "Zorn"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Sean", lastName: "Gallagher"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Michael", lastName: "Becue"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Nevyn", lastName: "Duarte"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Nicholas", lastName: "Dulock"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Justin", lastName: "James"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Alex", lastName: "Manduca"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Frank", lastName: "Matranga"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Patrick", lastName: "Moquin"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Angelo", lastName: "Osofsky"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Frankie", lastName: "Osso"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Liam", lastName: "Quinn"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Giorgio", lastName: "Rahal"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Miguel", lastName: "Ranjo"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Brian", lastName: "Saville"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Jack", lastName: "Sweeney"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "David", lastName: "Bonagura"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Anthony", lastName: "Conti"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Andre", lastName: "Anselme"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Donna", lastName: "Davis"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Kathryn", lastName: "Humora"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Joseph", lastName: "Amatrucola"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Donna", lastName: "Basile"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Jeffery", lastName: "Marcucio"}, function(err, result) {if (err) throw err;});

name.insert({firstName: "Michael", lastName: "Vode"}, function(err, result) {if (err) throw err;});

name.find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
});