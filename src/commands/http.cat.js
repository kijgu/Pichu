module.exports = {
    name: 'http.cat',
    async execute(client,message,args) {
        if (!args.join(' ')) return message.channel.send('Please provide args!')
        let url = `https://http.cat/${args[0]}`
        function imageExists(image_url){
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var http = new XMLHttpRequest();
            http.open('HEAD', image_url, false);
            http.send();
            return http.status != 404;
        }
        let test = imageExists(url)
        if (!test) return message.channel.send('Image not found!')
        message.channel.send({embed: {image: {url: url}}})
    }
}