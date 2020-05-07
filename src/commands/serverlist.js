module.exports = {
    name: 'serverlist',
    ownerOnly: true,
    async execute(client,message) {
 let string = '';
client.guilds.cache.forEach(guild => {
    string += guild.name + '\n';})
    
    
    message.author.send(string)
    message.channel.send('Server list sent in dm!');
   },
} 
