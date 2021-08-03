//=============== Bot Program Start ================//

const config = require('./config.json');

// Uses Discord API
const Discord = require('discord.js');

// Creates the bot
const client = new Discord.Client({partials:["MESSAGE", "CHANNEL", "REACTION"]});

// Access other js files
const fs = require('fs')

// Access collection of commands from "commands" folder (all as js files)
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// Assign prefix for bot command
const prefix = "-";

//=============== Constants Loaded =================//

// Bot is ready
client.once('ready',() => {
    console.log('Soju is ready!');
});

// Check if user sent message using prefix; ensure that bot cannot use commands
// Ignore messages without prefix
client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // List of accessable commands
    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command == 'setrole') {
        client.commands.get('setrole').execute(message, args, Discord, client);
    }
});

// Token needs to be changed later and hidden
client.login(config.token);
