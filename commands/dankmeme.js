const Discord = require('discord.js')

  module.exports = {
	name: 'dankmeme',
aliases: ['meme'], 
  category: 'fun',
	description: "Shows a meme",
	execute: async (client,message) => {
    const res = await require('axios').get('https://api.ksoft.si/images/rand-reddit/dankmemes', {headers: {'Authorization': 'Bearer '+client.ksoftsi}})
      const e = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Image not showing? Click [here](${res.data.image_url}) !`)
      .setImage(res.data.image_url)
      .setTimestamp()
        .setFooter(`Command Ran By: ${message.author.username}`, message.author.avatarURL);
message.channel.send(e)

	}
};