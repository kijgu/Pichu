
module.exports = {
    name: 'reload',
    ownerOnly: true,
    async execute(client,message,args) {
        if (!args) return message.channel.send('Wrong usage of the command');
        const command = client.commands.get(args.join(' ')) 
        if (!command) return message.channel.send('Invalid command') 
        delete require.cache[require.resolve(`./${command.name}.js`)];
        client.commands.delete(command.name)
        client.commands.set(command.name, require(`./${command.name}.js`)) 
        message.channel.send('Reloaded command **' +command.name+'** !') 
    }
}