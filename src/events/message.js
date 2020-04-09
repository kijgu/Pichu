const Discord = require('discord.js');
const db = require('quick.db')
var prefixdb = new db.table('prefix')
var economy = new db.table('economy')
module.exports = async (client,message,cooldown,dbl,messagecounter,queue) => {
    messagecounter[0] += 1
   let prefix = client.config.prefix
  if (!message.guild || message.channel.type === "dm" || message.author.bot || message.author === client.user || message.webhookID) return;
  
    if(!economy.get(`${message.author.id}.bal`)) economy.set(`${message.author.id}.bal`, 0)

  let serverprefix = prefixdb.get(message.guild.id)
  if (serverprefix) prefix = serverprefix;
  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) return message.channel.send('Hi! My prefix is **'+prefix+'**')
  if (message.content.toLowerCase().startsWith(`<@${client.user.id}>`)) {prefix=`<@${client.user.id}> `}
  if (message.content.toLowerCase().startsWith(`<@!${client.user.id}>`)) {prefix=`<@!${client.user.id}> `} //these 2 lines check for mention as prefix
  
  
  if (message.content.toLowerCase().startsWith(prefix)) {
   
    const commandName = message.content.slice(prefix.length).toLowerCase().split(' ')[0].toLowerCase()
    const args = message.content.slice(prefix.length).split(' ').slice(1)
    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return;
    if (command.category === 'owner') {
      if (message.author.id !== client.config.ownerID) return message.reply("You tried to execute a owner-only command, and you can't do that :(")
    }
    
    try {
      if (cooldown.has(message.author.id)) {
        return message.channel.send("To prevent spam, commands have a 5 seconds cooldown. Please wait a bit before spamming these");
       
       }
     
       if (message.author.id !== client.config.ownerID) {cooldown.add(message.author.id);
       setTimeout(() => {
         cooldown.delete(message.author.id);
       }, 5000);
       }
      messagecounter[1] += 1
      economy.add(`${message.author.id}.bal`, 1)  
      client.channels.cache.get(client.config.channels.commandExecuted).send(`${message.author.tag} executed ${command.name} in ${message.guild.name}`),
      
      await command.execute(client, message, args, dbl, messagecounter,queue)

    } catch (err) {
      let error = new Discord.MessageEmbed()
      .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
        .setColor('RED')
        .setAuthor('Oops! Something went wrong!')
        .setDescription(`Woopsie doopsie, something went wrong! You can find the error right below. If you can't figure how to get around this issue, please contact ${client.config.ownerTag}`)
        .addFields(
          { name: 'Error :', value: `\`\`\`js\n${err}\`\`\`` })
      message.reply(error)
      console.log(err)
      error.setTitle(`Command : ${command.name}`)
      client.channels.cache.get(client.config.channels.error).send(error)
      
    }
  }

}
