module.exports = {
    name: 'help',
    aliases: ['link','links','vote','invite','support'],
    async execute(client,message) {
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
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info).setFooter('Syntax: <> = required, [] = optional'));
}    }
}
