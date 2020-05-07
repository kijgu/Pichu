 
const Discord = require('discord.js')

module.exports = {
  name: 'eval',
  ownerOnly: true,
  async execute(client,message,args,dbl,messagecounter,queue) {
   try {
      const code = args.join(" ");
      let evaled = await eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        if (evaled.includes(client.token)) evaled="token leak detected, FBI OPENS UP"
        if (evaled.length>1024) {
          console.log(evaled)
         return message.channel.send('Text too long! Sending it to js console...')
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
