const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');  
const scdl = require('soundcloud-downloader').default;  
  
async function playSoundCloud(client, message) {  
    const url = message.content.split(' ')[1];  
    if (!url) return message.reply('Please provide a SoundCloud music URL.');  
  
    const channel = message.member.voice.channel;  
    if (!channel) return message.reply('You need to be in a voice channel to play music.');  
  
    try {  
        const stream = await scdl.download(url);  
        const resource = createAudioResource(stream);  
        const player = createAudioPlayer();  
        player.play(resource);  
  
        const connection = joinVoiceChannel({  
            channelId: channel.id,  
            guildId: channel.guild.id,  
            adapterCreator: channel.guild.voiceAdapterCreator  
        });  
  
        connection.subscribe(player);  
  
        player.on('idle', () => {  
            connection.destroy();  
        });  
    } catch (error) {  
        console.error(error);  
        message.reply('Failed to play the track. Please check the URL and try again.');  
    }  
}  
  
module.exports = playSoundCloud;
