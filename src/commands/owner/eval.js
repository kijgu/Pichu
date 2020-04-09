 
const Discord = require('discord.js')

module.exports = {
  name: 'eval',
  usage: 'pichu eval <js code>',
  description: 'Eval something',
  category: 'owner',
  async execute(client,message,args,dbl,messagecounter,queue) {
   try {
      const code = args.join(" ");
      let evaled = await eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        if (evaled.length>2000) {
          const hastebin = require('hastebin')
          let bin = await hastebin.createPaste(`${evaled}`,{
            raw: false,
            contentType: 'js',
            server: 'https://hastebin.com'
            })
            return message.author.send(bin)
        } else {
      const successembed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Pichu eval command results :')
      .addFields(
        {name: 'Input :', value: `\`\`\`js\n${args.join(' ')}\`\`\``},
        {name: 'Output', value: `\`\`\`js\n${evaled}\`\`\``}
      )
     
      message.react('✅').then(message.channel.send(successembed))};
    } catch (err) {
      const failureembed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Pichu eval command results :')
      .addFields(
        {name: 'Input :', value: `\`\`\`js\n${args.join(' ')}\`\`\``},
        {name: 'Error :', value: `\`\`\`js\n${err}\`\`\``}
        )
        
      message.react('✖️').then(message.channel.send(failureembed));
    }
  },
};
