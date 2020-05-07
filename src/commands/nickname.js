module.exports = {
    name: 'nickname',
    async execute(client,message,args) {
        if(!message.member.permissions.toArray().includes("MANAGE_NICKNAMES")) return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Sorry, but you don\'t have the right permissions to do that!')
        )

        let member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' '))
        if (!member) return message.channel.send('Please provide a user id or @mention someone!')
        let nickname = args.slice(1).join(' ')
        if (!nickname) return message.channel.send('Please provide a nickname!')
    member.setNickname(nickname)
    message.channel.send('Done!')
    }
}
