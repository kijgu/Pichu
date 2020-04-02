const Discord = require('discord.js');
module.exports =  async (client,guild) => {
    if (guild.id === '538361750651797504') return guild.leave()
    let totalServers = await client.shard.fetchClientValues('guilds.cache.size')
    let totalUsers = await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')
    client.user.setActivity(` ${client.config.prefix}help | ${totalServers[0]} servers | ${totalUsers[0]}} users`)
 const guildCreate = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setThumbnail(guild.iconURL({format: 'png', dynamic: true, size: 2048}))
    .setTitle('New guild!')
    .setDescription(`Guild name : ${guild.name}\nGuild id : ${guild.id}\nGuild owner ID : ${guild.ownerID}`)
  
    client.channels.cache.get(client.config.channels.guildCreate).send(guildCreate)
}