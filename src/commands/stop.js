module.exports = {
    name: 'stop',
    aliases: ['st'],
    async execute(client,message,args,dbl,messagecounter,queue) {
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not connected to any VC in this server!')
        let serverQueue = queue.get(message.guild.id)
        if (message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send('Please connect to my voice channel!')
        if (!serverQueue) {
            message.member.voice.channel.leave()
            return message.channel.send('No song is playing here! Leaving the voice channel...')
        } 
        if (serverQueue) {
            let test = queue.get(message.guild.id).npmsg.delete()
            if (test) {
                queue.delete(message.guild.id)
                message.member.voice.channel.leave()
                return message.channel.send('Queue deleted! Leaving the voice channel...')
            } else {
                return message.channel.send('Something went wrong!')
            }
        }
    }
}