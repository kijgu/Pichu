module.exports = {
	name: 'userinfo',
  category: 'utility',
  usage: 'pichu userinfo [user-id/username/@mention]',
  aliases: ['ui'],
	description: 'Shows user info',
	async execute(client,message,args) {
        const Discord = require('discord.js')
        let member = client.functions.findByID(message.guild,args.join(' ')) || message.mentions.members.first() || client.functions.findByUsername(message.guild,args.join(' ')) || message.member
        let user = member.user
        let isabot = ''
        if (user.bot) {isabot = 'Yes'} else {isabot = 'No'}
        let rolelist = ''
        member.roles.cache.forEach(role => rolelist += `${role} `)
        if (rolelist.length>2000) {
          hastebin.createPaste(rolelist,{
            raw: false,
            contentType: 'text/plain',
            server: 'https://hastebin.com'
            }).then(bin => {rolelist=bin})
        }
        let e = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('User info :')
        .setThumbnail(user.avatarURL({format: 'png', dynamic: true, size: 2048}))
        .addFields(
          {name: 'Name :', value: user.username, inline: true},
          {name: 'Discrimintor :', value: user.discriminator, inline: true},
          {name: 'Avatar URL :', value: user.avatarURL({format: 'png', dynamic: true, size: 2048}), inline: true},
          {name: 'Is a bot ?', value: isabot, inline: true},
          {name: 'Account creation date :', value: user.createdAt, inline: true},
          {name: 'Default avatar URL :', value: user.defaultAvatarURL, inline: true},
          {name: 'ID :', value: user.id, inline: true},
          {name: 'Last message ID :', value: user.lastMessageID, inline: true},
          {name: 'Roles :', value: rolelist}
        )
        
        message.channel.send(e)
	},
};
