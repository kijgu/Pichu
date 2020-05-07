module.exports = {
    name: 'ping',
    async execute(client,message) {
        message.channel.send(`Pong! **${client.ws.ping}** ms!`)
    },
}
