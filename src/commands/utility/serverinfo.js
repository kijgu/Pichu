module.exports = {
	name: 'serverinfo',
  category: 'utility',
  aliases: ['si'],
  usage: 'pichu serverinfo',
	description: 'Shows server info',
	async execute(client,message) {
        const Discord = require('discord.js')
        let server = message.guild

        let verified = ''
        if (server.verified) {verified = 'Yes'}
        else {verified = 'No'}

        let rolelist = ''
        server.roles.cache.forEach(role => rolelist += `${role} `)
        if (rolelist.length>2000) {
          hastebin.createPaste(rolelist,{
            raw: false,
            contentType: 'text/plain',
            server: 'https://hastebin.com'
            }).then(bin => {rolelist=bin})
        }

        let owner = client.users.cache.find(u => u.id === server.ownerID)
        if (!owner) {owner = {tag: 'Owner not found!'}}
        let e = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Server info :')
        .setThumbnail(server.iconURL({format: 'png', dynamic: true, size: 2048})) 
        .addFields(
          {name: 'Server name :', value: server.name, inline: true},
          {name: 'Server ID :', value: server.id, inline: true},
          {name: 'Owner ID :', value: server.ownerID, inline: true},
          {name: 'Owner :', value: owner.tag, inline: true},
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
	},
};
