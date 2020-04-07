module.exports = {
    name: 'info',
    aliases: ['about'],
    usage: 'pichu info',
    category: 'misc',
      description: 'Get some informations about pichu',
      async execute(client,message) {
          const Discord = require('discord.js')
          let embed = new Discord.MessageEmbed()
         .setColor('RANDOM')
          .setDescription('Here is some informations about pichu :')
          .addFields(
              {name: 'Creator :', value: 'Lumap#0149', inline: true},
              {name: 'Initial creation date :', value :'Around september 2019', inline: true},
              {name: 'Latest changelog :', value :'1.3.0 : \nEconomy command + custom prefixes!', inline: true},
              {name: 'Am I going to evolve ?', value: 'No', inline: true},
	  
          )
          .setFooter('Thanks to Lumine#7367 for the pfp!')
          message.channel.send(embed)
      },
  };
  
