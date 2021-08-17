require('dotenv').config();
const { Client, Intents } = require('discord.js');
const https = require('https');
const fs = require('fs');
const nsfwrest = require('nsfw-rest-js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Modified by: Julian Williams (17/08/2021)
function attachIsImage(url) {
  // Array of supported image extensions
  const supported = ['.png', '.jpg', '.webp', '.jpeg'];
  // Trim url down to only the extension.
  var ext = '.' + url.split(/[#?]/)[0].split('.').pop().trim();
  // If the extension is in the list of supported extensions, return true.
  if (supported.includes(ext)) {
    console.log('Image Detected and Supported!');
    return true;
  } else {
    console.log('No Image Detected or Image Not Supported!');
    return false;
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('n!')) {
    const command = message.content.split('n!')[1].split(' ')[0];
    const ext = message.content.split('n!')[1].split(' ')[0].slice(1);

    if (command === 'ping') {
      message.channel.send('pong!');
    }

    // TODO: Check if the person want to setup
  }

  // If message contains a file
  if (message.attachments.size > 0) {
    // For each attachment
    message.attachments.each((attach) => {
      // Check if the attachment is an image
      if (attachIsImage(attach.url)) {
        var url = attach.url;
        // Download the file from the url
        https.get(url, async (res) => {
          // Image will be stored at this path
          const path = `${__dirname}/files/${url.split('/').slice(-1)[0]}`;
          // The place to write the file to
          const filePath = fs.createWriteStream(path);
          res.pipe(filePath);
          // If the file is done downloading
          filePath.on('finish', async () => {
            filePath.close();
            console.log('Download Completed, starting scanning.');
            try {
              const results = await nsfwrest.scanFileLocation(path);
              console.log(results);
              if (results) {
                // Delete the file after it has been scanned
                fs.unlinkSync(path);
                if (results.guess.nsfw === true) {
                  // TODO: Delete the message and put it in a log channel
                  message.delete(1);
                  message.channel.send('You naughty person!');
                } else {
                  message.channel.send("I guess that's safe...");
                }
              }
            } catch (e) {
              // TODO: Check what kind of error and act based on that.
              console.error(e);
            }
          });
        });
      }
    });
  }
});

client.login(process.env.BOT_TOKEN);
