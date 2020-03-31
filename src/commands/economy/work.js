const db = require('quick.db')
var economy = new db.table('economy')
module.exports = {
    name: 'work',
    category: 'economy',
    aliases: ['w'],
    description: 'Gains money',
    usage: 'pichu work',
    async execute(client,message) {
        if(!economy.get(message.author.id+'.bal')) economy.set(message.author.id+'.bal', 0)
        //economy.push(message.author.id+'.bal', 500)
        //cooldown
        if (economy.get(`${message.author.id}.workCooldown`)) {
        cooldown = economy.get(`${message.author.id}.workCooldown`)-Date.now()
        if (cooldown>0) {
            let totalSeconds = (cooldown / 1000);
let hours = Math.floor(totalSeconds / 3600);
hours %= 24;
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;

           return message.channel.send(`This command has a 12 hour cooldown! You can work again in **${hours}h, ${minutes}m and ${Math.round(seconds)}s**`)
        } else {
            economy.add(`${message.author.id}.bal`, 500)
            economy.delete(`${message.author.id}.workCooldown`)
            economy.set(`${message.author.id}.workCooldown`, Date.now()+43200000)
            return message.channel.send('Added 500 coins to your balance!')
        }
    } else { 
        economy.add(`${message.author.id}.bal`, 500)
        economy.set(`${message.author.id}.workCooldown`, Date.now()+43200000)
        message.channel.send('Added 500 coins to your balance!')
    }
        
    }
}