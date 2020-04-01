module.exports = {
    name: 'covid',
    aliases: ['coronavirus', 'cv'],
    description: 'Shows some coronavirus stats',
    usage: 'pichu covid [country name]',
    category: 'utility',
    async execute(client,message,args) {
        const covid = require('novelcovid');
        const Discord = require('discord.js')
        if (args.join(' ')) {
        let country = await covid.getCountry({country: args.join(' ')});
        if (!country || !country.country) return message.channel.send('country not found')
   let emb = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setTitle(`Coronavirus stats in ${country.country} :`)
   .setDescription(`Total cases: **${country.cases.toLocaleString()}**\nToday cases : **${country.todayCases.toLocaleString()}**\nDeaths : **${country.deaths.toLocaleString()}**\nToday deaths : **${country.todayDeaths.toLocaleString()}**\nRecovered : **${country.recovered.toLocaleString()}**\nActive cases: **${country.active.toLocaleString()}**\nCritical  : **${country.critical.toLocaleString()}**`)
  
   if (country.countryInfo) {emb.setThumbnail(country.countryInfo.flag)}
   message.channel.send(emb)
    } else {
        let all = await covid.getAll();
        let emb = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Coronavirus stats all around the world :')
       
        .setDescription(`Total cases : **${all.cases.toLocaleString()}**\nTotal deaths : **${all.deaths.toLocaleString()}**\nTotal recovered : **${all.recovered.toLocaleString()}**\nUpdated : **${new Date(all.updated)}**`)
        message.channel.send(emb)
    }
    }
}