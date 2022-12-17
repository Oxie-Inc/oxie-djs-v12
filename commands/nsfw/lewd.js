const { MessageEmbed } = require('discord.js');
const NsfwRequire = require('nsfw-discord');
const nsfw = new NsfwRequire();

module.exports = {
    run: async(message, args, client) => {
        const embed = new MessageEmbed().setImage(await nsfw.lewd()).setDescription('Image Lewd').setTimestamp();
        message.channel.send(embed);
    },
    name: 'lewd',
    help: {
        description: 'Commande nsfw'
    }
}