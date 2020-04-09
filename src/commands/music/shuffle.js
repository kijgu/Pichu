module.exports = {
    name: 'shuffle',
    description: 'shuffles the queue',
    usage: 'pichu shuffle',
    category: 'music',
    async execute(client,message,args,dbl,messagecounter,queue) {
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not connected to any VC in this server!')
        let serverQueue = queue.get(message.guild.id)
        if (!serverQueue) return message.channel.send('Nothing is playing here!')
        if (message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send('Please connect to my voice channel!')
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        serverQueue.songs=[serverQueue.songs[0],...shuffle(serverQueue.songs)]
        message.channel.send('Queue shuffled!')
    }
}