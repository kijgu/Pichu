const Discord = require('discord.js')
module.exports = {
    name: 'kick',
    aliases: ['k'],
    category: 'moderation',
    description: 'Kicks someone',
    usage: 'pichu kick <@user/userid>',
    async execute(client,message,args) {
        if(!message.member.permissions.toArray().includes("KICK_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Sorry, but you don\'t have the right permissions to do that!')
        )
        let member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' '))
        let reason = args.slice(1).join(' ')
        if (!reason) reason = 'No reason provided'
    if (!member) return message.channel.send('Please provide a user to kick!')
    if (member.user.id === client.ownerID) return message.channel.send('Sorry, but I can\'t kick my dev!')
    member.send(`You have been kicked from **${message.guild.name}** by **${message.author.username}#${message.author.discriminator}**`)

    return member
    .kick()
    .then(() => message.channel.send(new Discord.MessageEmbed()

    .setColor('RANDOM')
    .setTitle(`**${member.user.username}#${memmber.user.discriminator}** has been kicked from **${message.guild.name}**`)
    .setDescription(`Reason : ${reason}`)))
    }
}