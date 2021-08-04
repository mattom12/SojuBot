const { MessageReaction } = require("discord.js");

module.exports = {
    name: 'setrole',
    description: "use emojis to set role",
    async execute(message, args, Discord, client) {
        const channel = '871885630865571881'
        const unionRole = message.guild.roles.cache.find(role => role.name === "Yankee");
        const rebelRole = message.guild.roles.cache.find(role => role.name === "Rebel");
        const brazilRole = message.guild.roles.cache.find(role => role.name === "Brazil");
        
        const unionEmoji = '🇱';
        const rebelEmoji = '🏳️';
        // const brazilEmoji = '<:bless:785219450554417192>';
        const brazilEmoji = client.emojis.cache.get('785219450554417192');

        let embed = new Discord.MessageEmbed()
        .setColor('#458B00')
        .setTitle('Recruit Processing')
        .setURL('https://www.youtube.com/watch?v=oJ3bzg-Tvt4')
        .setDescription('Morgan Freeman joined the Union, and so should you.\n\n'
            + `${unionEmoji} if you can tell the difference between blue and purple.\n`
            + `${rebelEmoji} if you want to have a plantation after the war.\n`
            + `${brazilEmoji} if you want to be sent to Brazil.`)
        .setImage('https://th.bing.com/th/id/OIP.tG2uwBbNTbrQTDzuruG2IgHaE8?w=279&h=186&c=7&o=5&dpr=1.25&pid=1.7');

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(unionEmoji);
        messageEmbed.react(rebelEmoji);
        messageEmbed.react(brazilEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            // console.log('0');
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            // console.log('1', reaction.message.channel.id === channel)
            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === unionEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(unionRole);
                }
                // console.log('2', reaction.emoji.id === brazilEmoji.id);
                if (reaction.emoji.id === brazilEmoji.id) {
                    // console.log('3');
                    await reaction.message.guild.members.cache.get(user.id).roles.add(brazilRole);
                }
                if (reaction.emoji.name === rebelEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(rebelRole);
                }
            } else {
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === unionEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(unionRole);
                }
                if (reaction.emoji.id === brazilEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(brazilRole);
                }
                if (reaction.emoji.name === rebelEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(rebelRole);
                }
            } else {
                return;
            }
        });
    }
}