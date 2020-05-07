const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search')
module.exports = {
	name: "search",
	aliases: ['s'],
	async execute(client,message,args,dbl,messagecounter,queue) {
		const msg = message
		const searchString = args.slice(0).join(' ');
		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
		if (!searchString) return msg.channel.send("Please enter a search term.")
	

	
            let video;
            let m;
			        try {
                        var results = await yts(searchString)
                        var videos = await results.videos.slice(0, 10);
                        let index = 0
                        m=await message.channel.send(new Discord.MessageEmbed()
                        .setColor(0xffff00)
                        .setTitle('Song selection | Please give a number between 1 and 10')
                        .setDescription(videos.map(v => `${++index}- [${v.title}](${v.url})`))
                        .setFooter('You have 30 seconds to give a number'))
						try {
							response = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.content<11 && msg.content>0, {
							  max: 1,
							  time: 30000,
							  errors: ['time']
							});
						  } catch(e) {
							  m.delete()
							  message.channel.send('Time out!')
					 }
						video = videos[response.first().content-1]
					} catch (err) {
                        if (m) {m.delete()}
						console.error(err);
						return msg.channel.send('I couldn\'t find any results.');
					}
            if (m) {m.delete()}
			return handleVideo(video, msg, voiceChannel);
				
		async function handleVideo(video, msg, voiceChannel, playlist = false) {
				const serverQueue = queue.get(msg.guild.id);
				const song = {
					id: video.videoId,
					title: video.title,
					url: `https://www.youtube.com/watch?v=${video.videoId}`
				};
				if (!serverQueue) {
					const queueConstruct = {
						textChannel: msg.channel,
						voiceChannel: voiceChannel,
						connection: null,
						songs: [],
						volume: 100,
						playing: true,
						npmsg: null,
						loop: 0 //0=no loop, 1=looping current song, 2=looping queue
					};
					queue.set(msg.guild.id, queueConstruct);

					queueConstruct.songs.push(song);


					try {
						var connection = await voiceChannel.join()
						message.guild.voiceStates.cache.get(client.user.id).setSelfDeaf(true)
						queueConstruct.connection = connection;
						play(msg.guild, queueConstruct.songs[0]);
					} catch (error) {
						console.error(`I could not join the voice channel: ${error}`);
						queue.delete(msg.guild.id);
						return msg.channel.send(`I could not join the voice channel: ${error}`);
					}
				} else {
					serverQueue.songs.push(song);
					if (playlist) return undefined;

					else {
						
						if (serverQueue.songs.length === 1) { }
						msg.channel.send(`**${song.title}** was added to the queue`).then(m => {m.delete({timeout: 15000})})
					}

                }
                return undefined;
			} 

			

		async function play(guild, song) {
			const serverQueue = queue.get(guild.id);

			if (!song) {
				message.guild.me.voice.channel.leave();
				if (serverQueue.npmsg) {
					serverQueue.npmsg.delete()
					}
				message.channel.send('Finished playing, leaving the voice channel...')
				queue.delete(guild.id);
				return;
			}
			try {
				const dispatcher = serverQueue.connection.play(ytdl(song.url), { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 }) //{ highWaterMark: 1<<25 }
					.on("finish", () => {
						if (serverQueue.loop === 0) {
							serverQueue.songs.shift();
							play(guild, serverQueue.songs[0]);
						}
						else if (serverQueue.loop === 1) {
							play(guild, serverQueue.songs[0]);
						} else {
							npsong=serverQueue.songs[0]
							serverQueue.songs.shift();
							serverQueue.songs=[...serverQueue.songs,npsong]
							play(guild, serverQueue.songs[0]);
							
						}
						
					})
					.on('error', error => {
						console.error(error)
						message.channel.send(`Unable to play ${song.title} beacause \`\`${error}\`\`, skipping to next song...`)
						serverQueue.songs.shift();
						play(guild, serverQueue.songs[0]);
					});
				dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

				if (serverQueue.npmsg) {
					serverQueue.npmsg.delete()
					}
				serverQueue.npmsg = await serverQueue.textChannel.send(`Now playing **${song.title}**...`);
			} catch (e) {
				console.log(e)
				if (serverQueue.loop === 0) {
					serverQueue.songs.shift();
					play(guild, serverQueue.songs[0]);
				}
				else if (serverQueue.loop === 1) {
					play(guild, serverQueue.songs[0]);
				} else {
					npsong=serverQueue.songs[0]
					serverQueue.songs.shift();
					serverQueue.songs=[...serverQueue.songs,npsong]
					play(guild, serverQueue.songs[0]);
					
				}
			}
		}
	}
}