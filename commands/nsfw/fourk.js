const { MessageEmbed } = require('discord.js');
const NsfwRequire = require('nsfw-discord');
const nsfw = new NsfwRequire();

module.exports = {
    run: async(message, args, client) => {
        const embed = new MessageEmbed().setImage(await nsfw.fourk()).setDescription('Image Fourk').setTimestamp();
        message.channel.send(embed);
    },
    name: 'fourk',
    help: {
        description: 'Commande nsfw'
    }
}