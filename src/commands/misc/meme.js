const Discord = require('discord.js')

  module.exports = {
	name: 'meme',
aliases: ['memes'], 
  category: 'misc',
  usage: 'pichu meme',
	description: "Shows a meme",
	async execute (client,message) {
    message.channel.startTyping()
  
          const { KSoftClient } = require('@ksoft/api');

          const ksoft = new KSoftClient(client.config.tokens.ksoft);
          
          /* I use a helper asnyc function called main here.
           * This would also work using a lambda function or class method,
           * as long as it's asynchronous.
           */
          async function main() {
              const meme = await ksoft.images.meme({nsfw: false});
              message.channel.send(new Discord.MessageEmbed()
              .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
      .setColor('RANDOM')
      .setDescription(`Image not showing? Click [here](${meme.url}) ! | [Link to the original post](${meme.post.link})`)
      .setImage(meme.url)
      .setTimestamp()
        .setFooter('Powered by Ksoft.si | Made by Lumap#0149')) // discord.js
        message.channel.stopTyping()
          }
          
          main();
        
        
	}
};
