const { Client, Message } = require("discord.js");

/**
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = (client, message) => {
    if(message.type !== 'DEFAULT' || message.author.bot) return;
    
    const db = client.database;
    
    if(message.author.bot) return;
    
    db.query(`SELECT * FROM oxie_servers WHERE guildID = ${message.guild.id}`, async(err, req) => {
        if(err) throw err;
        
        if(req.length < 1) {
            let sql = `INSERT INTO oxie_servers (guildID, prefix) VALUES ('${message.guild.id}', 'o!')`;
            
            db.query(sql, function (err) {
                if(err) throw err;
            });

            return message.reply('Attendez, je suis en train d\'enregistrer votre serveur dans ma base de donnée !');   
        }

        try {
            let prefix = req[0].prefix;
            
            const args = message.content.trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            if(!commandName.startsWith(prefix)) return;
            const command = client.commands.get(commandName.slice(prefix.length));
            if(!command) return;
            command.run(message, args, client, db);
        } catch(err) {
            message.reply(err);
        }
        
        // try {
        //    if(message.mentions.has(message.guild.roles.everyone)) return;

        //    if(message.mentions.has(client.user)) return message.channel.send(`Mon prefix est **${req[0].prefix}**`);
        // } catch(err) {
        //    message.reply(err);
        // }
    });
};