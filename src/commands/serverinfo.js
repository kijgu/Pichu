module.exports = {
	name: 'serverinfo',
  aliases: ['si'],
	async execute(client,message) {
        const Discord = require('discord.js')
        let server = message.guild

        let verified = ''
        if (server.verified) {verified = 'Yes'}
        else {verified = 'No'}

        let rolelist = ''
        server.roles.cache.forEach(role => rolelist += `${role} `)
        if (rolelist.length>1024) {
          require('hastebin').createPaste(rolelist,{
            raw: false,
            contentType: 'text/plain',
            server: 'https://hastebin.com'
            }).then(bin => {rolelist=bin})
        }

        message.guild.members.fetch(server.ownerID).then(() => {
          let owner = message.guild.members.cache.find(m => m.user.id === server.ownerID)
         let e = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Server info :')
        .setThumbnail(server.iconURL({format: 'png', dynamic: true, size: 2048})) 
        .addFields(
          {name: 'Server name :', value: server.name, inline: true},
          {name: 'Server ID :', value: server.id, inline: true},
          {name: 'Owner ID :', value: server.ownerID, inline: true},
          {name: 'Owner :', value: owner.user.tag, inline: true},
          {name: 'Server region :', value: server.region, inline: true},
          {name: 'MFA Level :', value: server.mfaLevel, inline: true},
          {name: 'Server created at :', value: server.createdAt, inline: true},
          {name: 'I joined at :', value: server.joinedAt, inline: true},
          {name: 'AFK Channel :', value: server.afkChannel, inline: true},
          {name: 'Member Count :', value: server.memberCount, inline: true},
          {name: 'Verification level :', value: server.verificationLevel, inline: true},
          {name: 'Is this guild verified ?', value: verified, inline: true},
          {name: 'Role list :', value: rolelist}
        )
      
        message.channel.send(e)
        })
	},
};
