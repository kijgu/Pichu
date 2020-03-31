
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
    .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
    .setTitle(client.snipes.get(channel.id).user.tag+'('+client.snipes.get(channel.id).user.id+')')
    .setDescription(client.snipes.get(channel.id).content)
    .setColor("RANDOM")
    .setFooter('Made by Link#4444')
    message.channel.send(embed)
    },
} 
