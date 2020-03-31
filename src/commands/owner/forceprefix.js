const db = require('quick.db')
var prefixdb = new db.table('prefix')
module.exports = {
    name: 'forceprefix',
    description: 'Sets prefix for this server',
    usage: 'pichu forceprefix <set/reset> <new prefix>',
    category: 'owner',
    async execute(client,message,args) {
        if (!args) return message.channel.send('Please provide args! To know this server prefix, just mention me!')
        if (args[0] === 'reset') {
            deleted = prefixdb.delete(message.guild.id)
            if (deleted) {return message.channel.send('Prefix resetted!')} else {return message.channel.send('No prefix has been set for this guild!')}
        } else if (args[0] === 'set') {
            if (!args.slice(1).join(' ')) return message.channel.send('Please provide a prefix!')
            prefixdb.set(message.guild.id, args.slice(1).join(' '))
            return message.channel.send('Changed my prefix to **'+args.slice(1).join(' ')+'** !')
        } else {
            return message.channel.send('Wrong usage of the command! Please see ``pichu help prefix`` to know how to use this command!')
        }
    }
}