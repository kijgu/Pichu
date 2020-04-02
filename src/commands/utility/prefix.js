const db = require('quick.db')
var prefixdb = new db.table('prefix')
var vote = new db.table('vote')
module.exports = {
    name: 'prefix',
    description: 'Sets prefix for this server',
    usage: 'pichu prefix <set/reset> <new prefix>',
    category: 'utility',
    async execute(client,message,args) {
        if (!vote.get(`${message.author.id}`) || vote.get(`${message.author.id}`)<0) return message.channel.send('Due to how custom prefixes makes the bot laggy, the prefix command is vote only. Please use `pichu vote` and click the first link to get a registered vote!')
        if (!args) return message.channel.send('Please provide args! To know this server prefix, just mention me!')
        if (args[0] === 'reset') {
            if (!message.member.permissions.toArray().includes("ADMINISTRATOR")) return message.channel.send('Only the server admins can change my prefix!');
            deleted = prefixdb.delete(message.guild.id)
            if (deleted) {return message.channel.send('Prefix resetted!')} else {return message.channel.send('No prefix has been set for this guild!')}
        } else if (args[0] === 'set') {
            if (!message.member.permissions.toArray().includes("ADMINISTRATOR")) return message.channel.send('Only the server admins can change my prefix!');
            if (!args.slice(1).join(' ')) return message.channel.send('Please provide a prefix!')
            prefixdb.set(message.guild.id, args.slice(1).join(' '))
            return message.channel.send('Changed my prefix to **'+args.slice(1).join(' ')+'** !')
        } else {
            return message.channel.send('Wrong usage of the command! Please see ``pichu help prefix`` to know how to use this command!')
        }
    }
}