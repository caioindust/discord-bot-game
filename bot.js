require('dotenv').config();
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const parseArgs = require('yargs-parser');
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
  console.log(`Bot foi iniciado, com ${bot.users.size} usuários, em ${bot.channels.size} canais, em ${bot.guilds.size} servidores.`);
  bot.user.setPresence({ game: { name: 'comando', type: 0, url: 'https://www.tibia.com/' } });
  //0 = Jogando
  //  1 = Transmitindo
  //  2 = Ouvindo
  //  3 = Assistindo
});

bot.on("message", async message => {

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const comando = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)[0].toLowerCase();

  if (comando.length === 0) return;

  const args = parseArgs(message.content.slice(process.env.PREFIX.length + comando.length).trim());

  let command = bot.commands.get(comando);
  if (!command) command = bot.commands.get(bot.aliases.get(comando));

  if (command) command.run(bot, message, args);

});

bot.login(process.env.DISCORD_TOKEN);
