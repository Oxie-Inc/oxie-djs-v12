const Discord = require('discord.js');
const backup = require('discord-backup');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            const backupID = args.join(' ');

            if(!backupID) return message.channel.send(':x: Veuillez mettre un id valide de backup !');

            backup.fetch(backupID).then((backup) => {
                const date = new Date(backup.data.createdTimestamp);
                const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
                const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

                const embed = new Discord.MessageEmbed()
                    .setAuthor(':information_source: Backup', backup.data.iconURL)
                    .addField('Nombre de serveur', backup.data.name)
                    .addField('Taille', backup.size + ' kb')
                    .addField('Créé à', formattedDate)
                    .setFooter('Backup ID: ' + backup.id);
                return message.channel.send(embed);
            }).catch((err) => {

                if(err === 'No backup found') {
                    message.channel.send(':x: Aucune backup trouvé avec l\'id : ' + backupID + '!');
                } else {
                    message.channel.send(':x: Erreur : ' + (typeof err === 'string') ? err : JSON.stringify(err));
                }
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'backup-info',
    help: {
        description: 'Permet d\'avoir une information sur une backup créée.'
    }
}