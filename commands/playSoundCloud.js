const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const scdl = require('soundcloud-downloader').default;

async function playSoundCloud(interaction, url) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
        return interaction.reply({ content: 'You need to be in a voice channel to play music!', ephemeral: true });
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

        await interaction.reply({ content: 'Playing your SoundCloud track!' });
    } catch (error) {
        console.error(error);
        interaction.reply({ content: 'Failed to play the track. Please check the URL and try again.', ephemeral: true });
    }
}

module.exports = playSoundCloud;
