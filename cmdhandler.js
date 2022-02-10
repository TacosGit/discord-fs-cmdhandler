//  index.js  (Or main file.)

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
// Change the intents as whatever you want.

client.on("messageCreate", async (message) => {
  // Your variables that will work on the commands.
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  
  const fs   = require("fs");
  const path = require("path");
  
  cmdhandler("./commands", []); //  cmdhandler(folder, deniedFiles)  Denied files will not execute.
  cmdhandler("./commands/other", []); // You can execute other folder.
  
  function cmdhandler() { // Here's the algorithm of the command handler, enjoy it ^^
      toDir = folder;
      if (toDir.charAt(toDir.length) === "/") toDir.charAt(toDir.length) = null;
      const directoryPath = path.join(__dirname, toDir);

      fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log('Cannot scan file: ' + err);
      }
      files.forEach(async function (file) {
        if (file.endsWith(".js") && !denied.includes(file)) {
        try {
          content = fs.readFileSync(`${folder}/${file}`, "utf8");
          eval(`(async () => {${content.replace("stopScript();", "throw \"\"")}})()`);
        } catch(err) {
          console.error(err);
        }
    }

            });
        });
  }
  
});

client.login("Your token");

//  commands/ping.js  (The file name doesn't matter it can be ".txt" or whatever you want.)

if (args[0] === "ping") { // You can check here the command as whatever you want.
  message.channel.send("Pong!")
}
