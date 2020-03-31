const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'vote',
    usage: 'pichu vote',
    category: 'misc',
      description: 'Shows a link to vote for me!',
      async execute(client,message,args) {
          message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription('If you want to vote for me, click [here](https://top.gg/bot/674497635171696644/vote). You will not only get eternal respect from Lumap#0149, but also 1000 coins!'))
          },
  
      };
//https://top.gg/bot/674497635171696644/vote