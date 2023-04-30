var startTime = new Date();
var ttemp = new Date();
var activitySubtexts = ["Error: failed to load activitySubtexts"];
console.log(`  \x1b[36mLoading cinnamon (node.js) v0.3.56 for discord...`);
console.log(`      initializing...`);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!REMEMBER TO UPDATE VERSION BEFORE RUNNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//imports
console.log(`      loading modules...`);
	const Discord = require("discord.js");
		console.log(`          \x1b[96mdiscord.js loaded successfully`);
	const fs = require('fs');
		console.log(`          fs loaded successfully`);
	const path = require('path');
		console.log(`          path loaded successfully`);
		
//grab those files!
console.log(`      \x1b[36mgetting configuration...`);
	const config = require("./config.json");
	const list = require("./lists.json");
//shorten "Discord.Client()" to "client"
	const client = new Discord.Client();

//def functions
//set activity
function randomActivity(){
	if (config.customActivitySubtextsOverride === "false"){
		activitySubtexts = list.activitySubtexts.concat([config.customActivitySubtexts]).concat('A massive '+client.users.size+' person orgy!').concat('Banging '+client.users.size+' people at once!');
	}else{
		activitySubtexts = config.customActivitySubtexts;
	};
	client.user.setActivity(activitySubtexts[(Math.floor(Math.random() * (activitySubtexts.length)))]);
};
//log function
function logMeLikeOneOfYourFrenchGirls(message){
	//if dm
	if (message.guild === null){
		console.log(`\x1b[95m${message.author} \x1b[0msent me a DM!`);
	//if not dm
	}else{
		//log member color
		console.log("\x1b[95msender display color:\x1b[96m "+message.guild.member(message.author).displayHexColor);
		//log member avatar url
		console.log("\x1b[95msender pfp url:\x1b[96m "+message.author.avatarURL);
		//attempt to make new log file if it does not exists
		fs.mkdir(path.join(__dirname, '.', 'logs', `${message.guild.name}`), function(err) {
			if (err) {
				if (err.code == 'EEXIST'){
					//if the file already exists, just write to it
					fs.appendFile(path.join(__dirname, '.', 'logs', `${message.guild.name}`, `${message.channel.name}.txt`), `\r\n${String(["LogVer1", new Date(), message.author.username, message.guild.member(message.author).displayName, message.content])}`, 'utf8', function (err) {
					if (err) throw err;
						console.log("    \x1b[95mLogged to file!\n");
					});
				}
				else {throw err};
			}else{
				//if the file doesn't exist, create it, then write to it.
				fs.writeFile(path.join(__dirname, '.', 'logs', `${message.guild.name}`, `${message.channel.name}.txt`), String(["LogVer1", new Date(), message.author.username, message.guild.member(message.author).displayName, message.content]), 'utf8', function (err) {
				if (err) throw err;
				console.log(`\n    \x1b[96mCreated directory ./logs/${message.guild.name}\n    logged to file!\n`);
				});
			}; // successfully logged to file, hopefully.
		});
	}
};

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//run this when cinnamon initializes
client.on("ready", () => {
	console.log("\x1b[96m          took " + ((new Date() - ttemp)) + `ms\n\x1b[0m`)
	console.log(`  \x1b[95mCinnamon started in \x1b[96m` + ((new Date() - startTime)/1000) + ` seconds!\x1b[95m Currently being big brother to \x1b[96m${client.users.size}\x1b[95m people in \x1b[96m${client.channels.size} \x1b[95mchannels in \x1b[96m${client.guilds.size}\x1b[95m guilds (servers).`);
	console.log("  \x1b[95mInitialized time: \x1b[96m" + new Date() + "\x1b[95m\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n");
	//set new activity
	randomActivity();

});

client.on("guildCreate", guild => {
	//log on joining guild
	console.log(`\x1b[0mNew guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	randomActivity();
});

client.on("guildDelete", guild => {
	//log on being removed from guild
	console.log(`\x1b[0mI have been removed from: ${guild.name} (id: ${guild.id})`);
	randomActivity();
});

client.on('messageUpdate', function(oldMSG, newMSG) {
	//log on message is edited
  	if(oldMSG.content.indexOf(config.prefix) !== 0){
		//if message is not (initially) a command, log /this/
		console.log("  \x1b[95m" + new Date() + ` \x1b[95m-----\x1b[96m "${oldMSG.guild.name}  /  ${oldMSG.channel.name}"\n  ${oldMSG.author.username} (aka ${oldMSG.guild.member(oldMSG.author).displayName}) changed message:\n        ${oldMSG.content}\n      to:\n        ${newMSG.content}\n\x1b[95m`);
    }else{
		//if message is (initially) a command, log /this/
		console.log(`\n  \x1b[95mSome idiotic clod just tried to edit a command. (it was \x1b[96m${oldMSG.author.username}\x1b[95m (aka \x1b[96m${oldMSG.guild.member(oldMSG.author).displayName}\x1b[96m) btw)\n`)
    }
});

client.on("message", async message => {
	//run this when a message is sent to a server/dm cinnamon is in
	randomActivity();
	if(message.content.indexOf(config.prefix) !== 0){
		//if non-command
		//log message
		logMeLikeOneOfYourFrenchGirls(message);
		if (message.guild === null){
			//if message is from a dm, log /this/ to console
			console.log(`    New DM from \x1b[92m${message.author}: \x1b[0m${message.content}`)
		}else{
			//if message is not from a dm, log /this/ to console
			console.log("    \x1b[96m" + new Date() + ` ----- "${message.guild.name}  /  ${message.channel.name}"\n    \x1b[92m${message.author.username}\x1b[95m (aka \x1b[92m${message.guild.member(message.author).displayName}\x1b[95m) said:\n\x1b[0m        ${message.content}`);
		}
		//if the sender of the message is a bot, stop trying to process it
		if (message.author.bot) return;
		if(message.content.toLowerCase().indexOf("cinnamon, say") == 0){
			//if say command:
			//delete message
			message.delete().catch(O_o=>{});
			//send new message with the given content (eg, if "cinnamon, say hi," respond with "hi")
			message.channel.send(message.content.slice(13, message.content.length));
		}else if(message.content.toLowerCase().indexOf("cinnamon, kys") == 0){
			if (message.guild == null){
				if (message.author.id == 311318878926143488){
					console.log("Forcibly restarting");
					message.channel.send("Okay!");
					await sleep(1000);
					process.exit();
				}else{
					message.channel.send("Fuck off");
				}
			}else{
				message.channel.send("The fricker programming me doesn't care enough to make this work in servers.");
			}
		}else{//ping and pong phrases start here
			//if doesn't have code block
			if (message.content.toLowerCase().indexOf("`")==-1) {//because I don't want to deal with excluding text just /within/ code blocks, I'm just going to ignore any messages that have them at all
				//loop through every ping phrase in lists.json
				for (i in list.pingPhrases) {
				   if (message.content.toLowerCase().indexOf(list.pingPhrases[i])!=-1) {
					   //if message matches a trigger, send the appropriate response
					   message.channel.send(list.pongPhrases[i]);
				   }
				}
			}
			return;
		}
	}else{//commands
		//parsing into args beforehand bc the python version wasn't very fun to play with. Given "!>say Is this the real life?", command = say, args = ["Is", "this", "the", "real", "life?"]
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		//take the first arg (args is currently "say is this the real life?" instead of "is this the real life") and swap it over to command
		const command = args.shift().toLowerCase();

		if(command === "ping") {
			const m = await message.channel.send("Ping?");
			//send ping time
			m.edit("Pong! Your message was received in "+(m.createdTimestamp - message.createdTimestamp)+"ms");
		}
		if(command === "coinflip" || command === "flip") { 			
			if(Math.random() > 0.5){
				message.channel.send("heads!");	
			}else{
				message.channel.send("tails!");
			} 
		}
		if(command === "say") {
			message.delete().catch(O_o=>{});
			//join args back together with spaces (so, just have the original message without the command), and return that
			message.channel.send(args.join(" "));
		}
		if(command === "sendnote"){
			var i;
			//log tagged users in the note
			console.log("\x1b[0m"+message.mentions.members.map(m=>m.user.tag))
			for (i = 0; i < message.content.length; i++){
				//loop through every character of the message, until we get to the ":" (message sent to the tagged members starts after the :)
				if(message.content.slice(i, message.content.length).indexOf(":") == 0){		
					for (ii in message.mentions.members.map(m=>m.user.tag)){
						//for every tagged member,
						//send the text after the ":" to this member, as an embed
						message.mentions.members.map(m=>m.user)[ii].send({embed: {
							title: `${message.guild.member(message.author).displayName} passes you a note...`,
							color: 12486123,
							description: message.content.slice(i+2, message.content.length)
						}});
					}
					//set i to 1,000,000, thus exiting the loop through every character, as discord does not allow messages with 1,000,000 characters.
					i = 1000000;
				}
			}
			//delete message containing the command command for cinnamon to send the note
			message.delete().catch(O_o=>{});
		}
		if(command === "kys"){
			if (message.guild == null){
				if (message.author.id == 311318878926143488){
					console.log("Forcibly restarting");
					message.channel.send("Okay!");
					await sleep(1000);
					process.exit();
				}else{
					message.channel.send("Fuck off");
				}
			}else{
				message.channel.send("That's... not something you should be able to do here.");
			}
		}
		if(command === "roll"){
			//roll dice with the format <#>D##<[+ or -]#>
			let args = message.content.replace("d"," d ").replace("+"," + ").replace("-"," - ").slice(config.prefix.length).trim().split(/ +/g);
			const command = args.shift().toLowerCase();
			if(isNaN(args[(args.indexOf("d")-1)])){
				if(args[(args.indexOf("d")-1)] == undefined){
					args.unshift('1');
				}
			}
			console.log(args);
			var i
			var tmpRollVal = 0
			var tmpRollSum = 0
			var rollMessage = ""
			if(args[(args.indexOf("d")+2)] == "+"){
				for(i = 0; i < args[(args.indexOf("d")-1)]; i++){
					tmpRollVal = Math.floor(Math.random() * (args[(args.indexOf("d")+1)]))+1;
					tmpRollSum = tmpRollSum+tmpRollVal+Number(args[(args.indexOf("d")+3)]);
					rollMessage = rollMessage.concat(("**"+(tmpRollVal+Number(args[(args.indexOf("d")+3)])))+"** ("+tmpRollVal+args[(args.indexOf("d")+2)]+args[(args.indexOf("d")+3)]+")");
					rollMessage = rollMessage.concat("\n")
				}					
			}else if(args[(args.indexOf("d")+2)] == "-"){
				for(i = 0; i < args[(args.indexOf("d")-1)]; i++){
					tmpRollVal = Math.floor(Math.random() * (args[(args.indexOf("d")+1)]))+1;
					tmpRollSum = tmpRollSum+tmpRollVal-Number(args[(args.indexOf("d")+3)]);
					rollMessage = rollMessage.concat(("**"+(tmpRollVal-Number(args[(args.indexOf("d")+3)])))+"** ("+tmpRollVal+args[(args.indexOf("d")+2)]+args[(args.indexOf("d")+3)]+")");
					rollMessage = rollMessage.concat("\n")
				}						
			}else{
				for(i = 0; i < args[(args.indexOf("d")-1)]; i++){
					tmpRollVal = Math.floor(Math.random() * (args[(args.indexOf("d")+1)]))+1;
					tmpRollSum = tmpRollSum+tmpRollVal
					rollMessage = rollMessage.concat("**"+tmpRollVal+"**");
					rollMessage = rollMessage.concat("\n")
				}
			}
			message.channel.send(rollMessage);
			if(args[(args.indexOf("d")-1)] > 1){
				message.channel.send("**Sum:** "+tmpRollSum+"\n"+"**Avg:** "+tmpRollSum/args[(args.indexOf("d")-1)]);
			}
		}
	}
});

console.log(`      logging in to discord as Cinnamon...`)
ttemp = new Date();
//log in to discord as cinnamon
client.login(config.token);
