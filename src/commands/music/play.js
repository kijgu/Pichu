const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search')


const cooldown = new Set();

module.exports = {
	name: "play",
	usage: "play <song>",
	aliases: ['p'],
	category: 'music',
	description: "Plays a song/playlist from youtube",
	async execute(client,message,args,dbl,messagecounter,queue) {
		const msg = message
		const searchString = args.slice(0).join(' ');
		const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
		const serverQueue = queue.get(msg.guild.id);
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
		const vote = await dbl.hasVoted(message.member.id)
		if (url.includes("list=")) {
			if (message.author.id === client.config.ownerID || vote) {
				const playlist = await
					yts({ listId: url.split("list=")[1] })
				if (!playlist) return message.channel.send("This playlist is either invalid or private, please try again.")
				const videos = playlist.items;
				msg.channel.send(`**${playlist.title}** was added to the queue.`).then(m => {m.delete({timeout: 15000})})
				for (const video of videos) {
					try {
						if (serverQueue) {
							if (serverQueue.stop) return;
							await handleVideo(video, msg, voiceChannel, playlist, queue)
							continue;
						}
						await handleVideo(video, msg, voiceChannel, playlist, queue)
					} catch (e) { console.log(e) }
				}
			} else {
				message.channel.send('Please vote for Pichu to use playlists! (vote can make some minutes to register)')
			}
		}

		else {
            let video;
            let m;
			try {
				video = await yts({ videoId: url })
				return handleVideo(video, msg, voiceChannel);
			}
			catch{
				try {
					video = await yts({ videoId: url })
					return handleVideo(video, msg, voiceChannel);
				} catch{
					try {
						var results = await yts(searchString)
                        var videos = await results.videos.slice(0, 10);
						video = videos[0]
					} catch (err) {
                        m.delete()
						console.error(err);
						return msg.channel.send('I couldn\'t find any results.');
					}
				}
			}
            if (m) {m.delete()}
			return handleVideo(video, msg, voiceChannel);
		}
		async function handleVideo(video, msg, voiceChannel, playlist = false) {
				const serverQueue = queue.get(msg.guild.id);
				const song = {
					id: video.videoId,
					title: video.title,
					url: `https://www.youtube.com/watch?v=${video.videoId}`,
					author: video.author.name,
					request: msg.member.tag,
					thumbnail: video.image || video.thumbnailUrl
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
						msg.channel.send(`**${song.title}** by **${song.author}** was added to the queue`).then(m => {m.delete({timeout: 15000})})
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
				const dispatcher = serverQueue.connection.play(ytdl(song.url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 })) //{ highWaterMark: 1<<25 }
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
					.on('error', error => console.error(error));
				dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

				if (serverQueue.npmsg) {
					serverQueue.npmsg.delete()
					}
				serverQueue.npmsg = await serverQueue.textChannel.send(`Now playing **${song.title}** by **${song.author}**`);
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