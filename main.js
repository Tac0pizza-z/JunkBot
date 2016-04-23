var Discord = require("discord.js");
var bot = new Discord.Client();

// Store all the commands from commands.js in a variable
var dbcomm = require("./dbcommands");
var qcomm = require("./quickcommands");
// Prefix that all commands must start with
var commandPrefix = "?";

function handleCommand(message) {
	
	// Easy access to text of the message
	var content = message.content.trim(); 
		
	// Split up the text of the message by " "  
	var parts = content.split(" ");
	
	// Get rid of the first part (the command name)
	var args = parts.slice(1, parts.length);
	
	// Take the first part (the command name)
	var command = parts[0].replace(commandPrefix, ""); 
	
	console.log(command + " command by " + message.author.username + " in room " + message.channel.name + ": '"+content+"'");
	
	// See if a function for this command exists in the command object (from commands.js)
	if(dbcomm[command] != undefined){
		dbcomm[command](bot, message, args);
	}else if(qcomm[command] != undefined){
		qcomm[command](bot, message, args);
	}
}

//make ?use work
var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');
var usedb = db.collection("use");

bot.on("message", function(message) {
	// Check if message is command and wasnt by becue
	if(message.content.startsWith(commandPrefix) && message.author.id != 151388660007305216) {
		handleCommand(message);
		usedb.find().toArray(function(err, useArray) {
			if (err) throw err;
			var currentUse = parseInt(useArray[0].use, 10);
			var newUse = currentUse + 1;
			usedb.update({number: 1}, {"$set":{use:newUse}});
		});
	}
});

bot.login("mpeeks18@regis.org", process.argv[2]);