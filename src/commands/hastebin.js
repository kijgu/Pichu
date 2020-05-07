module.exports = {
    name: 'hastebin',
    async execute(client,message,args) {
        const hastebin = require('hastebin')
        if (!args.join(' ')) return message.channel.send('Please provide text to upload!')
        hastebin.createPaste(args.join(' '),{
            raw: false,
            contentType: 'text/plain',
            server: 'https://hastebin.com'
            }).then(bin => {message.channel.send(bin)})
    }
}