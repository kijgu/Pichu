module.exports = {
    name: 'fox',
    async execute(client,message) {
        const { KSoftClient } = require('@ksoft/api');

const ksoft = new KSoftClient(client.config.tokens.ksoft);

    const { url } = await ksoft.images.random('fox');
    message.channel.send({embed: {image: {url: url}}}); // discord.js

    }
}