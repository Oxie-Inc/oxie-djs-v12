const Discord = require('discord.js');
const backup = require('discord-backup');
const config = require('../../config.json');

module.exports = {
    run: async(message, args) => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            backup.create(message.guild, { maxMessagesPerChannel: 5 }).then((backupData) => {
                message.channel.send('Backup créée ! Voici l\'id : `' + backupData.id + '` Utilisez ` backup-load ' + backupData.id + '` pour charger la backup sur un autre serveur !');
            }).catch(() => {
                message.channel.send(':x: Une erreur venant du serveur Discord API');
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'backup-create',
    help: {
        description: 'Permet de créer une sauvegarde du serveur pour pouvoir le recopier sur un autre serveur.'
    }
}