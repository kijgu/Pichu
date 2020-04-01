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
  require('./src/events/vote.js')(vote,client)
  });

  const BOATS = require('boats.js');
const Boats = new BOATS(client.config.tokens.discord_boats);
 


client.functions = {
  findByID: function(guild,id) {
    return guild.members.cache.find(u => u.user.id === id);
  },
  findByUsername: function(guild,username) {
  return guild.members.cache.find(u => u.user.username.toLowerCase() === username.toLowerCase());
},
  totalUsers: function(client) {
    let userCount = 0;
        client.guilds.cache.forEach(g => userCount += g.memberCount)
        return userCount.toLocaleString()
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
  setInterval(function(){
Boats.postStats(client.guilds.cache.size, "674497635171696644").then(() => {
  console.log('Successfully updated server count.');
}).catch((err) => {
  console.error(err);
});
  },1800000);
  client.user.setActivity(` ${client.config.prefix}help | ${client.guilds.cache.size} servers | ${client.functions.totalUsers(client)} users`)
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

client.on('messageUpdate', async (oldMessage,message) => {
  msg(client,message,cooldown,dbl,queue,messagecounter)
});

client.login(client.config.tokens.bot)

