
const Discord = require('discord.js');





module.exports = {
	name: 'ban',
    aliases: ['b'],
    category: 'moderation',
    usage: 'pichu ban <@mention/userid>',
	description: 'Ban a user',
	execute(client,message,args) {
		const nouser = new Discord.MessageEmbed()

.setColor('#5147FF')
.setAuthor("You didn't provide a userid/@mention")


const missingpermsfromauthor = new Discord.MessageEmbed()

.setColor('#5147FF')
.setAuthor("You don't have the following permission : 'BAN_MEMBERS'")

    const ownerID = client.ownerID
    let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(' '))
		if (!user) {
			return message.channel.send(nouser);
		}
    if (user.id === ownerID) return message.reply('I can\'t ban my dev')
    
if(!message.member.permissions.toArray().includes("BAN_MEMBERS"))
   return message.channel.send(missingpermsfromauthor)
    
		
const userbanned = new Discord.MessageEmbed()
.setColor('#5147FF')
.setAuthor('User banned!')
.setDescription(`**${user.user.username}#${user.user.discriminator}** is now banned from this server!`)

    
    user.send(`You were banned from **${message.guild.name}** by ${message.author.username}#${message.author.discriminator}`)
		return user
			.ban()
			.then(() => message.channel.send(userbanned))
			.catch(error => message.reply("ERROR"));
	},
};
