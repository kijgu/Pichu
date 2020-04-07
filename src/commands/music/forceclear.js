module.exports = {
	name: 'forceclear',
  category: 'music',
  usage: 'pichu forceclear',
	description: 'Clears the queue',
	async execute(client,message,args,dbl,queue) {
    const Discord = require('discord.js')
    message.channel.send('This command is to use only if you break the bot, please dont use it to troll ppl.')
  
        let output = queue.delete(message.guild.id)
        if (output) {return message.channel.send('Queue deleted!')} else {return message.channel.send('Nothing is playing!')}
	},
};
