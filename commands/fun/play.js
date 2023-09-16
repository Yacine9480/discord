const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Jeu du bon nombre !'),
	async execute(message) {

            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Some title')
                .setURL('https://discord.js.org/')
                .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                .setDescription('Some description here')
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
             
                .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
                .setTimestamp()
                .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    
            message.channel.send({ embeds: [exampleEmbed] });
    
    
            let randomNumber = Math.floor(Math.random() * 25) + 1;
            let essai = 5;
    
            const collector = message.channel.createMessageCollector({
                filter: (response) => {
                    return !response.author.bot && response.content.startsWith('!');
                },
                time: 60000
            }); 
    
            collector.on('collect', m => {
                console.log(`Collected ${m.content}`);
    
                const userGuess = parseInt(m.content);
                if (!isNaN(userGuess) && userGuess === randomNumber) {
                    message.reply({content:'Vous avez trouvé le bon nombre !', ephemeral: true });
                    collector.stop();
                } else {
                    essai--;
                    if (essai === 0) {
                        message.reply(`Vous avez perdu, le bon nombre était ${randomNumber} !`);
                        collector.stop();
                    } else {
                        message.reply(`Il ne vous reste que ${essai} vie(s) `);
                    }
                }
            });
    
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });
	},
};