module.exports = {
	name: 'clear',
  category: 'music',
  usage: 'pichu clear',
	description: 'Clears the queue',
	async execute(client,message,args,dbl,queue) {
    const Discord = require('discord.js')
    let serverQueue = queue.get(message.guild.id)
    if (serverQueue.songs[0].author.id !== message.author.id) return message.channel.send(new Discord.MessageEmbed() .setColor('RANDOM') .setDescription(`Only **${serverQueue.songs[0].author.username}** can do this, beacause he requested the current song`) ).then(m => {setTimeout(() => {m.delete()}, 15000)})
  
        let output = queue.delete(message.guild.id)
        if (output) {return message.channel.send('Queue deleted!')} else {return message.channel.send('Nothing is playing!')}
	},
};
