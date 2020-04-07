const Discord = require('discord.js')
module.exports = {
    name: 'resume',
    usage: 'pichu resume',
    category: 'music',
      description: 'Resumes the current song',
      async execute(client,message,args,dbl,queue) {

        if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed()
       
        .setColor('RANDOM')
        .setDescription('You are not in a voice channel')
     )

  const serverQueue = queue.get(message.guild.id)
  if (!serverQueue) return message.channel.send(new Discord.MessageEmbed()
  
  .setColor('RANDOM')
  .setDescription('Nithing is playong right now')
  )
  if (serverQueue.playing) return message.channel.send(new Discord.MessageEmbed()
 .setColor('RANDOM')
  .setDescription('The player is alerady resumed!')
  )

  serverQueue.playing = true
  serverQueue.connection.dispatcher.resume()
  return message.channel.send(new Discord.MessageEmbed()
  .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
  .setColor('RANDOM')
  .setDescription('Resumed the player!')
  )
          
  
      },
  };

