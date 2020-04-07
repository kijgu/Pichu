const Discord = require('discord.js')
const { stripIndents } = require("common-tags");
module.exports = {
    name: "help",
    category: "utility",
    usage: "pichu help [command name]",
    description: "Shows you all existing Commands or Info about one single Command",
 async execute (client, message, args) {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new Discord.MessageEmbed()

        .setColor("RANDOM") 
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(", ");
    }

    const info = client.categories 
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}
//random color already exists
function getCMD(client, message, input) {
    const embed = new Discord.MessageEmbed()
    if (!client.commands.get(input.toLowerCase())){ 
        if (!client.aliases.get(input.toLowerCase())) return message.channel.send(`No information found for command **${input.toLowerCase()}**`)
    } //done
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.category) info += `\n**Category**: ${cmd.category}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info).setFooter('Syntax: <> = required, [] = optional'));
}