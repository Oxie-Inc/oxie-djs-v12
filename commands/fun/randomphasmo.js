const { Client, Message, MessageEmbed } = require("discord.js");

const Items = [];
const Maps = [];
const Dificulty = [];

// Items
let a = ":radio: Spirit Box";
let b = ":thermometer: Thermomètre";
let c = ":bell: EMF";
let d = ":book: Livre Fantomatique";
let e = ":movie_camera: Caméra Vidéo";
let f = ":flashlight: Lampe UV";
let g = ":cross: Crucifix";
let h = ":camera: Appareil Photo";
let i = ":lacrosse: Bâton d'Encens";
let j = ":salt: Sel";
let k = ":video_camera: Caméra Frontale";
let l = ":candle: Bougie";
let m = ":trackball: Projecteur DOTS";
let n = ":satellite: Microphone Parabolique";
let o = ":vertical_traffic_light: Détecteur de Mouvement";
let p = ":flashlight: Lampe Puissante";
let q = ":flashlight: Lampe de Poche";
let r = ":vertical_traffic_light: Capteur de Son";
let s = ":telescope: Trépied";
let t = ":fire_extinguisher: Briquet";
let u = ":bulb: Bâton Lumineux";

// Maps
let m_a = ":office: Asylum";
let m_b = ":sunrise_over_mountains: Bleasdale Farmhouse";
let m_c = ":tent: Grafton Farmhouse";
let m_d = ":school: Brownstone High School";
let m_e = ":house: Tanglewood Street House";
let m_f = ":house_with_garden: Ridgeview Road House";
let m_g = ":pirate_flag: Prison";
let m_h = ":homes: Edgefield Street House";
let m_i = ":house_abandoned: Willow Street House";
let m_j = ":camping: Maple Lodge Campsite";

// Dificulty
let d_a = "Amateur";
let d_b = "Intermédiaire";
let d_c = "Professionnel";
let d_d = "Cauchemar";

// Registry
Items.push(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u);
Maps.push(m_a, m_b, m_c, m_d, m_e, m_f, m_g, m_h, m_i, m_j);
Dificulty.push(d_a, d_b, d_c, d_d);

module.exports = {
    /**
     * @param {Message} message 
     * @param {String[]} args
     * @param {Client} client 
     */

    run: async(message, args, client) => {
        const Embed = new MessageEmbed();

        let NumbersOfPersons = args[0];
        let NumbersOfItems = args[1];

        if(!NumbersOfPersons) return message.reply('Veuillez indiquer le nombre de personnes !');
        if(!NumbersOfItems) return message.reply('Veuillez mettre un nombre d\'item inferieur à 5 !');

        if(NumbersOfPersons > 4 || NumbersOfPersons < 1) return;
        if(NumbersOfItems > 5 || NumbersOfItems < 2) return;

        for(var persons = 0; persons < NumbersOfPersons; persons++) {
            let EmbedItems = [];

            for(var bf = 0; bf < NumbersOfItems; bf++) {
                EmbedItems.push(Items[Math.floor(Math.random() * Items.length)]);
            }
            Embed.addField(`Joueur #${persons + 1}`, EmbedItems, true);
        }

        let DificultyInEmbed = Dificulty[Math.floor(Math.random() * Dificulty.length)];
        let MapInEmbed = Maps[Math.floor(Math.random() * Maps.length)];

        Embed.setDescription(`Dificultée : **${DificultyInEmbed}** \n Map : **${MapInEmbed}** \n\n Nombre de personne(s) : **${NumbersOfPersons}** \n Nombre d'item(s) par personnes : **${NumbersOfItems}**`)
            .setTitle("Phasmophobia Randomizer")
            .setColor('RANDOM');
        message.channel.send(Embed);
    },
    name: 'randomphasmo',
    help: {
        description: 'Permet d\'obtenir des items randoms sur phasmophobia'
    }
}