//Do not touch this
const Discord = require('discord.js')
const Client = require('./client/Client')
const client = new Client()
client.options.ws.properties.$browser = "Discord iOS"
const fs = require('fs')
const config = require('./config.json')
client.config = config
client.version = require('./package.json').version
client.snipes = new Discord.Collection()
const queue = new Map()
let messagecounter = [0, 0, 0] 

const messageDelete = require('./src/events/messageDelete.js')
const msg = require('./src/events/message.js')

client.functions = {
  findByID: function(guild,id) {
    return guild.members.cache.find(u => u.user.id === id);
  },
  findByUsername: function(guild,username) {
  return guild.members.cache.find(u => u.user.username.toLowerCase() === username.toLowerCase());
}
}

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

  var commandFiles = fs
    .readdirSync(`./src/commands`)
    .filter(file => file.endsWith('.js'));
  for (var file of commandFiles) {
    var command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
  }  

client.on('guildCreate', async guild => {
  if (guild.id === '538361750651797504') return guild.leave()
})


client.on('messageDelete', (message) => { 
  messageDelete(client,message)
}) 


client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setInterval(function(){
    client.user.setActivity(` ${client.config.prefix}help`)
  },1800000);
})

client.on("reconnecting", () => {
  console.log("Reconnecting!");
});

client.on("disconnect", () => {
  console.log("Disconnect!");
});

client.on('raw', p => {
  messagecounter[2]+=1
});

client.on('message', async message => {
  msg(client,message,messagecounter,queue)
});

client.on('messageUpdate', async (oldMessage,message) => {
  msg(client,message,messagecounter,queue)
});



client.login(client.config.token)

