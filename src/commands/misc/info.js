module.exports = {
    name: 'info',
    aliases: ['about'],
    usage: 'pichu info',
    category: 'misc',
      description: 'Get some informations about pichu',
      async execute(client,message) {
          const Discord = require('discord.js')
          let embed = new Discord.MessageEmbed()
          .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
          .setColor('RANDOM')
          .setDescription('Here is some informations about pichu :')
          .addFields(
              {name: 'Creator :', value: 'Lumap#0149', inline: true},
              {name: 'Initial creation date :', value :'Around september 2019', inline: true},
              {name: 'Latest changelog :', value :'1.2.3 : \nBug fixes on lyrics', inline: true},
              {name: 'Am I going to evolve ?', value: 'No', inline: true},
	  
          )
          .setFooter('Thanks to Lumine#7367 for the pfp! | Made by Lumap#0149')
          message.channel.send(embed)
      },
  };
  
