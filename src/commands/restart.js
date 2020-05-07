
let exec = require("child_process").exec

module.exports = {
  name: "restart",
  ownerOnly: true,
  async execute(client,message) {
  message.channel.send('Never gonna give you up, never gonna let you down, never gonna run around and restart! see u later :3').then(() => {
  exec('pm2 restart 0', function () {
    return;
  });
});
},
};
