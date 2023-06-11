// const eris = require('eris');
// const fs = require('fs')
//
// console.log('testing');
// // Create a Client instance with our bot token.
// const bot = new eris.Client('MTExNzUwODMyNzg5OTkzODg0Ng.GMoRy0.nS5Mvk2WenaSDQ0fEHRjTmSb1zMLhHbuBP8Qqk');
//
// // When the bot is connected and ready, log to console.
// bot.on('ready', () => {
//    console.log('Connected and ready.');
// });
//
// // Every time a message is sent anywhere the bot is present,
// // this event will fire and we will check if the bot was mentioned.
// // If it was, the bot will attempt to respond with "Present".
// bot.on('messageCreate', async (msg) => {
//    const botWasMentioned = msg.mentions.find(
//        mentionedUser => mentionedUser.id === bot.user.id,
//    );
//
//    if (botWasMentioned) {
//        try {
//          //await msg.channel.createMessage('Present');
//            fs.readFile( 'broodlord-1.png', (err, f)=> {
//              console.log(f)
//             msg.channel.createMessage({file: {name: 'broodlord.pdf', file: f}})
//           })
//        } catch (err) {
//            // There are various reasons why sending a message may fail.
//            // The API might time out or choke and return a 5xx status,
//            // or the bot may not have permission to send the
//            // message (403 status).
//            console.warn('Failed to respond to mention.');
//            console.warn(err);
//        }
//    }
// });
//
// bot.on('error', err => {
//    console.warn(err);
// });
//
// bot.connect();

const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

const files = []
fs.readdir('datasheets', (err, directory) => {
  directory.forEach(file => {
    console.log(file)
    files.push(file)
  });
});
console.log(files)

client.on("message", msg => {
  if (msg.content.match(/\{\{.*\}\}/)) {
    let r = msg.content.match(/\{\{(.*)\}\}/)
    if (r[1] == 'you'){
      msg.channel.send({ files: [{ attachment: 'ahriman.png' }] });
    }else if (r[1].length >= 3 && r[1] != 'png' && r[1] != '.png'){
      files.forEach((item, i) => {
        if(item.includes(r[1])){
          msg.channel.send({ files: [{ attachment: 'datasheets/'+item }] });
        }
      });
    }
  }
})

client.login('MTExNzUwODMyNzg5OTkzODg0Ng.GMoRy0.nS5Mvk2WenaSDQ0fEHRjTmSb1zMLhHbuBP8Qqk')
