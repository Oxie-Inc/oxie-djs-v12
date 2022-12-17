const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
                const embed = new MessageEmbed().setTitle('Poker').setDescription('Vous permet de jouer sur discord, avec ou sans vos amis !').setColor('RED');
                const WatchButton = new MessageButton().setLabel('Jouer').setStyle('url').setURL(`${invite.code}`);

                return message.channel.send(embed, { buttons: [WatchButton] });
            });
        } else {
            message.reply('Veuillez vous connecter dans un channel vocal !');
        }
    },
    name: 'poker',
    help: {
        description: 'Permet de faire un poker tout seul ou à plusieurs'
    }
}