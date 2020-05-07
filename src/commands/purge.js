const Discord = require('discord.js')
module.exports = {
    name: 'purge',
    async execute(client, message, args) {
        if (!args.join(' ')) return message.channel.send('I can\'t purge nothing!')
        //perm check 
        if (!message.member.permissions.toArray().includes("MANAGE_MESSAGES")) return message.channel.send("You need the Manage Messages permisson to purge messages!")
        let amount = args[0]
        if (isNaN(amount)) return message.channel.send("You need to tell me a number of messages I should purge!")
        amount = Number(amount)
        if (!amount || amount < 2 || amount > 100) return message.channel.send('Invalid number! Please provide a number between 1 and 99')
        const fetched = await message.channel.messages.fetch({
			limit: amount,
		});
        message.channel.bulkDelete(fetched)
        message.channel.send(new Discord.MessageEmbed()    .setColor('RANDOM').setTitle("Purge succesfull").setDescription(`**${amount}** Messages have been purged :white_check_mark:`)).then(m => setTimeout(() => {m.delete()},5000))
    }, 
}
