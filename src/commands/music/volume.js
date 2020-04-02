const Discord = require('discord.js')
module.exports = {
    name: 'volume',
    usage: 'pichu volume [number between 1 and 150]',
    aliases: ['vol'],
    category: 'music',
      description: 'Changes the volume',
      async execute(client,message,args,dbl,queue) {

        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed()
         .setColor('RANDOM')
        .setDescription('You are not in a voice channel!')
      )

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send(new Discord.MessageEmbed()
 .setColor('RANDOM')
  .setDescription('Nothing is playing right now :(')
)

  if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`The current volume is **${serverQueue.volume}**`)
  );

  if (serverQueue.songs[0].author.id !== message.author.id) return message.channel.send(new Discord.MessageEmbed() .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048})) .setColor('RANDOM') .setDescription(`Only **${serverQueue.songs[0].author.username}** can change the volume, beacause he requested the current song`))
	

  const volume = parseInt(args[0])
  if (!volume || volume > 150) return message.channel.send(new Discord.MessageEmbed()
  .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
  .setColor('RANDOM')
  .setDescription('Invalid volume! Please provide a number between 1 and 150')
  .setFooter('Made by Lumap#0149'))

  serverQueue.volume = volume;
  serverQueue.connection.dispatcher.setVolumeLogarithmic(volume / 250);
  return message.channel.send(new Discord.MessageEmbed()
  .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
  .setColor('RANDOM')
  .setDescription(`The volume is now **${volume}**!`)
  .setFooter('Made by Lumap#0149'))
          
  
      },
  };

