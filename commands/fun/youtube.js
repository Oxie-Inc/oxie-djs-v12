const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
                const embed = new MessageEmbed().setTitle('YouTube Together').setDescription('Vous permet de regarder youtube sur discord, avec ou sans vos amis !').setColor('RED');
                const WatchButton = new MessageButton().setLabel('Regarder').setStyle('url').setURL(`${invite.code}`);

                return message.channel.send(embed, { buttons: [WatchButton] });
            });
        } else {
            message.reply('Veuillez vous connecter dans un channel vocal !');
        }
    },
    name: 'youtube',
    help: {
        description: 'Permet d\'aller sur youtube together'
    }
}