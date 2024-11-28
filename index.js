require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const playSoundCloud = require('./commands/playSoundCloud');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (!message.guild || message.author.bot) return;

    console.log("Message ID: ", message.id);
    console.log("Channel: ", message.channel.name);
    console.log("Username: ", message.author.username);
    console.log("Message: ", message.content);

    if (message.content.startsWith(process.env.COMMAND_PREFIX)) {
        const commandBody = message.content.slice(process.env.COMMAND_PREFIX.length).trim();
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        if (command === 'play') {
            if (!message.member) {
                message.member = await message.guild.members.fetch(message.author.id);
            }
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                return message.reply('You need to be in a voice channel to play music!');
            }
            playSoundCloud(voiceChannel, args.join(' '), message); // Passando o objeto `message`  
        }  
    }
});

client.login(process.env.DISCORD_BOT_TOKEN); 