module.exports = {
    name: 'hug',
    async execute (client,message,args) {
        require('axios').get('https://weebs4life.ga/api/hug').then(res => {
            let member = message.mentions.members.first() || client.functions.findByID(message.guild,args[0]) || client.functions.findByUsername(message.guild,args.join(' ')) || message.guild.me
         let title = `${message.author.tag} hugs ${member.user.tag}`
            message.channel.send({embed: {image: {url: res.data.url}, title: title}})})
    }
}