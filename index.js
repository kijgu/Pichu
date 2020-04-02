const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: require('./config.json').tokens.bot });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
