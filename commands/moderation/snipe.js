const { Message, Client, MessageEmbed } = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');

module.exports = {

    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */

    run: async(message, args, client) => {
        // if(message.member.permissions.has('MANAGE_MESSAGES')) return;

        const snipes = client.snipes.get(message.channel.id);
        if(!snipes) return message.reply('Aucun n\'a été supprimé précédament !');

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe];
        if(!target) return message.reply(`Il n'y à que ${snipes.length} message(s) qui à été snipe !`);

        const { msg, time, image } = target;
        message.channel.send(
            new MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                .setDescription(msg.content)
                .setImage(image)
                .setFooter(`${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`)
                .setColor('RANDOM')
        );
    },
    name: 'snipe',
    help: {
        description: 'Permet de voir le dernier message supprimé !'
    }
}