
let db = require('quick.db-plus')
let prefixdb = new db.db('prefix')
module.exports = {
    name: 'prefix',
    async execute(client,message,args) {
      if (!message.member.permissions.toArray().includes("ADMINISTRATOR")) return message.channel.send('Only the server admins can change my prefix!');
        if (!args) return message.channel.send('Please provide args! To know this server prefix, just mention me!')
       prefixdb.set(message.guild.id,arhs.join(' '))
       message.channel.send('Changed my prefix to **'+args.join(' ')+'**')
    }
}