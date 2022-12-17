const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client, db) => {
        if(message.member.hasPermission('MANAGE_GUILD')) {
            if(!args[0]) return message.reply('Veuillez indiquer du texte');

            db.query(`SELECT * FROM oxie_servers WHERE guildID = ${message.guild.id}`, async(err, req) => {
                if(err) throw err;

                message.delete();

                message.channel.send("Say: " + message.content.trim().slice(`${req[0].prefix}say`.length));
            });
        }
    },
    name: 'say',
    help: {
        description: 'Cette commande permet de faire parler le bot.',
        syntax: '<message>'
    }
}