// Version 1.0.0

module.exports = {
    name: 'help',
    description: "list all possible commands",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#04466E')
        .setTitle('Available Commands')
        .setDescription('Some commands may only be accessed if you are of certain rank.')
        .setThumbnail('https://www.pngkey.com/png/detail/358-3581742_great-seal-of-the-united-states-union-seal.png')
        .addFields(
            {name: 'High Command & Operator', value: '-setrole'},
            {name: 'Recruit', value: '-recruit'}
        )
        .setFooter('Ask @Gen. Sherman for further assistance.')
        message.channel.send(newEmbed)
    }
}
