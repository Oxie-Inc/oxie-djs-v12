const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async message => {
        let mention = message.mentions.members.first();
        const channel = message.member.voice.channel;
        
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            if(!mention) {
                message.reply('Veuillez mentionner un utilisateur')
            } else {
                if(!channel) {
                    message.reply('Vous êtes dans aucun channel !');
                } else {
                    try {
                        mention.voice.setChannel(channel);
                        message.channel.send(`${mention} à été move dans ${channel}`);
                    } catch(err) {
                        message.reply(`Je n\'ai pas réussi à moove ${mention} !`);
                        console.log(err);
                    }
                }
            }
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'move',
    help: {
        description: 'Permet de move un utilisateur dans le channel ou vous êtes !',
        syntax: '<@member>'
    }
}