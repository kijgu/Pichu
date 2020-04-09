module.exports = {
    name: 'queue',
    aliases: ['q'],
    usage: 'pichu queue',
    category: 'music',
      description: 'Shows server queue',
      async execute(client,message,args,dbl,messagecounter,queue) {

        const serverQueue = queue.get(message.guild.id);

        if (!serverQueue) return message.channel.send('The queue is empty!');
        const output = []
        for (let i = 1; i < Math.min(serverQueue.songs.length, 11); i++) {
          output[i] = [
            `${i}- [${serverQueue.songs[i].title}](${serverQueue.songs[i].url})\n`
          ].join('\n');
        }
        if ((!output[1])) output[1]='Nothing'
        
        const Discord = require('discord.js')
        let queueemb = new Discord.MessageEmbed()

        .setColor('RANDOM')
        .setAuthor('Server queue')
        .setDescription(`**__Now playing :__** \n[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n\n**__Incoming :__** \n${output.join(' ')}`)
        if (serverQueue.songs.length > 11) 
        {queueemb.setFooter(`${serverQueue.songs.length-11} more songs...`)
      } 
        message.channel.send(queueemb)
       // message.channel.send([
        //    "__**Song queue:**__",
         //   serverQueue.songs.map(song => "- " + song.title).join("\n")
         // ].join("\n\n"))
          
  
      },
  };