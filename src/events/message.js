const Discord = require('discord.js');
let db = require('quick.db-plus')
let prefixdb = new db.db('prefix')
module.exports = async (client,message,messagecounter,queue) => {
  if (message.content === '' || !message.guild || message.channel.type === "dm" || message.author.bot || message.webhookID) return;

    messagecounter[0] += 1
    let prefixx = prefixdb.get(message.guild.id) || client.config.prefix
      if (message.content === `<@!${client.user.id}>`) return message.channel.send(`My prefix here is **${prefixx}**!`)
      if (message.content.startsWith(`<@!${client.user.id}>`)) prefixx=`<@!${client.user.id}>`
  if (message.content.toLowerCase().startsWith(prefixx)){
    const commandName = message.content.slice(prefixx.length).trim().toLowerCase().split(' ')[0].toLowerCase()
    const args = message.content.slice(prefixx.length).trim().split(' ').slice(1)
    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return;
    if (command.ownerOnly) {
      if (!client.config.ownerID.includes(message.author.id)) return message.reply("You tried to execute a owner-only command, and you can't do that :(")
    }
    try {
      messagecounter[1] += 1
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
        }
      }
}