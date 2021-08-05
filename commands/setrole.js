const { MessageReaction } = require("discord.js");

module.exports = {
    name: 'setrole',
    description: "use emojis to set role based on games people play",
    async execute(message, args, Discord, client) {
        const channel = '871885630865571881' // Set to BotOps

        // Set roles from the server
        const leagueRole = message.guild.roles.cache.find(role => role.name === "League");
        const valRole = message.guild.roles.cache.find(role => role.name === "Valorant");
        const apexRole = message.guild.roles.cache.find(role => role.name === "Apex");
        const genRole = message.guild.roles.cache.find(role => role.name === "Genshin");
        const barRole = message.guild.roles.cache.find(role => role.name === "Barotrauma");
        const tf2Role = message.guild.roles.cache.find(role => role.name === "Team Fortress 2");
        
        // Get custom emojis from the server
        const leagueEmoji = client.emojis.cache.get('872631321787256943');
        const valEmoji = client.emojis.cache.get('872632564614037574');
        const apexEmoji = client.emojis.cache.get('872632966164123728');
        const genEmoji = client.emojis.cache.get('872635157516005467');
        const barEmoji = client.emojis.cache.get('872636294784765972');
        const tf2Emoji = client.emojis.cache.get('872661163589132360');

        let embed = new Discord.MessageEmbed()
        .setColor('#800813')
        .setTitle('Common Ground Gaming')
        .setAuthor(`Dedicated to the players of Sherman's March`)
        .setThumbnail('https://icon-library.com/images/teamfortress-2-icon/teamfortress-2-icon-23.jpg')
        .setDescription('A call to arms for the games we play. React if you would like to get pinged for them!')
        .addFields(
            {name: '<:league:872631321787256943> League of Legends', value: 'For the saltiest of players.', inline: true },
            {name: '\u200B', value: '\u200B' , inline: true },
            {name: '<:valorant:872632564614037574> Valorant', value: '5v5 tactical blindness and corner checking.', inline: true },
        )
        .addFields(
            {name: '<:apex:872632966164123728> Apex Legends', value: '3 man hot drop at Olympus.', inline: true },
            {name: '\u200B', value: '\u200B', inline: true },
            {name: '<:genshin:872635157516005467> Genshin Impact', value: 'Exploring the world of Teyvat while sinking money.', inline: true },
        )
        .addFields(
            {name: '<:barotrauma:872636294784765972> Barotrauma', value: 'Sinking and screaming to the bottom of Europa.', inline: true },
            {name: '\u200B', value: '\u200B', inline: true },
            {name: '<:teamfortress:872661163589132360> Team Fortress 2', value: 'A classic battle of Red versus Blue.', inline: true },
        )
        .setFooter('More games to be added upon request!');

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(leagueEmoji);
        messageEmbed.react(valEmoji);
        messageEmbed.react(apexEmoji);
        messageEmbed.react(genEmoji);
        messageEmbed.react(barEmoji);
        messageEmbed.react(tf2Emoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.id === leagueEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(leagueRole);
                }
                if (reaction.emoji.id === valEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(valRole);
                }
                if (reaction.emoji.id === apexEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(apexRole);
                }
                if (reaction.emoji.id === genEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(genRole);
                }
                if (reaction.emoji.id === barEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(barRole);
                }
                if (reaction.emoji.id === tf2Emoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(tf2Role);
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
                if (reaction.emoji.id === leagueEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(leagueRole);
                }
                if (reaction.emoji.id === valEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(valRole);
                }
                if (reaction.emoji.id === apexEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(apexRole);
                }
                if (reaction.emoji.id === genEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(genRole);
                }
                if (reaction.emoji.id === barEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(barRole);
                }
                if (reaction.emoji.id === tf2Emoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(tf2Role);
                }
            } else {
                return;
            }
        });
    }
}