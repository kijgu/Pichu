module.exports = {
    name: 'info',
    aliases: ['about'],
      async execute(client,message) {
          const Discord = require('discord.js')
          let embed = new Discord.MessageEmbed()
         .setColor('RANDOM')
          .setDescription('Here is some informations about pichu :')
          .addFields(
              {name: 'Creator :', value: 'Lumap#0149', inline: true},
              {name: 'Initial creation date :', value :'Around september 2019', inline: true},
              {name: 'Latest changelog :', value :'1.4.0 : \nA lot of small updates, more to come in the next weeks', inline: true},
              {name: 'Am I going to evolve ?', value: 'No', inline: true},
	  
          )
          .setFooter('Thanks to Lumine#7367 for the pfp!')
          message.channel.send(embed)
      },
  };
  
