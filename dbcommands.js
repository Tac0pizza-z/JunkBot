var commands = {};

//make my fuckin databases actually work
var db = require('mongoskin').db('mongodb://localhost:27017/junkbot');

var noundb = db.collection("noun");

var adjdb = db.collection("adj");

var namedb = db.collection("name");

var memedb = db.collection("meme");

var idledb = db.collection("idle");

var battledb = db.collection("battle");

var messdb = db.collection("mess");

var fightdb = db.collection("fight");

var semidb = db.collection("semi");

var usedb = db.collection("use");

var polldb = db.collection("poll");

var classdb = db.collection("class");

//junk and my id numbers
var peeks = 150742441673097217;
var junk = 161233186423177217;

commands.help = function(bot, message, args) {
    var help = [];
    for(var i in commands){
        help.push(i);
    }
    for(var j in qc){
        help.push(j);
    }
    bot.sendMessage(message.channel, "**Command List: **" + help.join(", "));
};
	
commands.addmeme = function(bot, message, args) {
    var meme = args[0];
    if(message.channel.server.name == "Regis Discord"){
        if(meme != undefined && meme.startsWith("https://") && message.channel.name == "memes") {
            memedb.insert({meme: meme}, function (err, memeArray) {
                if (err) throw err;
                bot.sendMessage(message.channel, "Meme Added!");
            });
        }else{
            bot.sendMessage(message.channel, "Not a valid meme. Put ?addmeme and then put the discord link to your picture. Or you tried to use this outside of #memes, which isnt allowed.");
        }
    }else{
        if(meme != undefined && meme.startsWith("https://")) {
            memedb.insert({meme: meme}, function (err, memeArray) {
                if (err) throw err;
                bot.sendMessage(message.channel, "Meme Added!");
            });
        }else{
            bot.sendMessage(message.channel, "Not a valid meme. Put ?addmeme and then put the discord link to your picture.");
        }
    }
};

commands.meme = function(bot, message, args) {
    if(message.channel.server.name == "Regis Discord"){
        if(message.channel.name == "memes"){
            memedb.find().toArray(function(err, memeArray) {
                if (err) throw err;
                var random = Math.floor(Math.random() * memeArray.length);
                var meme = memeArray[random].meme;
                bot.sendMessage(message.channel, meme);
            });
        }else{
            bot.sendMessage(message.channel, "This is only available in #memes");
        }
    }else{
        memedb.find().toArray(function(err, memeArray) {
            if (err) throw err;
            var random = Math.floor(Math.random() * memeArray.length);
            var meme = memeArray[random].meme;
            bot.sendMessage(message.channel, meme);
        });
    }
}

commands.memecount = function(bot, message, args) {
    memedb.find().toArray(function(err, memeArray) {
        if (err) throw err;
        var amount = memeArray.length;
        bot.sendMessage(message.channel, "There are " + amount + " memes in the meme collection");
    });
};

commands.use = function(bot, message, args) {
    usedb.find().toArray(function(err, useArray) {
        if (err) throw err;
        bot.sendMessage(message.channel, "People have used JunkBot commands " + useArray[0].use + " times since 11:30 on 4/17");
    });
};

commands.insult = function(bot, message, args) {
    adjdb.find().toArray(function(err, adjArray) {
        if (err) throw err;
        noundb.find().toArray(function(err, nounArray) {
            if (err) throw err;
            var random1 = Math.floor(Math.random() * adjArray.length);
            var adj = adjArray[random1].adj;
            var random2 = Math.floor(Math.random() * nounArray.length);
            var noun = nounArray[random2].noun;
            var mention = args[0];
            if (mention == undefined) {
                if (adj.charAt(0) == 'a' || adj.charAt(0) == 'e' || adj.charAt(0) == 'i' || adj.charAt(0) == 'o' || adj.charAt(0) == 'u') {
                    bot.sendMessage(message.channel, "You're an " + adj + " " + noun);
                }else{
                    bot.sendMessage(message.channel, "You're a " + adj + " " + noun);
                }
            }else{
                if (mention == "<@161233186423177217>") {
                    if (adj.charAt(0) == 'a' || adj.charAt(0) == 'e' || adj.charAt(0) == 'i' || adj.charAt(0) == 'o' || adj.charAt(0) == 'u') {
                        bot.sendMessage(message.channel, "You're an " + adj + " " + noun + " " + message.author);
                    }else{
                        bot.sendMessage(message.channel, "You're a " + adj + " " + noun + " " + message.author);
                    }
                }else{
                    if (adj.charAt(0) == 'a' || adj.charAt(0) == 'e' || adj.charAt(0) == 'i' || adj.charAt(0) == 'o' || adj.charAt(0) == 'u') {
                        bot.sendMessage(message.channel, "You're an " + adj + " " + noun + " " + mention);
                    }else{
                        bot.sendMessage(message.channel, "You're a " + adj + " " + noun + " " + mention);
                    }
                }
            }
        });
    });
};

commands.name = function(bot, message, args) {
    namedb.find().toArray(function(err, nameArray) {
        if (err) throw err;
        var random1 = Math.floor(Math.random() * nameArray.length);
        var random2 = Math.floor(Math.random() * nameArray.length);
        var firstName = nameArray[random1].firstName;
        var lastName = nameArray[random2].lastName;
        bot.sendMessage(message.channel, firstName + " " + lastName);
    });
};

commands.otp = function(bot, message, args) {
    namedb.find().toArray(function(err, nameArray) {
        if (err) throw err;
        var random1 = Math.floor(Math.random() * nameArray.length);
        var random2 = Math.floor(Math.random() * nameArray.length);
        var firstShip = nameArray[random1].lastName;
        var lastShip = nameArray[random2].lastName;
        bot.sendMessage(message.channel, firstShip + " x " + lastShip);
    });
};

commands.idle = function(bot, message, args) {
    if(message.channel.name != undefined) {
        bot.sendMessage(message.channel, "**?idle** must be dmed to JunkBot.");
    }else{
        var sender = message.author.id;
        idledb.findOne ({name: sender}, function(err, user) {
            if (err) throw err;
            if(isNaN(user)) {
                var currentIdle = parseInt(user.value, 10);
                var newIdle = currentIdle + 1;
                idledb.update({name: sender},{"$set":{value:[newIdle]}});
                bot.sendMessage(message.channel, "You now have " + user.value);
            }else{
                idledb.insert({name: sender, value: 1}, function (err, inserted) {
                    if (err) throw err;
                    bot.sendMessage(message.channel, "You are now on the idle leaderboards! Your idle count is now at 0");
                });
            }
        });
    }
};

commands.leaderboard = function(bot, message, args) {
    idledb.find().toArray(function(err, idleArray) {
        if (err) throw err;
        var leaderboardArray = [];
        for(var i = 0; i < idleArray.length; i++){
            leaderboardArray.push("<@" + idleArray[i].name + "> with an idle count of " + (idleArray[i].value - 1));
        }
        leaderboardArray.sort(idleArray.value);
        bot.sendMessage(message.channel, "**The Idle Leaderboard**:\n" + leaderboardArray.join("\n"));
    });
};

commands.joinbattle = function(bot, message, args) {
    var sender = message.author.id;
    battledb.findOne ({name: sender}, function(err, user) {
        if (err) throw err;
        if(isNaN(user)) {
            bot.sendMessage(message.channel, "You are already registered. Your battlecount is currently " + user.battleCount);
        }else{
            battledb.insert({name: sender, battleCount: 50}, function (err, inserted) {
                if (err) throw err;
                bot.sendMessage(message.channel, "You can now battle other users! Your battle count has been set to 50 (the default)");
            });
        }
    });
};

//array of pending battles
var pendingBattles = [];

commands.battle = function(bot, message, args) {
    //set vars for challenger and challenged
    var sender = message.author.id;
    var receiver2 = args[0];
    if (message.mentions.length == 0 || !receiver2.startsWith("<@") || sender == receiver) {
        //person doesn't mention anyone
        bot.sendMessage(message.channel, "You need to tag someone to challenge someone or accept a challenge. Ex: **?battle @JunkBot**. Or you challenged yourself.");
    }else{
        var receiver1 = receiver2.replace("<@", "");
        var receiver = receiver1.replace(">", "");
        //see if battle was used to challenge or accept
        var challengeAccepted = false;
        for (var i = 0; i < pendingBattles.length; i++) {
            if(pendingBattles[i].receiver == sender && pendingBattles[i].sender == receiver) {
                challengeAccepted = true;
            }
        }
        if(!challengeAccepted) {
            //?battle was used to challenge someone else
            battledb.findOne ({name: sender}, function(err, senderProperty) {
                if (err) throw err;
                //check the challenger is a registered battler
                if (isNaN(senderProperty)) {
                    battledb.findOne ({name: receiver}, function(err, receiverProperty) {
                        if (err) throw err;
                        //check if the receipient is a registered battler
                        if (isNaN(receiverProperty)) {
                            //successful challenge
                            bot.sendMessage(message.channel, "You have challenged " + receiver2 + " to a battle. He can accept it by challenging you to a battle or decline it with **?decline**.");
                            //put both names in pending battle for later use
                            var battle = {sender: sender, receiver: receiver};
                            pendingBattles.push(battle);
                        }else{
                            bot.sendMessage(message.channel, receiver2 + " has not yet registered with **?joinbattle**");
                        }
                    });
                }else{
                    bot.sendMessage(message.channel, "You haven't registered with **?joinbattle**");
                }
            });
        }else{
            //?battle was used to accept a challenge
            battledb.findOne ({name: sender}, function(err, senderProperty) {
                if (err) throw err;
                battledb.findOne ({name: receiver}, function(err, receiverProperty) {
                    if (err) throw err;
                    var senderBatCount = parseInt(senderProperty.battleCount, 10);
                    var sendNum = Math.random() * senderBatCount;
                    var receiverBatCount = parseInt(receiverProperty.battleCount, 10);
                    var recNum = Math.random() * receiverBatCount;
                    if(sendNum > recNum) {
                        var sendNewBatCount = senderBatCount + 5;
                        var recNewBatCount = receiverBatCount - 5;
                        battledb.update({name: sender},{"$set":{battleCount:[sendNewBatCount]}});
                        battledb.update({name: receiver},{"$set":{battleCount:[recNewBatCount]}});
                        bot.sendMessage(message.channel, "<@" + sender + "> wins! Your battle count is now " + sendNewBatCount + " and " + receiver2 + "'s battle count is now at " + recNewBatCount);
                    }else if (sendNum < recNum) {
                        var sendNewBatCount = senderBatCount - 5;
                        var recNewBatCount = receiverBatCount + 5;
                        battledb.update({name: sender},{"$set":{battleCount:[sendNewBatCount]}});
                        battledb.update({name: receiver},{"$set":{battleCount:[recNewBatCount]}});
                        bot.sendMessage(message.channel, receiver2 + " wins! Your battle count is now " + recNewBatCount + " and <@" + sender + ">'s battle count is now at " + sendNewBatCount);
                    }else{
                        bot.sendMessage(message.channel, "I broke");
                    }
                    var removeFromPendBat = pendingBattles.indexOf(receiver.sender);
                    pendingBattles.splice(removeFromPendBat);
                });
            });
        }
    }
};

commands.increasemess = function(bot, message, args) {
    var mess = args.join(" ");
    if(message.channel.server.name == "Regis Discord"){
        if(args[0] != undefined && message.channel.name == "memes") {
            messdb.insert({mess: mess}, function (err, messArray) {
                if (err) throw err;
                bot.sendMessage(message.channel, "Mess increased");
            });
        }else{
            bot.sendMessage(message.channel, "You can't add nothing to the mess. Or you did this outside of #memes, which isn't allowed.");
        }
    }else{
        if(mess != undefined) {
            messdb.insert({mess: mess}, function (err, memeArray) {
                if (err) throw err;
                bot.sendMessage(message.channel, "Mess increased");
            });
        }else{
            bot.sendMessage(message.channel, "You can't add nothing to the mess");
        }
    }
};

commands.mess = function(bot, message, args) {
    if(message.channel.server.name == "Regis Discord"){
        if(message.channel.name == "memes"){
            messdb.find().toArray(function(err, messArray) {
                if (err) throw err;
                var random = Math.floor(Math.random() * messArray.length);
                var mess = messArray[random].mess;
                bot.sendMessage(message.channel, mess);
            });
        }else{
            bot.sendMessage(message.channel, "This is only available in #memes");
        }
    }else{
        messdb.find().toArray(function(err, messArray) {
            if (err) throw err;
            var random = Math.floor(Math.random() * messArray.length);
            var mess = messArray[random].mess;
            bot.sendMessage(message.channel, mess);
        });
    }
};

commands.messiness = function(bot, message, args) {
    messdb.find().toArray(function(err, messArray) {
        if (err) throw err;
        var amount = messArray.length;
        bot.sendMessage(message.channel, "There are " + amount + " strings in the mess collection.");
    });
};

commands.respec = function(bot, message, args) {
    var sender = message.author.id;
    function effhealth (points) {
        var healthStat = points * 2 + 20;
        fightdb.update({name: sender},{"$set":{health:[healthStat]}});
    }
    function effdefense (points) {
        if(points < 10) {
            var defStat = points * 2;
            fightdb.update({name: sender},{"$set":{defense:[defStat]}});
        }else{
            var defStat = points + 10;
            fightdb.update({name: sender},{"$set":{defense:[defStat]}});
        }
    }
    function effattack (points) {
        var attackStat = points + 10;
        fightdb.update({name: sender},{"$set":{attack:[attackStat]}});
    }
    function effspeed (points) {
        var speedStat = points + 10;
        fightdb.update({name: sender},{"$set":{speed:[speedStat]}});
    }
    function effluck (points) {
        var luckStat = Math.floor(points * 1.7 + 15);
        fightdb.update({name: sender},{"$set":{luck:[luckStat]}});
    }
    if(args[0] == "random" || args[0] == "rand") {
        var healthSpec = 0;
        var defenseSpec = 0;
        var attackSpec = 0;
        var speedSpec = 0;
        var luckSpec = 0;
        for(var i = 0; i < 50; i++) {
            var stat = Math.floor(Math.random() * 5);
            switch(stat) {
                case 0:
                    healthSpec++;
                    break;
                case 1:
                    defenseSpec++;
                    break;
                case 2:
                    attackSpec++;
                    break;
                case 3:
                    speedSpec++;
                    break;
                case 4:
                    luckSpec++;
                    break;
            }
        }
        effhealth(healthSpec);
        effdefense(defenseSpec);
        effattack(attackSpec);
        effspeed(speedSpec);
        effluck(luckSpec);
        bot.sendMessage(message.channel, "You successfully respecialized");
    }else if (args[0] != undefined && args[1] != undefined && args[2] != undefined && args[3] != undefined) {
        var healthSpec = parseInt(args[0], 10);
        var defenseSpec = parseInt(args[1], 10);
        var attackSpec = parseInt(args[2], 10);
        var speedSpec = parseInt(args[3], 10);
        var luckSpec = parseInt(args[4], 10);
        if (healthSpec + defenseSpec + attackSpec + speedSpec + luckSpec == 50) {
            effhealth(healthSpec);
            effdefense(defenseSpec);
            effattack(attackSpec);
            effspeed(speedSpec);
            effluck(luckSpec);
            bot.sendMessage(message.channel, "You successfully respecialized");
        }else{
            bot.sendMessage(message.channel, "Either your stats did not add up to 50 or you did not put in 5 numbers.");
        }
    }else{
        bot.sendMessage(message.channel, "To set your stats, you have to put in 5 numbers that add up to fifty. These are your stats. In order, the numbers represent: health, defense, attack, speed, and luck. You can also use **?respec random** to randomize your stats.");
    }
};

commands.specs = function(bot, message, args) {
    var sender = message.author.id;
    if(message.mentions.length == 0) {
        fightdb.findOne ({name: sender}, function(err, fighter) {
            if (err) throw err;
            if(!isNaN(fighter)) {
                bot.sendMessage(message.channel, "You never specialized. Use **?respec** to put stats on your fighter");
            }else{
                bot.sendMessage(message.channel, "You have :\n" + fighter.health + " hitpoints\n" + fighter.defense + " defense\n" + fighter.attack + " attack\n" + fighter.speed + " speed\n" + fighter.luck + " luck");
            }
        });
    }else{
        var spectated = message.mentions[0].id;
        fightdb.findOne ({name: spectated}, function(err, fighter) {
            if (err) throw err;
            if(!isNaN(fighter)) {
                bot.sendMessage(message.channel, "He never specialized. Use **?respec** to put stats on your fighter");
            }else{
                bot.sendMessage(message.channel, "He has :\n" + fighter.health + " hitpoints\n" + fighter.defense + " defense\n" + fighter.attack + " attack\n" + fighter.speed + " speed\n" + fighter.luck + " luck");
            }
        });
    }
};

var pendingFights = [];

commands.fight = function(bot, message, args) {
    var sender = message.author.id;
    var receiver2 = args[0];
    if (message.mentions.length == 0 || !receiver2.startsWith("<@")) {
        //person doesn't mention anyone
        bot.sendMessage(message.channel, "You need to tag someone to challenge someone or accept a challenge. Ex: **?fight @JunkBot**. Or you challenged yourself.");
    }else{
        var receiver1 = receiver2.replace("<@", "");
        var receiver = receiver1.replace(">", "");
        //see if battle was used to challenge or accept
        var challengeAccepted = false;
        for (var i = 0; i < pendingFights.length; i++) {
            if(pendingFights[i].receiver == sender && pendingFights[i].sender == receiver) {
                challengeAccepted = true;
            }
        }
        if(!challengeAccepted) {
            //?fight was used to challenge someone else
            fightdb.findOne ({name: sender}, function(err, senderProperty) {
                if (err) throw err;
                //check the challenger is a registered fighter
                if (isNaN(senderProperty)) {
                    fightdb.findOne ({name: receiver}, function(err, receiverProperty) {
                        if (err) throw err;
                        //check if the receipient is a registered fight
                        if (isNaN(receiverProperty)) {
                            //successful challenge
                            bot.sendMessage(message.channel, "You have challenged " + receiver2 + " to a fight. He can accept it by challenging you to a fight or decline it with **?decline**.");
                            //put both names in pending battle for later use
                            var fight = {sender: sender, receiver: receiver};
                            pendingFights.push(fight);
                        }else{
                            bot.sendMessage(message.channel, receiver2 + " has not yet registered with **?respec**");
                        }
                    });
                }else{
                    bot.sendMessage(message.channel, "You haven't specialized your character with **?respec**");
                }
            });
        }else{
            //?battle was used to accept a challenge
            fightdb.findOne ({name: sender}, function(err, senderProperty) {
                if (err) throw err;
                fightdb.findOne ({name: receiver}, function(err, receiverProperty) {
                    if (err) throw err;
                    var faster = 0;
                    var slower = 0;
                    var speedLoop = 0;
                    var fightList = [];
                    if(senderProperty.speed > receiverProperty.speed) {
                        speedLoop = Math.floor(senderProperty.speed / receiverProperty.speed);
                        faster = senderProperty;
                        slower = receiverProperty;
                    }else if (senderProperty.speed < receiverProperty.speed) {
                        speedLoop = Math.floor(receiverProperty.speed / senderProperty.speed);
                        faster = receiverProperty;
                        slower = senderProperty;
                    }else{
                        speedLoop = 1;
                        var decider = Math.random();
                        if (decider < .5) {
                            faster = receiverProperty;
                            slower = senderProperty;
                        }else{
                            faster = senderProperty;
                            slower = receiverProperty;
                        }
                    }
                    if(speedLoop > 3)
                        speedLoop = 3;
                    function fight (attacker, defender) {
                        var evade = false;
                        var evadeChance = Math.random() * 100;
                        var effectiveSpeed = parseInt(defender.speed, 10);
                        if((effectiveSpeed / 2) > evadeChance)
                            evade = true;
                        if(evade) {
                            fightList.push("<@" + attacker.name + "> attacked, but <@" + defender.name + "> avoided the attack!");
                        }else{
                            var plusOrMinus = false;
                            if(Math.random() < .5)
                                plusOrMinus = true;
                            var att = parseInt(attacker.attack, 10);
                            var damage = 0;
                            var pM = Math.floor(Math.random() * 4);
                            if(plusOrMinus) {
                                damage = (att + pM * (1 - (defender.defense / 100)));
                            }else{
                                damage = (att - pM * (1 - (defender.defense / 100)));
                            }
                            var crit = false;
                            var critChance = Math.random() * 100;
                            if (critChance <= attacker.luck) {
                                crit = true;
                            }
                            if(crit)
                                damage *= (attacker.luck / 10);
                            defender.health -= damage;
                            if(!crit) {
                                fightList.push("<@" + attacker.name + "> did " + damage + " damage! <@" + defender.name + "> has " + defender.health + " health remaining.");
                            }else{
                                fightList.push("Critical hit! <@" + attacker.name + "> did " + damage + " damage! <@" + defender.name + "> has " + defender.health + " remaining.");
                            }
                        }
                    }
                    for (var i = 0; i < 20; i++){
                        for(var j = 0; j < speedLoop; j++) {
                            fight(faster, slower);
                        }
                        if(slower.health <= 0){
                                bot.sendMessage(message.channel, "<@" + faster.name + "> wins");
                                break;
                        }else{
                            fight(slower, faster);
                            if(faster.health <= 0) {
                                bot.sendMessage(message.channel, "<@" + slower.name + "> wins");
                                break;
                            }
                        }
                    }
                    bot.sendMessage(message.channel, fightList.join("\n"));
                    var removeFromPendFight = pendingFights.indexOf(receiver.sender);
                    pendingFights.splice(removeFromPendFight);
                });
            });
        }
    }
};

commands.addsemi = function(bot, message, args) {
    var sender = message.author.id;
    var date = args[0];
    if (date == undefined || !date.startsWith("https://")) {
        bot.sendMessage(message.channel, "Please put a picture of your semi date. Note: This picture will be accessable to everyone.");
    }else{
        semidb.findOne({name: sender},function (err, semiDate) {
            if (err) throw err;
            if(!isNaN(semiDate)){
                semidb.insert({name: sender}, {date: date}, function (err, dateArray) {
                    if (err) throw err;
                    bot.sendMessage(message.channel, "You uploaded a semi date! Now people can use ?semi and tag you to see your date.");
                });
            }else{
                semidb.update({name: sender},{"$set":{date:[date]}});
                bot.sendMessage(message.channel, "You updated your date!");
            }
        });
    }
};

commands.semi = function(bot, message, args){
    if(args.length == 0){
        bot.sendMessage(message.channel, "Tag someone to see their semi date. Ex: **?semi @JunkBot**");
    }else{
        var ladysMan1 = args[0].replace("<@", "");
        var ladysMan = ladysMan1.replace(">", "");
        semidb.findOne({name: ladysMan},function (err, semidate) {
            if (err) throw err;
            if(!isNaN(semidate)){
                bot.sendMessage(message.channel, "This person has not uploaded their semi date.");
            }else{
                bot.sendMessage(message.channel, semidate.date);
            }
        });
    }
};

var pendingShootouts = [];
var validShot = false;
var contShootout = true;

commands.shootout = function(bot, message, args) {
    var sender = message.author.id;
    var receiver2 = args[0];
    if (message.mentions.length == 0 || !receiver2.startsWith("<@")) {
        //person doesn't mention anyone
        bot.sendMessage(message.channel, "You need to tag someone to challenge someone or accept a challenge. Ex: **?shootout @JunkBot**. Or you challenged yourself.");
    }else{
        var receiver1 = receiver2.replace("<@", "");
        var receiver = receiver1.replace(">", "");
        //see if battle was used to challenge or accept
        var challengeAccepted = false;
        for (var i = 0; i < pendingShootouts.length; i++) {
            if(pendingShootouts[i].receiver == sender && pendingShootouts[i].sender == receiver) {
                challengeAccepted = true;
            }
        }
        if(!challengeAccepted) {
            var shootout = {sender: sender, receiver: receiver};
            pendingShootouts.push(shootout);
            bot.sendMessage(message.channel, "You have challenged " + receiver2 + " to a shootout. He can accept it by challenging you to a shootout or decline it with **?decline**.");
        }else{
            bot.sendMessage(message.channel, "Shootout started");
            if(contShootout) {
                setTimeout(function() {
                    bot.sendMessage(message.channel, "3");
                    if(contShootout) {
                        setTimeout(function() {
                            bot.sendMessage(message.channel, "2");
                            if(contShootout) {
                                setTimeout(function() {
                                    bot.sendMessage(message.channel, "1");
                                    if(contShootout){
                                        setTimeout(function() {
                                            bot.sendMessage(message.channel, "Draw!");
                                            validShot = true;
                                        }, ((Math.random() * 10) * 1000));
                                    }
                                }, (2000));
                            }
                        }, (2000));
                    }
                }, (2000));
            }
        }
    }
};

commands.shoot = function(bot, message, args) {
    var sender = message.author.id;
    var prematureShot = false;
    for(var i = 0; i < pendingShootouts.length; i++) {
        if(pendingShootouts[i].sender == sender || pendingShootouts[i].receiver == sender)
            prematureShot = true;
    }
    if(validShot) {
        bot.sendMessage(message.channel, "<@" + sender + "> shot first! He wins!");
        var removeFromPendShoot = pendingShootouts.indexOf(sender.sender);
        pendingShootouts.splice(removeFromPendShoot);
        validShot = false;
    }else if(prematureShot) {
        bot.sendMessage(message.channel, "<@" + sender + "> shot prematurely. He loses!");
        var removeFromPendShoot = pendingShootouts.indexOf(sender.sender);
        pendingShootouts.splice(removeFromPendShoot);
        validShot = false;
        contShootout = false;
    }else{
        bot.sendMessage(message.channel, "<@" + sender + "> shot for no reason. Good job.");
    }
};

var pendingTTT = [];
var gameStart = false;
var turn;
var gameBoard = [{symbol: "   ", occupied: false, row: 1, column: 1}, {symbol: "   ", occupied: false, row: 1, column: 2}, {symbol: "   ", occupied: false, row: 1, column: 3}, {symbol: "   ", occupied: false, row: 2, column: 1}, {symbol: "   ", occupied: false, row: 2, column: 2}, {symbol: "   ", occupied: false,  row: 2, column: 3}, {symbol: "   ", occupied: false, row: 3, column: 1}, {symbol: "   ", occupied: false,  row: 3, column: 2}, {symbol: "   ", occupied: false,  row: 3, column: 3}];
var symb = "X";

commands.tictactoe = function(bot, message, args) {
    var sender = message.author.id;
    var receiver2 = args[0];
    if (message.mentions.length == 0 || !receiver2.startsWith("<@") || sender == receiver) {
        //person doesn't mention anyone
        bot.sendMessage(message.channel, "You need to tag someone to challenge someone or accept a challenge. Ex: **?tictactoe @JunkBot**. Or you challenged yourself.");
    }else{
        var receiver1 = receiver2.replace("<@", "");
        var receiver = receiver1.replace(">", "");
        //see if ?tic was used to challenge or accept
        var challengeAccepted = false;
        for (var i = 0; i < pendingTTT.length; i++) {
            if(pendingTTT[i].receiver == sender && pendingTTT[i].sender == receiver) {
                challengeAccepted = true;
            }
        }
        if(!challengeAccepted) {
            var TTT = {sender: sender, receiver: receiver};
            pendingTTT.push(TTT);
            bot.sendMessage(message.channel, "You have challenged " + receiver2 + " to Tic Tac Toe. He can accept it by challenging you to a game or decline it with **?decline**.");
        }else if(gameStart){
            bot.sendMessage(message.channel, "There is currently a game going on. Once the game is over you can accept the challenge.");
        }else{
            gameStart = true;
            turn = receiver;
            bot.sendMessage(message.channel, "Game initiated. " + receiver2 + ", it is your turn. Use **?place** followed by two numbers to place your X. The two numbers represent how far right and then how far down you want to place your piece, starting from **1 1**, which would put your piece in the top left corner.");
        }
    }
};

commands.place = function(bot, message, args) {
    var sender = message.author.id;
    var position = [args[0], args[1]];
    var occupiedBox = false;
    for(var i = 0; i < gameBoard.length; i++) {
        if(gameBoard[i].occupied && gameBoard[i].column == position[0] && gameBoard[i].row == position[1]) {
            occupiedBox = true;
            break;
        }
    }
    if(!gameStart) {
        bot.sendMessage(message.channel, "There is currently no game of Tic Tac Toe being played. Use **?tictactoe** followed by a mention to challenge someone.");
    }else if(sender != turn) {
        bot.sendMessage(message.channel, "It isn't your turn.");
    }else if(args.length != 2 || !(parseInt(position[0], 10) < 4) || !(parseInt(position[1], 10) < 4) || !(parseInt(position[0], 10) > 0) || !(parseInt(position[1], 10) > 0)) {
        bot.sendMessage(message.channel, "You did not enter two numbers that are less than 3");
    }else if(occupiedBox){
        bot.sendMessage(message.channel, "That spot is occupied.");
    }else{
        for(var j = 0; j < gameBoard.length; j++) {
            if(position[0] == gameBoard[j].column && position[1] == gameBoard[j].row) {
                gameBoard[j].symbol = symb;
                gameBoard[j].occupied = true;
            }
        }
        var win = false;
        if(gameBoard[0].symbol != "   ") {
            if((gameBoard[0].symbol == gameBoard[1].symbol && gameBoard[2].symbol == gameBoard[1].symbol) || (gameBoard[0].symbol == gameBoard[3].symbol && gameBoard[3].symbol == gameBoard[6].symbol) || (gameBoard[0].symbol == gameBoard[4].symbol && gameBoard[4].symbol == gameBoard[8].symbol))
                win = true;
        }
        if(gameBoard[2].symbol != "   ") {
            if((gameBoard[2].symbol == gameBoard[5].symbol && gameBoard[5].symbol == gameBoard[8].symbol) || (gameBoard[2].symbol == gameBoard[4].symbol && gameBoard[4].symbol == gameBoard[6].symbol))
                win = true;
        }
        if(gameBoard[2].symbol != "   ") {
            if(gameBoard[2].symbol == gameBoard[5].symbol && gameBoard[5].symbol == gameBoard[7].symbol)
                win = true;
        }
        if(gameBoard[3].symbol != "   ") {
            if(gameBoard[3].symbol == gameBoard[4].symbol && gameBoard[4].symbol == gameBoard[5].symbol)
                win = true;
        }
        if(gameBoard[6].symbol != "   ") {
            if(gameBoard[6].symbol == gameBoard[7].symbol && gameBoard[7].symbol == gameBoard[8].symbol)
                win = true;
        }
        if(gameBoard[1].symbol != "   ") {
            if(gameBoard[1].symbol == gameBoard[4].symbol && gameBoard[4].symbol == gameBoard[7].symbol)
                win = true;
        }
        var tie = true;
        for(var k = 0; k < gameBoard.length; k++) {
            if(gameBoard[k].symbol == "   ") {
                tie = false;
                break;
            }
        }
        var currentBoard = "|" + gameBoard[0].symbol + "|" + gameBoard[1].symbol + "|" + gameBoard[2].symbol + "|\n|" + gameBoard[3].symbol + "|" + gameBoard[4].symbol + "|" + gameBoard[5].symbol + "|\n|" + gameBoard[6].symbol + "|" + gameBoard[7].symbol + "|" + gameBoard[8].symbol + "|";
        if(win) {
            bot.sendMessage(message.channel, currentBoard + "\n <@" + turn + "> wins!");
            gameStart = false;
        }else if(tie){
            bot.sendMessage(message.channel, currentBoard + "\n It's a tie");
            gameStart = false;
        }else{
            
        }
        if(turn == pendingTTT[0].sender) {
            turn = pendingTTT[0].receiver;
        }else{
            turn = pendingTTT[0].sender;
        }
        if(symb == "X") {
            symb = "O";
        }else{
            symb = "X";
        }
        
    }
};

commands.decline = function(bot, message, args){
    var sender = message.author.id;
    var removeFromPendBat = pendingBattles.indexOf(sender);
    pendingBattles.splice(removeFromPendBat);
    var removeFromPendFight = pendingFights.indexOf(sender);
    pendingFights.splice(removeFromPendFight);
    var removeFromPendShoot = pendingShootouts.indexOf(sender);
    pendingShootouts.splice(removeFromPendShoot);
    var removeFromTTT = pendingTTT.indexOf(sender);
    pendingTTT.splice(removeFromTTT);
    bot.sendMessage(message.channel, "You have successfully declined all challenges sent to you");
};

/*
commands.startpoll = function(bot, message, args) {
    if(args[0] != undefined && !isNaN(args[0]) && parseInt(args[0], 10) > 0 && parseInt(args[0], 10) <= 5){
        bot.sendMessage(message.channel, "A poll has now begun! Use **?pollresults** followed by the name of the poll for the results.");
        var pollStarter = message.sender.id;
        polldb.insert({name: args[1], sender: pollStarter}, function(err, result) {if (err) throw err;});
        for(var i = 0; i < args[0]; i++){
            var optNumber = i + 1;
            var insertedOpt = "Option " + optNumber;
            
        }
    }else{
        bot.sendMessage(message.channel, "Please put the number of options you would like the poll to have, then a one word name for the poll, then a description of the poll if you would like.");
    }
};

commands.vote = function(bot, message, args) {
    var sender = message.author.id;
    var repeatVote = false;
    var vote;
    if(args[0] != undefined) {
        vote = parseInt(args[0], 10) - 1;
    }else{
        vote = -10;
    }
    for(var i = 0; i < alreadyVoted.length; i++) {
        if (alreadyVoted[i].voter == sender)
            repeatVote = true;
    }
    if(!currentPoll) {
        bot.sendMessage(message.channel, "There is no poll currently going on");
    }else if(message.channel.name != undefined){
        bot.sendMessage(message.channel, "You must dm JunkBot to vote");
    }else if(!isNaN(vote) || vote > options.length){
        bot.sendMessage(message.channel, "Pick which option you would like to vote for.");
    }else if(!repeatVote){
        bot.sendMessage(message.channel, "You voted for option " + (vote + 1));
        alreadyVoted.push({voter: sender, vote: vote});
        options[vote]++;
    }else{
        bot.sendMessage(message.channel, "You changed your vote to option " + (vote + 1));
        //alreadyVoted.splice({voter: );
        var prevVote = 0;
        for(var j = 0; j < alreadyVoted.length; j++) {
            if (alreadyVoted[j].voter == sender) {
                prevVote = alreadyVoted[j].vote;
                break;
            }
        }
        options[prevVote]--;
        options[vote]++;
    }
};

commands.endpoll = function(bot, message, args) {
    var sender = message.author.id;
    if(sender == pollStarter || sender == peeks) {
        var pollResults = [];
        for(var i = 0; i < options.length; i++) {
            if(options[i] > 0)
               pollResults.push("Option " + (i + 1) + " got " + options[i] + " votes");
        }
        if(pollResults.length == 0) {
            bot.sendMessage(message.channel, "No one voted in this poll");
            currentPoll = false;
        }else{
            bot.sendMessage(message.channel, pollResults.join("\n"));
            currentPoll = false;
        }
    }
};
*/

commands.schedule = function(bot, message, args){
    var request = args[0];
    var change = args[1];
    var schedule = args.slice(2, args.length);
    var sender = message.author.id;
    classdb.findOne({name: sender}, function(err, user) {
        if (err) throw err;
        if(isNaN(user)) {
            if(request == undefined){
                bot.sendMessage(message.channel, "Please put a command after using **?schedule**. Use **?schedule A** to see the schedule you inserted for A day. Use **?schedule change A** to insert or update your A day schedule. This applies to all the letter days as well.");
            }else if(request == "change") {
                if(change == undefined) {
                    bot.sendMessage(message.channel, "Please put what day you would like to change followed by your schedule. Ex: **?schedule change A** followed by your schedule will set or change your A day schedule. The same applies to the rest of the letter days.");
                }else{
                    if(schedule.length == 0) {
                        bot.sendMessage(message.channel, "Please put your schedule after the command to update it. Make sure the schedule is on the same line as the command.");
                    }else{
                        var realDay = true;
                        switch(change) {
                            case "A":
                                classdb.update({name: sender},{"$set":{hasA:[true]}});
                                classdb.update({name: sender},{"$set":{A:[schedule.join(" ")]}});
                                break;
                            case "B":
                                classdb.update({name: sender},{"$set":{hasB:[true]}});
                                classdb.update({name: sender},{"$set":{B:[schedule.join(" ")]}});
                                break;
                            case "C":
                                classdb.update({name: sender},{"$set":{hasC:[true]}});
                                classdb.update({name: sender},{"$set":{C:[schedule.join(" ")]}});
                                break;
                            case "D":
                                classdb.update({name: sender},{"$set":{hasD:[true]}});
                                classdb.update({name: sender},{"$set":{D:[schedule.join(" ")]}});
                                break;
                            case "E":
                                classdb.update({name: sender},{"$set":{hasE:[true]}});
                                classdb.update({name: sender},{"$set":{E:[schedule.join(" ")]}});
                                break;
                            default:
                                realDay = false;
                                break;
                        }
                        if(realDay) {
                            bot.sendMessage(message.channel, "Schedule updated!");
                        }else{
                            bot.sendMessage(message.channel, "You did not insert a valid letter day. Please put **?schedule change A** followed by your schedule.");
                        }
                    }
                }
            }else{
                classdb.findOne({name: sender}, function(err, asker) {
                    if (err) throw err;
                    var letter = true;
                    var check;
                    var day;
                    switch(request) {
                        case "A":
                            check = asker.hasA;
                            day = asker.A;
                            break;
                        case "B":
                            check = asker.hasB;
                            day = asker.B;
                            break;
                        case "C":
                            check = asker.hasC;
                            day = asker.C;
                            break;
                        case "D":
                            check = asker.hasD;
                            day = asker.D;
                            break;
                        case "E":
                            check = asker.hasE;
                            day = asker.E;
                            break;
                        default:
                            letter = false;
                    }
                    if(letter) {
                        if(check) {
                            bot.sendMessage(message.channel, "Your " + request + " day schedule is: \n" + day);
                        }else{
                            bot.sendMessage(message.channel, "You have not yet set your classes for " + request + " day. Use **?schedule change A** followed by your schedule to set your A day schedule.");
                        }
                    }else{
                        bot.sendMessage(message.channel, "You did not enter a valid letter day. Please use **?schedule A** to see your A day schedule. The same applies to the rest of the letter days.");
                    }
                });
            }
        }else{
            classdb.insert({name: sender, hasA: false, hasB: false, hasC: false, hasD: false, hasE: false, A: "nothing", B: "nothing", C: "nothing", D: "nothing", E: "nothing"}, function (err, inserted) {
                if (err) throw err;
                bot.sendMessage(message.channel, "You can now use **?schedule**. Use **?schedule change** to set your classes. For example, **?schedule change A** will allow you to insert your classes for A day.");
            });
        }
    });
};

//commands.impquiz

module.exports = commands;