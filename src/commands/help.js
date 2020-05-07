module.exports = {
    name: 'help',
    aliases: ['link','links','vote','invite','support'],
    async execute(client,message) {
        message.channel.send({embed: {
            color: 0xffff00,
            title: "Pichu help menu",
            thumbnail: {
                url: client.user.avatarURL({format: 'png',size: 2048})
            },
            description: `
                List of commands: [here](https://pichu.lumap.me/)
                Vote for the bot: [here](https://top.gg/bot/674497635171696644/vote)
                Invite the bot: [here](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)
                Support server: [here](https://discord.gg/uWzaaEK)
                Donate: [here](https://www.patreon.com/lumap)
                `
        }})
    }
}