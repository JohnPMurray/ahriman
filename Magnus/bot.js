
const Discord = require("discord.js")
const difflib = require("difflib")
const fs = require("fs")
const client = new Discord.Client()


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.commands = new Discord.Collection();
const files = {}

fs.readdir('datasheets', (err, directory) => {
  directory.forEach(file => {
    name=file.match(/([^0-9]*)(\([0-9]\))?\.png/)
    console.log(name[1])
    if (files[name[1]]){
      console.log('second entry for ' + name[1])
      files[name[1]].push(file)
    }
    else{
      console.log('first entry for ' + name[1])
      files[name[1]] = [file]
    }
  });
});
console.log(files)

client.on("message", msg => {
  if (msg.content.match(/\{\{.*\}\}/)) {
    let r = msg.content.match(/\{\{(.*)\}\}/
  x
  )
    if (r[1] == 'you'){
      msg.channel.send({ files: [{ attachment: 'ahriman.png' }] });
    }else{
      console.log(Object.keys(files))
      console.log(r[1])
      upper=r[1].toUpperCase()

      matches = difflib.getCloseMatches(upper, Object.keys(files))
      console.log(matches)
      if (matches.length > 0){
        files[matches[0]].forEach((item, i) => {
          msg.channel.send({ files: [{ attachment: 'datasheets/'+item }] })
        })

      }else{
        msg.channel.send('answer unclear, ask again later');
      }

    }
  }
})



client.login('')
