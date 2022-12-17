const { MessageEmbed } = require('discord.js');
const NsfwRequire = require('nsfw-discord');
const nsfw = new NsfwRequire();

module.exports = {
    run: async(message, args, client) => {
        const embed = new MessageEmbed().setImage(await nsfw.anal()).setDescription('Image Anal').setTimestamp();
        message.channel.send(embed);
    },
    name: 'anal',
    help: {
        description: 'Commande nsfw'
    }
}