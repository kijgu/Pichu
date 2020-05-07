module.exports = {
    name: 'stats',
	async execute(client,message,args,dbl,messagecounter) {
  const Discord = require('discord.js')
    
    let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
hours %= 24;
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
//let totalServers = await client.shard.fetchClientValues('guilds.cache.size')


let cpuusage;
 require('cpu-stat').usagePercent(async (err, percent, seconds) => {
   cpuusage = Math.round(percent)
   let totalServers = await client.shard.fetchClientValues('guilds.cache.size')
   let totalUsers = await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')


    const embed1 = new Discord.MessageEmbed()
    .setColor('#5147FF')
    .setImage(`https://top.gg/api/widget/${client.user.id}.png`)
    .setAuthor('Bot stats: ')
    .setDescription([`
    Uptime: **${days}d, ${hours}h, ${minutes}m, ${Math.round(seconds)}s**
    Creator: **${client.config.ownerTag}**
    Guilds: **${totalServers[client.options.shards[0]]}**
    Users: **${totalUsers[client.options.shards[0]]}**
    Shard: **${client.options.shards[0]+1}/${client.options.shardCount}**
    Commands: **${client.commands.size}**
    Commands executed: **${messagecounter[1].toLocaleString()}**
    Messages seen: **${messagecounter[0].toLocaleString()}**
    Events received: **${messagecounter[2].toLocaleString()}**
    Bot version: **${client.version}**
    Cores: **${require('os').cpus().length}**
    CPU usage: **${cpuusage}%**
    RAM Usage: **${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)+'MB'}/${Math.round(require('os').totalmem()/1000000000)+'GB'}**
    `])

    
    message.channel.send(embed1)
 })
 
  },
};
