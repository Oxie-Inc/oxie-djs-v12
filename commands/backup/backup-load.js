const Discord = require('discord.js');
const backup = require('discord-backup');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            const backupID = args.join(' ');

            backup.fetch(backupID).then(() => {
                message.channel.send(':warning: Attention tout va être reset : role, channel, etc... Voulez vous continuer ? Envoyer `-confirmer` or `annule`!');

                const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirmer', 'annule'].includes(m.content), {
                    time: 60000,
                    max: 1
                });

                collector.on('collect', (m) => {
                    const confirm = m.content === '-confirmer';
                    collector.stop();
                    if(confirm) {
                        backup.load(backupID, message.guild).then(() => {
                            return message.author.send('Backup chargée avec succés !');
                        }).catch((err) => {
                            if(err === 'Pas de backup trouvé') {
                                return message.channel.send(':x: Aucune backup trouvé avec l\'id : ' + backupID + '!');
                            } else {
                                return message.author.send(':x: Erreur : ' + (typeof err === 'string') ? err : JSON.stringify(err));
                            }
                        });
                    } else {
                        return message.channel.send(':x: Annulé.');
                    }
                });

                collector.on('end', (collected, reason) => {
                    if(reason === 'time') return message.channel.send(':x: Temps de commande fini ! Veuillez réessayer.');
                });
            }).catch(() => {
                return message.channel.send(':x: Aucune backup trouvé avec l\'id : ' + backupID + '!');
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'backup-load',
    help: {
        description: 'Permet de charger une backup sur un autre serveur.'
    }
}