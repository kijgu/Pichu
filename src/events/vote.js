const db = require('quick.db')
var economy = new db.table('economy')
module.exports = async (vote,client) => {
    user = client.users.cache.get(vote.user)
    if(!economy.get(`${user.id}.bal`)) economy.set(`${user.id}.bal`, 0)
    economy.add(`${user.id}.bal`, 500)
    client.channels.cache.get(client.config.dbl.voteChannelID).send(new Discord.MessageEmbed().setColor('RANDOM').setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 2048 })).setDescription(`Thanks you for voting <@${user.id}> (**${user.id}**)! As a reward, you get 1000 coins!`))
  
}