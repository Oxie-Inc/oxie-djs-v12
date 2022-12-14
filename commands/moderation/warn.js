const Discord = require('discord.js');
const config = require('../../config.json');
const fs = require('fs');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            const member = message.mentions.members.first();
            if(!member) return message.reply('Veuillez mentionner le membre à warn.');
            if(member.id === message.guild.ownerID) return message.reply('Vous ne pouvez pas warn le propriétaire du serveur.');
            if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre.');
            const reason = args.slice(1).join(' ');
            if(!reason) return message.reply('Veuillez indiquer une raison.');
            if(!client.db.warns[member.id]) client.db.warns[member.id] = [];
            client.db.warns[member.id].unshift({
                reason,
                date: Date.now(),
                mod: message.author.id,
                guild: message.guild.id
            });
            fs.writeFileSync('./db.json', JSON.stringify(client.db));
            message.channel.send(`${member} a été warn pour ${reason} !`);
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'warn',
    help: {
        description: 'Cette commande permet d\'avertir un membre.',
        syntax: '<@membre> <raison>'
    }
}