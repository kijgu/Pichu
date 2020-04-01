const Discord = require('discord.js')
module.exports = {
	name: 'stop',
	usage: 'pichu stop',
  category: 'music',
	description: 'Stop the current song AND the queue',
	async execute(client,message,args,dbl,queue) {
		const serverQueue = queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send("You're not in a vocal channel");
		if (!serverQueue) return message.channel.send('Nothing is playing in this server!');
		if (serverQueue.songs[0].author.id !== message.author.id) return message.channel.send(new Discord.MessageEmbed()  .setColor('RANDOM') .setDescription(`Only **${serverQueue.songs[0].author.username}** can stops the queue, beacause he requested the current song`))
		serverQueue.songs = [];
		serverQueue.message.delete();
		serverQueue.connection.dispatcher.end();
		message.channel.send(new Discord.MessageEmbed().setColor('RANDOM') .setDescription('Music sucessfully stopped! ') ).then(m => {setTimeout(() => {m.delete()}, 15000)})
	},
};
