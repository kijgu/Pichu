const Discord = require('discord.js')

  module.exports = {
	name: 'meme',
  aliases: ['memes'], 
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
      .setColor('RANDOM')
      .setDescription(`Image not showing? Click [here](${meme.url}) ! | [Link to the original post](${meme.post.link})`)
      .setImage(meme.url)
      .setTimestamp()
        .setFooter('Powered by Ksoft.si')) // discord.js
        message.channel.stopTyping()
          }
          
          main();
        
        
	}
};
