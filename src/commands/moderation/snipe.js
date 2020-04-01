
const Discord = require('discord.js')
module.exports = {
    name: 'snipe',
    usage: 'pichu snipe',
    description: 'Get the last deleted message',
    category: 'moderation',
    async execute(client,message) {
        const channel = message.mentions.channels.first() || message.channel
    if (!client.snipes.get(channel.id)) return message.channel.send("There is nothing to snipe")
    const embed = new Discord.MessageEmbed()
   .setTitle(client.snipes.get(channel.id).user.tag+'('+client.snipes.get(channel.id).user.id+')')
    .setDescription(client.snipes.get(channel.id).content)
    .setColor("RANDOM")
    message.channel.send(embed)
    },
} 
