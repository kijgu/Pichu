module.exports = {
    name: 'addcommand',
    ownerOnly: true,
    async execute(client,message,args) {
        if (!args[0]) return message.channel.Send('Please provide command name!')
        client.commands.set(args[0], require(`./${args[0]}`))
        message.channel.send('done')
    }
}