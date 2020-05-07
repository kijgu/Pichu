let db = require('quick.db-plus')
let prefixdb = new db.db('prefix')
module.exports = {
    name: 'forceprefix',
    ownerOnly: true,
    async execute(client,message,args) {
        if (!args) return message.channel.send('Please provide args! To know this server prefix, just mention me!')
       prefixdb.set(message.guild.id,arhs.join(' '))
       message.channel.send('Changed my prefix to **'+args.join(' ')+'**')
    }
}