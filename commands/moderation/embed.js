const { Client, ReactionCollector, MessageEmbed, Message } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    run: async(message, args, client) => {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            message.delete();
            let embedBeforeEdit = new MessageEmbed().setDescription('** **');
            
            let msgEmbedForEditing = await message.channel.send(embedBeforeEdit);
            const msgwait = await message.channel.send('Chargement...');
            
            await Promise.all(['âī¸', 'đŦ', 'đĩī¸', 'đģ', 'đŗ', 'đ', 'đŧī¸', 'đ', 'đĩ', 'âŠī¸', 'đĨ', 'â', 'đ', 'â'].map(r => msgwait.react(r)));
            
            const embed = new MessageEmbed()
                .setColor('#cf1717')
                .setTimestamp()
                .setFooter(client.user.tag, client.user.displayAvatarURL({dynamic: true, size: 512}))
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 512}))
                .setDescription(`Bienvenue sur le menu d'Embed ! \n Cliquez sur les reactions pour pouvoir personnaliser votre Embed !`)
                .setTitle("Embed Builder Command")
                .addField("ī¸âī¸", "Permet de modifier le Titre", true)
                .addField("đŦ", "Permet de modifier la Description", true)
                .addField("đĩī¸", "Permet de modifier l'Auteur", true)
                .addField("đģ", "Permet de modifier le footer", true)
                .addField("đŗ", "Permet de modifier le Thumbnail", true)
                .addField("đ", "Permet d'jouter un Timestamp", true)
                .addField("đŧī¸", "Permet de modifier l'Image", true)
                .addField("đ", "Permet de modifier l'Url", true)
                .addField("đĩ", "Permet de modifier la Couleur", true)
                .addField("âŠī¸", "Permet d'ajouter un Field", true)
                .addField("â", "Permet d'envoyer l'Embed", true)
                .addField("â", "Permet d'annuler l'Embed", true)
            await msgwait.edit(embed);

            const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
            const filterMessage = (m) => m.author.id === message.author.id && !m.author.bot;
            const collectorReaction = await new ReactionCollector(msgwait, filterReaction);
            collectorReaction.on('collect', async reaction => {
                switch (reaction._emoji.name) {
                    case 'âī¸':
                        const msgQuestionTitle = await message.channel.send('âī¸ Quel est votre titre ?');
                        const title = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionTitle.delete();
                        embedBeforeEdit.setTitle(title.content);
                        title.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đŦ':
                        const msgQuestionDescription = await message.channel.send('đŦ Quel est votre description ?');
                        const description = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionDescription.delete();
                        embedBeforeEdit.setDescription(description.content);
                        description.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đĩī¸':
                        const msgQuestionAuthor = await message.channel.send('đĩī¸ Quel est votre author ?');
                        const author = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionAuthor.delete();
                        embedBeforeEdit.setAuthor(author.content);
                        author.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đģ':
                        const msgQuestionFooter = await message.channel.send('đģ Quel est votre footer ?');
                        const footer = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionFooter.delete();
                        embedBeforeEdit.setFooter(footer.content);
                        footer.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đŗ':
                        const msgQuestionThumbnail = await message.channel.send('đŗ Quel est votre thumbnail ?');
                        const thumbnail = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if (!thumbnail.content.includes('http') || !thumbnail.content.includes('https')) return message.channel.send('Thumbnail Incorrect.');
                        msgQuestionThumbnail.delete();
                        embedBeforeEdit.setThumbnail(thumbnail.content);
                        thumbnail.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đ':
                        embedBeforeEdit.setTimestamp();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đŧī¸':
                        const msgQuestionImage = await message.channel.send('đŧī¸ Quel est votre image ?');
                        const image = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        if (!image.content.includes('http') || !image.content.includes('https')) return message.channel.send('Image incorrect');
                        msgQuestionImage.delete();
                        embedBeforeEdit.setImage(image.content);
                        image.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đ':
                        const msgQuestionURL = await message.channel.send('đ Quel est votre URL ?');
                        const URL = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionURL.delete();
                        embedBeforeEdit.setURL(URL.content);
                        URL.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'đĩ':
                        const msgQuestionColor = await message.channel.send('đĩ Quel est votre couleur ?');
                        const Color = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionColor.delete();
                        embedBeforeEdit.setColor(Color.content);
                        Color.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'âŠī¸':
                        const msgQuestionField = await message.channel.send('âŠī¸ Quel est le titre de votre field ?');
                        const FieldTitle = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionField.delete();
                        const msgQuestionFieldDescription = await message.channel.send('âŠī¸ Quel est la description de votre field ?');
                        const FieldDescription = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionFieldDescription.delete();
                        embedBeforeEdit.addField(FieldTitle, FieldDescription);
                        FieldTitle.delete();
                        FieldDescription.delete();
                        msgEmbedForEditing.edit(embedBeforeEdit);
                    break;
                    case 'â':
                        const msgQuestionChannel = await message.channel.send('â Quel est le channel ID ?')
                        const channelID = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                        msgQuestionChannel.delete();
                        if (!channelID || !(channel = message.guild.channels.resolve(channelID.content))) return message.channel.send('Salon Invalide.');
                        channel.send(embedBeforeEdit);
                    break;  
                    case 'â':
                        msgEmbedForEditing.delete(embedBeforeEdit);
                        msgwait.delete();
                        message.delete();
                        message.channel.send("â L'embed a bien ÃŠtÃŠ annulÃŠ.").then(msg => msg.delete({ timeout: 3000 }));
                    break;
                }
            });
        } else {
            message.channel.send(config.noperms);
        }
    },
    name: 'embed',
    help: {
        description: 'Permet de crÃŠer un embed',
    }
}