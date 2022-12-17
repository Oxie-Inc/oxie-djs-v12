const { Message } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    /**
     * @param {Message} message 
     * @param {String[]} args
     */

    run: async (message) => {
        const messageArray = message.content.split(' ');
        const args = messageArray.slice(1);

        if(message.member.hasPermission("MANAGE_CHANNELS")) {
            let amount;

            if(isNaN(args[0]) || parseInt(args[0]) <= 0) return message.reply('Veuillez mettre un nombre de message à supprimer !');

            if(parseInt(args[0]) > 99) {
                amount = 99;
                return message.reply('Vous avez demandé plus de 99 messages, mais je n\'est pu en supprimer que 99, désolé !');
            } else {
                amount = parseInt(args[0]);
            }
            
            await message.channel.bulkDelete(amount + 1, true).then((numbers) => {
                message.reply(`Il y a ${numbers.size} message(s) supprimé(s) ! :broom:`);
            }).catch(async err => {
                message.reply('Il y à eu une erreur quand j\'ai voulu supprimer le(s) message(s) !');
                console.log(err);
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'clear',
    help: {
        description: 'Permet de clear un channel, il sufit d\'indiquer le nombre de message à supprimer',
        syntax: '<nombre de message>'
    }
}