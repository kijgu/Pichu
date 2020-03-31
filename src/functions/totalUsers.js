module.exports = {
    name: 'totalUsers',
    execute: (client) => {
        let userCount = 0;
        client.guilds.cache.forEach(g => userCount += g.memberCount)
        return userCount.toLocaleString()
    }
}