require('dotenv').config();  
const { Client, GatewayIntentBits } = require('discord.js');  
const playSoundCloud = require('./commands/playSoundCloud');  

const client = new Client({  
    intents: [  
        GatewayIntentBits.Guilds,  
        GatewayIntentBits.GuildMessages,  
        GatewayIntentBits.GuildVoiceStates  
    ]  
});  

const GUILD_ID = process.env.DISCORD_GUILD_ID || 'id_padrao';  
const COMMAND_PREFIX = process.env.COMMAND_PREFIX || '!';  

client.on('ready', () => {  
    console.log(`Logged in as ${client.user.tag}!`);  
    const guild = client.guilds.cache.get(GUILD_ID);  
    if (!guild) console.log('Guild not found. Please check the DISCORD_GUILD_ID in .env');  
});  

client.on('messageCreate', message => {  
    if (!message.guild || message.guild.id !== GUILD_ID) return;  

    // Check if the message starts with the defined prefix and command  
    if (message.content.startsWith(`${COMMAND_PREFIX}play`)) {  
        playSoundCloud(client, message);  
    }  
});  

client.login(process.env.DISCORD_BOT_TOKEN);