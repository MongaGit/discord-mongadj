const { Client, GatewayIntentBits } = require('discord.js');
const { PREFIX, TOKEN } = require('dotenv').config().parsed;
const playSoundCloud = require('./commands/playSoundCloud');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        const url = args[0];
        if (!url) {
            return message.reply('You need to provide a URL!');
        }
        await playSoundCloud(message, url);
    } else if (command === 'pause') {
        // Pausar a música (essa funcionalidade precisa ser adicionada)
        message.reply('Pausing the music...');
    } else if (command === 'stop') {
        // Parar a música (essa funcionalidade precisa ser adicionada)
        message.reply('Stopping the music...');
    }
});

client.login(TOKEN);
