module.exports = {
    name: 'stats',
    usage: 'pichu stats',
    category: 'misc',
	description: "Bot statuts",
	async execute(client,message,args,dbl,queue,messagecounter) {
  const Discord = require('discord.js')
    
    let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
hours %= 24;
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
//let totalServers = await client.shard.fetchClientValues('guilds.cache.size')

let playingmusic = queue.size
if (!playingmusic) playingmusic = 0

let cpuusage;
 require('cpu-stat').usagePercent((err, percent, seconds) => cpuusage = Math.round(percent))
 let totalUsers = client.functions.totalUsers(client)


    const embed1 = new Discord.MessageEmbed()
    .setColor('#5147FF')
    .setImage(`https://top.gg/api/widget/${client.user.id}.png)`)
    .setAuthor('Bot stats: ')
    .setDescription([`
    Uptime: **${days}d, ${hours}h, ${minutes}m, ${Math.round(seconds)}s**
    Creator: **${client.config.ownerTag}**
    Guilds: **${client.guilds.cache.size}**
    Users; **${totalUsers}**
    Commands: **${client.commands.size}**
    Commands executed: **${messagecounter[1].toLocaleString()}**
    Playing servers: **${playingmusic}**
    Messages seen: **${messagecounter[0].toLocaleString()}**
    Events received: **${messagecounter[2].toLocaleString()}**
    Bot version: **${client.version}**
    CPUs: **${require('os').cpus().length}**
    CPU usage: **${cpuusage}%**
    RAM Usage: **${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)+'MB'}/${Math.round(require('os').totalmem()/1000000000)+'GB'}**
    `])

    
    message.channel.send(embed1)
  },
};
