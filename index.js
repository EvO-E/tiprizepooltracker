const config = require('./config.json');
const Discord = require('discord.js');
const util = require('util');
var request = require("request");
var ppstring = ' ';
var ppoolval = 0;
var tppoolval = 0;
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
var request = require("request")

var url = "http://api.steampowered.com/IEconDOTA2_570/GetTournamentPrizePool/v1/?key=27B02CD74F924D1C4E393B2312F4EE29&leagueid=9870"


request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
		ppstring = JSON.stringify(body, ['result', 'prize_pool']);;
		var cppool = ppstring;
		cppool = body['prize_pool'];
		ppoolval = parseInt(cppool, 10);
		tppoolval = ppoolval+(ppoolval*0.75);
		console.log(ppoolval);  
		console.log(tppoolval);
    }
})


bot.on("ready", () => {
    bot.user.setGame('Wallet Collection Simulator 2018'); //you can set a default game
    console.log(`Bot is online!\n${bot.users.size} users, in ${bot.guilds.size} servers connected.`);
});

bot.on("guildCreate", guild => {
    console.log(`I've joined the guild ${guild.name} (${guild.id}), owned by ${guild.owner.user.username} (${guild.owner.user.id}).`);
});

bot.on("message", message => { 

    if(message.author.bot || message.system) return; // Ignore bots
    
    if(message.channel.type === 'dm') { // Direct Message
        return; //Optionally handle direct messages
    } 

    console.log(message.content); // Log chat to console for debugging/testing
    
    if (message.content.indexOf(config.prefix) === 0) { // Message starts with your prefix
        
        let msg = message.content.slice(config.prefix.length); // slice of the prefix on the message

        let args = msg.split(" "); // break the message into part by spaces

        let cmd = args[0].toLowerCase(); // set the first word as the command in lowercase just in case

        args.shift(); // delete the first word from the args

        
        if (cmd === 'hi' || cmd === 'hello') { // the first command [I don't like ping > pong]
            message.channel.send({embed: {
    
  
  
    color: 0x008016,
    timestamp: new Date(),
    footer: {
      icon_url: "https://cdn.shopify.com/s/files/1/0972/9846/products/Front_c32054d3-16f9-477b-b5de-b8ad1b681443_2048x2048.jpg",
      text: "Current Date"
    },
    thumbnail: {
      url: "https://cdn.vox-cdn.com/thumbor/UtcC448oUP2PDuE9oUU7gvAW9Yg=/0x0:1419x1080/1200x800/filters:focal(639x460:865x686)/cdn.vox-cdn.com/uploads/chorus_image/image/59670923/2018_compendium_probably.0.png"
    },
    author: {
      name: "The International 2018 Prize Pool Tracker",
      url: "http://www.dota2.com/international/battlepass/",
      icon_url: "http://liquipedia.net/commons/images/thumb/0/0e/Ti8_aegis_banner.png/600px-Ti8_aegis_banner.png"
    },
    fields: [
      {
        name: "Starting Prize Pool",
        value: "1,600,000"
      },
      {
        name: "Current Prize Pool",
        value: cppool
      },
      {
        name: "Contributed Prize Pool By Community",
        value: "X"
        
      },
      
      {
        name: "Total Money Spent By Community",
        value: "Gaben Cash"
        
      }
    ]
  

			}
			
    });
							
            return;
        }
		else
		if (cmd === 'prize' || cmd === 'ppool' || cmd === 'prizepool')
			
			{
									request({
						url: url,
						json: true
					}, function (error, response, body) {

						if (!error && response.statusCode === 200) {
							ppstring = JSON.stringify(body);
							console.log(ppstring) // Print the json response
						}
					})
				message.channel.send(ppstring);
			return;
			}
    return;
	}
});

function evalCmd(message, code) {
    if(message.author.id !== config.owner) return;
    try {
        let evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
            message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
function clean(text) {
    if (typeof(text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0') //Don't let it post your token
    return text;
}

// Catch Errors before they crash the app.
process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
    // process.exit(1); //Eh, should be fine, but maybe handle this?
});

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
    // process.exit(1); //Eh, should be fine, but maybe handle this?
});

bot.login(config.token);