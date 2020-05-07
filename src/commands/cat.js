module.exports = {
    name: 'cat',
    async execute(client,message) {
        require('axios').get('https://api.thecatapi.com/v1/images/search').then(res => message.channel.send({embed: {image: {url: res.data[0].url}}}))
    }
}