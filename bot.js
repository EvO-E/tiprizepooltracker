const config = require('./config.json');
const Discord = require('discord.js');
const util = require('util');
var request = require("request");

var ppstring = ' ';
var cppool = ' ';
var ppoolval = 0;
var tppoolval = 0;
var contmoney = 0;
var cppools = ' ';
var contms = ' ';
var tmoneys = ' ';
var gmoney = ' ';
var gmoneys = ' ';
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
var request = require("request");
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
		ppstring = body.result.prize_pool;
		cppool = ppstring;
		ppoolval = parseInt(cppool, 10);
		contmoney = ppoolval-1600000;
		tppoolval = contmoney*4;
		cppools = cppool.toLocaleString('en');
		contms = contmoney.toLocaleString('en');
		tmoneys = tppoolval.toLocaleString('en');
		gmoney = tppoolval-contmoney;
		gmoneys = gmoney.toLocaleString('en');
		console.log(ppoolval);  
		console.log(tppoolval);
    }
})

var url = "http://api.steampowered.com/IEconDOTA2_570/GetTournamentPrizePool/v1/?key=78741DE9B1CB8BC2574C472BC69FAF2A&leagueid=9870"
var GetJson = function () {
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
		ppstring = body.result.prize_pool;
		cppool = ppstring;
		ppoolval = parseInt(cppool, 10);
		contmoney = ppoolval-1600000;
		tppoolval = contmoney*4;
		cppools = cppool.toLocaleString('en');
		contms = contmoney.toLocaleString('en');
		tmoneys = tppoolval.toLocaleString('en');
		gmoney = tppoolval-contmoney;
		gmoneys = gmoney.toLocaleString('en');
		console.log(ppoolval);  
		console.log(tppoolval);
    }
})

};
setInterval(GetJson, 6000);



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

        
        if (cmd === 'prizepool' || cmd === 'ppool' || cmd === 'pp' || cmd === 'prize') { // the first command [I don't like ping > pong]
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
        value: cppools
      },
      {
        name: "Contributed Prize Pool By Community",
        value: contms
        
      },
      
      {
        name: "Total Money Spent By Community",
        value: tmoneys ,
		inline : true 
      },
      {
        name: "Gaben's Profit",
        value: gmoneys ,
        inline: true
      }	
    ]
  

			}
			
    });
							
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