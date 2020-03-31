const db = require('quick.db')
var economy = new db.table('economy')
module.exports = {
    name: 'balance',
    category: 'economy',
    aliases: ['bal'],
    description: 'Shows your balance',
    usage: 'pichu balance',
    async execute(client,message,args) {
        let member = client.functions.get('findByID').execute(message.guild,args.join(' ')) || message.mentions.members.first() || client.functions.get('findByUsername').execute(message.guild,args.join(' ')) || message.member
        let user = member.user
     
        if(!economy.get(`${user.id}.bal`)) economy.set(`${user.id}.bal`, 0)
        message.channel.send(user.tag+'\'s balance : '+economy.get(`${user.id}.bal`)+' coins')
    }
}