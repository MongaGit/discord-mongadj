const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const scdl = require('soundcloud-downloader').default;

async function playSoundCloud(voiceChannel, url, message) { // Inclua `message` como parâmetro  
    if (!voiceChannel) {
        return message.reply('You need to be in a voice channel to play music.');
    }

    try {
        const stream = await scdl.download(url);
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();
        player.play(resource);

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });

        connection.subscribe(player);

        player.on('idle', () => {
            connection.destroy();
        });

        message.reply('Playing your SoundCloud track!');
    } catch (error) {
        console.error(error);
        message.reply('Failed to play the track. Please check the URL and try again.');
    }
}

module.exports = playSoundCloud;  