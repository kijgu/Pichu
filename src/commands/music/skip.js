const Discord = require('discord.js')
module.exports = {
	name: 'skip',
	aliases: ['sk'],
  category: 'music',
  usage: 'pichu skip',
	description: 'Skip the current song',
	async execute(client,message,args,dbl,queue) {
		const serverQueue = queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('Please add me in a voice channel');
		if (!serverQueue) return message.channel.send('The queue is empty!');
		if (serverQueue.songs[0].author.id !== message.author.id) return message.channel.send(new Discord.MessageEmbed() .setColor('RANDOM') .setDescription(`Only **${serverQueue.songs[0].author.username}** can skip this song, beacause he requested the current song`))
		serverQueue.connection.dispatcher.end();
    message.channel.send(new Discord.MessageEmbed() .setColor('RANDOM') .setDescription('Music skipped! ') ).then(m => {setTimeout(() => {m.delete()}, 15000)})
	},
};
