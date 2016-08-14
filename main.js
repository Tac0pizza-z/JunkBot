var Discord = require("discord.js");
var bot = new Discord.Client();

//store all the commands from dbcommands.js and quickcommands.js in a variable
var dbcomm = require("./dbcommands");
var qcomm = require("./quickcommands");
//commands start w/ this
var commandPrefix = "?";

function handleCommand(message) {
	
	//text of message
	var content = message.content.trim(); 
		
	//split text using " "  
	var parts = content.split(" ");
	
	//message w/o command name
	var args = parts.slice(1, parts.length);
	
	//just command name
	var command = parts[0].replace(commandPrefix, ""); 
	
	//show what command was done by who in which room, followed by full content of the message
	console.log(command + " command by " + message.author.username + " in room " + message.channel.name + ": '"+content+"'");
	
	//check if command exists
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
	// Check if message is command
	//bot.sendMessage(message.channel, "<@151416613969723392>");
	if(message.content.startsWith(commandPrefix)) {
		handleCommand(message);
		//add one to the use
		usedb.find().toArray(function(err, useArray) {
			if (err) throw err;
			var currentUse = parseInt(useArray[0].use, 10);
			var newUse = currentUse + 1;
			usedb.update({number: 1}, {"$set":{use:newUse}});
		});
	}
});

bot.login("mpeeks18@regis.org", process.argv[2]);