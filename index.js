//Do not touch this
const Discord = require('discord.js')
const Client = require('./client/Client')
const client = new Client()
const fs = require('fs')
const config = require('./config.json')
client.config = config
client.version = require('./package.json').version
client.snipes = new Discord.Collection()
let cooldown = new Set()
let queue = new Map()
let messagecounter = [0, 0, 0] 

const guildCreate = require('./src/events/guildCreate.js')
const guildDelete = require('./src/events/guildDelete.js')
const messageDelete = require('./src/events/messageDelete.js')
const msg = require('./src/events/message.js')

const DBL = require("dblapi.js");
const dbl = new DBL(client.config.tokens.dbl, { webhookPort: process.env.PORT, webhookAuth: client.config.dbl.webhookPassword }, client)


dbl.webhook.on('posted', () => {
  console.log('Server count posted!');
})

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl.webhook.on('error', e => {
  console.log(`Oops! ${e}`);
})

dbl.webhook.on('vote', vote => {
  require('./src/events/vote.js')(vote)
  });

client.functions = new Discord.Collection()
for (let i = 0; i < require('fs').readdirSync('./src/functions/').length; i++) {
  var commandFiles = fs
    .readdirSync(`./src/functions`)
    .filter(file => file.endsWith('.js'));
  for (var file of commandFiles) {
    var f = require(`./src/functions/${file}`);
    client.functions.set(f.name, f)
  }
}

//initializing commands here
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = require("fs").readdirSync("./src/commands/")

for (let i = 0; i < client.categories.length; i++) {
  var commandFiles = fs
    .readdirSync(`./src/commands/${client.categories[i]}`)
    .filter(file => file.endsWith('.js'));
  for (var file of commandFiles) {
    var command = require(`./src/commands/${client.categories[i]}/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
  }  
}




client.on('guildCreate', async guild => {
 guildCreate(client,guild)
})


client.on('guildDelete', async guild => {
 guildDelete(client,guild)  
})


client.on('messageDelete', (message) => { 
  messageDelete(client,message)
}) 


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(` ${client.config.prefix}help | ${client.guilds.cache.size} servers | ${client.functions.get('totalUsers').execute(client)} users`)
})

client.on("reconnecting", () => {
  console.log("Reconnecting!");
});

client.on("disconnect", () => {
  console.log("Disconnect!");
});

client.on('raw', () => {
  messagecounter[2]+=1
});

client.on('message', async message => {
  msg(client,message,cooldown,dbl,queue,messagecounter)
});

client.login(client.config.tokens.bot)

