module.exports = {
	name: 'weather',
	execute(client,message,args) {
		const Discord = require('discord.js')
 
  if (!args.join(' ')) return message.reply('You need to provide a city')
  
  var weather = require('weather-js')
  let degreetype = args[0]
  let city = args.slice(1).join(' ')
 if (!city) return message.channel.send('Please provide a city name. See `pichu help weather` for further details.')
weather.find({search: city, degreeType: degreetype}, function(err, result) {
  if(err) console.log(err);
 

  
        var current = result[0].current;
        var location = result[0].location;
 
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`weather for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0xffd700)
        .addFields(
            {name: 'Timezone', value: `UTC${location.timezone}`, inline: true},
        {name: 'Degree type', value: location.degreetype, inline: true},
        {name: 'Temperature',value: `${current.temperature} degrees`, inline: true},
        {name: 'Feels like',value: `${current.feelslike} degrees`, inline: true},
        {name: 'winds',value: current.winddisplay, inline: true},
        {name: 'humidity', value: `${current.humidity}%`, inline: true}
        )
      
        message.channel.send(embed);
});
 
 

    	},
};
