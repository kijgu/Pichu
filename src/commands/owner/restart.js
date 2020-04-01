
let exec = require("child_process").exec

module.exports = {
  name: "restart",
  category: 'owner',
  usage: 'pichu restart',
  description: "It's a cool command!",
  async execute(client,message) {
message.channel.send('Never gonna give you up, never gonna let you down, never gonna run around and restart! see u later :3').then(() => {
  exec('pm2 restart pichu', function () {
    return;
  });
});
},
};
