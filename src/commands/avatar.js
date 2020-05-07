module.exports = {
  name: 'avatar',
  aliases: ['pfp', 'av'],
	async execute(client,message,args) {
        let member = client.functions.findByID(message.guild,args.join(' ')) || message.mentions.members.first() || client.functions.findByUsername(message.guild,args.join(' ')) || message.member
   
        const Discord = require('discord.js')
            let avatar = member.user.avatarURL({format: 'png', dynamic: true, size: 2048})
            let avataremb = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`[Click here to download](${avatar})`)
            .setImage(avatar)
            
        message.channel.send(avataremb)
        

	},
};
