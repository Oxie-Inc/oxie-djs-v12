const Discord = require('discord.js');
const ms = require('ms');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            const time = args.slice(1).join(' ');

            if(!time) return message.reply('Veuillez mettre un temps à votre timeout !');

            const user = message.mentions.users.first();
            const milliseconds = ms(time);

            if(!user) return message.reply('Veuillez mentionner un utilisateur !');
            if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
                return message.reply('Vous ne pouvez pas mettre cette durée !');
            }

            const iosTime = new Date(Date.now() + milliseconds - 120).toISOString();

            try {
                await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ communication_disabled_until: iosTime }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bot ${config.token}`,
                    },
                });

                message.channel.send(`${user.username} à été timeout pendant ${time}`);
            } catch(err) {
                console.log(err)
                message.channel.send('Je n\'ai pas réussi à établir une connexion avec l\'api ! Désolé.');
            }
        }
    },
    name: 'timeout',
    help: {
        description: 'Permet de timeout un utilisateur.',
        syntax: '<@member> <temps>'
    }
}