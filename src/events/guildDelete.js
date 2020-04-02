const Discord = require('discord.js');
<<<<<<< HEAD
module.exports =  async (client,guild) => {
   
    let totalServers = await client.shard.fetchClientValues('guilds.cache.size')
    let totalUsers = await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')
    client.user.setActivity(` ${client.config.prefix}help | ${totalServers[0]} servers | ${totalUsers[0]}} users`)
=======
module.exports = async (client,guild) => {
    client.user.setActivity(` ${client.config.prefix}help | ${client.guilds.cache.size} servers | ${client.functions.totalUsers(client)} users`)
>>>>>>> c93d56eab2ded4c475044d294fc2df11dacb4128
 const guildDelete = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setThumbnail(guild.iconURL({format: 'png', dynamic: true, size: 2048}))
    .setTitle('New guild!')
    .setDescription(`Guild name : ${guild.name}\nGuild id : ${guild.id}\nGuild owner ID : ${guild.ownerID}`)
  
    client.channels.cache.get(client.config.channels.guildDelete).send(guildDelete)
}