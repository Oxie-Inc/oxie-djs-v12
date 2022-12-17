const Discord = require('discord.js');
const config = require('../../config.json');
const sa = require('superagent');

module.exports = {
    run: async(message, args) => {
        if(!message.channel.nsfw) return message.reply('Veuillez activer l\'nsfw sur votre channel !');

        var loading = new Discord.MessageEmbed().setDescription('En cours de chargement...').setTimestamp();

        message.channel.send(loading).then(embed => {
            sa.get('https://nekobot.xyz/api/image').query({ type: 'boobs' }).end((err, req) => {
                if(err) throw err;

                var e = new Discord.MessageEmbed().setDescription('Image boobs').setImage(req.body.message).setTimestamp();
                embed.edit(e);
            })
        })
    },
    name: 'boobs',
    help: {
        description: 'Commande nsfw'
    }
}