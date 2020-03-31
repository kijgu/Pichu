module.exports = {
    name: 'lyrics',
    usage: 'pichu lyrics <song name>',
    description: 'Shows lyrics of a song',
    category: 'music',
    async execute(client,message,args,dbl,queue) {
        if (queue.get(message.guild.id) && !args.join(' ')) {
            args = queue.get(message.guild.id).songs[0].title.split(' ')
        }
        if (!args.join(' ')) return message.channel.send('Please proide a song name')
       
        let msg = await message.channel.send('Loading...')
        const solenolyrics= require("solenolyrics"); 
        const Discord = require('discord.js')
    var lyrics;
     await solenolyrics.requestLyricsFor(args.join(' ')).then(res => res).then(r => lyrics=r).catch(error => console.log(error))
    var title = await solenolyrics.requestTitleFor(args.join(' ')); 
    var author = await solenolyrics.requestAuthorFor(args.join(' ')); 
    if (!lyrics) return message.channel.send('Lyrics not found!')
    if (lyrics.length>2000) {
        client.commands.get('hastebin').execute(client,message,lyrics.split(' '))
        return msg.edit('Too big! Uploading to hastebin...')
    }
    msg.edit(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Lyrics for ${title} by ${author}`)
    .setDescription(lyrics)
    .setFooter('Made with solenolyrics | Made by Lumap#0149'))

    }
}