module.exports = {
    name: 'say',
    async execute(client,message,args) {
        if (!args.join(' ')) {
            let msg = await message.channel.send('Please provide something to say. This command will be cancelled in 30 seconds.')
            
            let response;
            try {
              response = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.content, {
                max: 1,
                time: 30000,
                errors: ['time']
              });
            } catch(e) {
        msg.delete()
                          return message.channel.send('Time out!').then(m => {setTimeout(() => {m.delete()}, 15000)})
      }
      msg.delete().then(
          message.channel.send(response.first().content)
      )
        }
        message.delete().then(
        message.channel.send(args.join(' ')))
    },
   } 