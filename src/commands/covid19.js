module.exports = {
    name: 'covid19',
    aliases: ['coronavirus', 'cv'],
    async execute(client,message,args) {
        const covid = require('novelcovid');
        const Discord = require('discord.js')
        if (args.join(' ')) {
        let country = await covid.getCountry({country: args.join(' ')});
        if (!country || !country.country) return message.channel.send('country not found')
   let emb = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setTitle(`Coronavirus stats in ${country.country} :`)
   .setDescription(`Cases: **${country.cases.toLocaleString()}**
   Today cases : **${country.todayCases.toLocaleString()}**
   Cases /1mil: **${country.casesPerOneMillion.toLocaleString()}**
   Deaths : **${country.deaths.toLocaleString()}**
   Today deaths : **${country.todayDeaths.toLocaleString()}**
   Deaths /1mil: **${country.deathsPerOneMillion.toLocaleString()}**
   Recovered : **${country.recovered.toLocaleString()}**
   Active: **${country.active.toLocaleString()}**
   Critical  : **${country.critical.toLocaleString()}**
   Tests: **${country.tests.toLocaleString()}**
   Tests /1mil: **${country.testsPerOneMillion.toLocaleString()}**
   `)
   if (country.countryInfo) {emb.setThumbnail(country.countryInfo.flag) .setFooter(`Updated at ${new Date(country.countryInfo.updated)}`)}

   message.channel.send(emb)
    } else {
        let all = await covid.getAll();
        let emb = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Coronavirus stats all around the world :')
        .setDescription(`Cases : **${all.cases.toLocaleString()}**
        Today cases: **${all.todayCases.toLocaleString()}**
        Cases /1mil: **${all.casesPerOneMillion.toLocaleString()}**
        Deaths : **${all.deaths.toLocaleString()}**
        Today deaths: **${all.todayDeaths.toLocaleString()}**
        Deaths /1mil: **${all.deathsPerOneMillion.toLocaleString()}**
        Recovered : **${all.recovered.toLocaleString()}**
        Active: **${all.active.toLocaleString()}**
        Critical: **${all.critical.toLocaleString()}**
        Tests: **${all.tests.toLocaleString()}**
        Crirical: **${all.critical.toLocaleString()}**
        Affected countries: **${all.affectedCountries}**`)
        .setFooter(`Updated at ${new Date(all.updated)}`)
         message.channel.send(emb)
    }
    }
}