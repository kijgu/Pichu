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

let playingmusic = queue.size
if (!playingmusic) playingmusic = 0
let cpuusage;
 require('cpu-stat').usagePercent((err, percent, seconds) => cpuusage = Math.round(percent))

    const embed1 = new Discord.MessageEmbed()
    .setAuthor(client.user.tag, client.user.avatarURL({format: 'png', dynamic: true, size: 2048}))
    .setColor('#5147FF')
    .setImage(`https://top.gg/api/widget/${client.user.id}.png)`)
    .setAuthor('Bot stats: ')
    .setDescription([`
    Uptime: **${days}d, ${hours}h, ${minutes}m, ${Math.round(seconds)}s**
    Guilds: **${client.guilds.cache.size}**
    Users; **${client.functions.get('totalUsers').execute(client)}**
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

    .setFooter('Made by Lumap#0149')
    
    message.channel.send(embed1)
  },
};
