require('dotenv').config()
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Credits: https://stackoverflow.com/a/50718516
function attachIsImage(msgAttach) {
  var url = msgAttach.url;
  //True if this url is a png image.
  return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  console.log(message.content)
  if(!message.content.startsWith('n!')) return
  
  const command = message.content.split('n!')[1].split(' ')[0]
  const ext = message.content.split('n!')[1].split(' ')[0].slice(1)

  if(command === 'ping') {
    message.channel.send('pong!')
  }

  // TODO: Check if the person want to setup

  // TODO: IF MESSAGE CONTAINS A FILE
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)){

      message.attachments()
      https.get(url, async (res) => {
        // Image will be stored at this path
        const path = `${__dirname}/files/${url.split('/').slice(-1)[0]}`; 
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish', async () => {
            filePath.close();
            console.log('Download Completed, starting scanning.'); 
            try {
    
            const results = await nsfwrest.scanFileLocation(path)
            console.log(results)
            if(results) {
                fs.unlinkSync(path)
                if (results.guess.nsfw === true) {
                  // TODO: Delete the message and put it in a log channel
                }
            }
          } catch (e) {
            // TODO: Check what kind of error and act based on that.
    
          }
        })
      })
    }
}
});

client.login(process.env.BOT_TOKEN);