module.exports = async (client,message) => {
    if (!message.guild || message.channel.type === "dm" || message.author === client.user || !message.content || message.webhookID) return;
    if (!message.content) return;
    client.snipes.set(message.channel.id, {
      content: message.content,
      user: message.author,
      timestamp: Date.now()
    })
}