const { MessageEmbed } = require('discord.js');
const NsfwRequire = require('nsfw-discord');
const nsfw = new NsfwRequire();

module.exports = {
    run: async(message, args, client) => {
        const embed = new MessageEmbed().setImage(await nsfw.hentaiass()).setDescription('Image Hentai Ass').setTimestamp();
        message.channel.send(embed);
    },
    name: 'hentaiass',
    help: {
        description: 'Commande nsfw'
    }
}