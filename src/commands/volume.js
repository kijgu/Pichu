module.exports = {
    name: 'volume',
    aliases: ['vol'],
      async execute(client,message,args,dbl,messagecounter,queue) {
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not connected to any VC in this server!')
        let serverQueue = queue.get(message.guild.id)
        if (!serverQueue) return message.channel.send('Nothing is playing here!')
        if (message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send('Please connect to my voice channel!')
        if (!args.join(' ')) return message.channel.send(`Current volume : **${serverQueue.volume}**`)

  const volume = parseInt(args[0])
  if (!volume || volume < 1 || volume > 500) return message.channel.send('Please provide a volume between 1 and 200')

  serverQueue.volume = volume;
  serverQueue.connection.dispatcher.setVolumeLogarithmic(volume / 100);
  return message.channel.send(`Volume set to **${volume}**!`)
          
  
      },
  };