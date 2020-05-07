module.exports = {
    name: 'loop',
    async execute(client,message,args,dbl,messagecounter,queue) {
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not connected to any VC in this server!')
        let serverQueue = queue.get(message.guild.id)
        if (message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send('Please connect to my voice channel!')
        if (!serverQueue) return message.channel.send('Nothing is playing here!')
        if (serverQueue.loop === 0) {
            serverQueue.loop = 1
            message.channel.send('Now looping the current song')
        } else if (serverQueue.loop === 1) {
            serverQueue.loop=2
            message.channel.send('Now looping the current queue')
        } else {
            serverQueue.loop=0
            message.channel.send('Now looping nothing')
        }
    }
}