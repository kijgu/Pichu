module.exports = {
    name: 'dog',
    async execute(client,message) {
        require('axios').get('https://api.thedogapi.com/v1/images/search').then(res => message.channel.send({embed: {image: {url: res.data[0].url}}}))
    }
}