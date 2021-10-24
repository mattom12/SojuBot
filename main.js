// Project: SojuBot
// Author: Matthew Tom
// Date: 8/4/2021
// Version: 1.1.0

//================ Server Port ======================//
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Connecting to port.'));

app.listen(port, () => console.log("Port connected."));

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

const recruit = require(`./commands/recruit.js`)

//=============== Constants Loaded =================//

// Bot is ready
client.once('ready',() => {
    console.log('Soju is ready!');
});

//===================== Welcome Handler ======================//
client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Recruit');

    guildMember.roles.add(welcomeRole);
    // Channel set to for-new-recruits
    guildMember.guild.channels.cache.get('790449629933207572').send(`Welcome <@${guildMember.user.id}> to our server! To get you processed in, type -recruit to get started.`);
    guildMember.setNickname(`Pvt. ${guildMember.user.username}`)
});

//================= Accessable Commands =====================//
// Check if user sent message using prefix; ensure that bot cannot use commands
// Ignore messages without prefix
client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const is_recruit = message.member.roles.cache.has('872260025370964008');
    const is_op = message.member.roles.cache.has('820576392193376256'); // Operator
    const is_hc = message.member.roles.cache.has('470814564288692224'); // High Command
    const is_dc = message.member.roles.cache.has('539627875876208651'); // Division Command

    // List of accessable commands
    if(command === 'help') {
        client.commands.get('help').execute(message, args, Discord);
    } else if (command === 'setrole' && (is_op || is_hc || is_dc)) {
        client.commands.get('setrole').execute(message, args, Discord, client);
    } else if (command === 'recruit' && (is_recruit || is_hc || is_dc || is_op)) {
        client.commands.get('recruit').execute(message, args, Discord, client);
    } else {
        message.channel.send('You do not have access to this command!');
    }
});

// Token needs to be changed later and hidden
client.login(config.token);
