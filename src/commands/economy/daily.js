const db = require('quick.db')
var economy = new db.table('economy')
module.exports = {
    name: 'daily',
    category: 'economy',
    description: 'Gains money',
    usage: 'pichu daily',
    async execute(client,message) {
        if(!economy.get(message.author.id+'.bal')) economy.set(message.author.id+'.bal', 0)
        
        //cooldown
        if (economy.get(`${message.author.id}.dailyCooldown`)) {
        cooldown = economy.get(`${message.author.id}.dailyCooldown`)-Date.now()
        if (cooldown>0) {
            let totalSeconds = (cooldown / 1000);
let hours = Math.floor(totalSeconds / 3600);
hours %= 24;
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;

           return message.channel.send(`This command has a 24 hour cooldown! You can gain your daily money again in **${hours}h, ${minutes}m and ${Math.round(seconds)}s**`)
        } else {
            economy.add(`${message.author.id}.bal`, 500)
            economy.delete(`${message.author.id}.dailyCooldown`)
            economy.set(`${message.author.id}.dailyCooldown`, Date.now()+(43200000*2))
            return message.channel.send('Added 500 coins to your balance!')
        }
    } else { 
        economy.add(`${message.author.id}.bal`, 500)
        economy.set(`${message.author.id}.dailyCooldown`, Date.now()+(43200000*2))
        message.channel.send('Added 500 coins to your balance!')
    }
        
    }
}