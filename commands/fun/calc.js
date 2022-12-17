const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
const config = require('../../config.json');

module.exports = {
    run: async (message, args) => {
        try {
            message.channel.send(
                new MessageEmbed()
                    .addField('Le calcul', args.join(' '))
                    .addField('Réponse / Résultat', math.evaluate(args.join(' ')))
            );
        } catch(err) {
            message.reply('Votre calcule n\'est pas correcte !');
        }
    },
    name: 'calc',
    help: {
        description: 'Permet de faire des calcules.'
    }
}