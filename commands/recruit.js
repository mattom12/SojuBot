// Version 1.0.1

const { MessageReaction } = require("discord.js");

module.exports = {
    name: 'recruit',
    description: "processing new arrivals to the server",
    async execute(message, args, Discord, client) {
        const channel = '790449629933207572' // currently set to for-new-recruits
        const armyRole = message.guild.roles.cache.find(role => role.name === "Army of the Tennessee");
        const recRole = message.guild.roles.cache.find(role => role.name === "Recruit");

        const armyEmoji = client.emojis.cache.get('785197953068957756');

        let embed = new Discord.MessageEmbed()
        .setColor('#458B00')
        .setTitle('Recruit Processing')
        .setURL('https://docs.google.com/document/d/14UIUuTKZhOot0dzsbd8f2ZGZKBkBXC3de7ljFOHhm_o/edit?usp=sharing')
        .setDescription('Click the link above if you would like to read what our server is about!\n\n'
            + `Otherwise, react to ${armyEmoji} if you're ready to be enlisted.`)
        .setImage('https://th.bing.com/th/id/OIP.tG2uwBbNTbrQTDzuruG2IgHaE8?w=279&h=186&c=7&o=5&dpr=1.25&pid=1.7');

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(armyEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.id === armyEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(armyRole);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(recRole);
                }
            } else {
                console.log("-1")
                return;
            }
        });
    }
}