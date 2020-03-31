const ytdl = require("ytdl-core"), ytpl = require("ytpl"), ytsearch = require("yt-search"), { Util } = require("discord.js"), Discord = require('discord.js');


module.exports = {
	name: 'play',
	aliases: ['p'],
	usage: 'pichu play <youtube-url/song name>',
    description: 'Play a song!',
    category: 'music',
    async execute(client,message,args,dbl,queue) {

	

		
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send("❌ You are not in a voice channel, please join one first!")
	  
		const permissions = voiceChannel.permissionsFor(message.guild.me)
		if (!permissions.has("CONNECT")) return message.channel.send(new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setDescription('I don\'t have the permissions to connect to a voice channel')
		.setFooter('Made by Lumap#0149'))
		if (!permissions.has("SPEAK")) return message.channel.send(new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setDescription('I don\'t have the permissions to talk here!')
		.setFooter('Made by Lumap#0149'))
	  if (!args.join(' ')) return message.channel.send('Please provide me a youtube URL or a song name!')
		const url = args.join(" ")
		if (url.includes("list=")) {
		  const playlist = await ytpl(url.split("list=")[1])
		  const videos = playlist.items;
			message.channel.send('Processing playlist...').then(async m => {
		  	  
		  for (const video of videos) await queueSong(video, message, voiceChannel, queue)
		  m.edit(new Discord.MessageEmbed()
		  .setColor('RANDOM')
		  .setDescription(`${playlist.title}(${videos.length} songs) has been added to the queue!`)
		  .setFooter('Made by Lumap#0149 | Hint : playlists max length is 100')).then(m => {setTimeout(() => {m.delete()}, 15000)})
			})
		} else {
		  let video;
		  try {
			video = await ytdl.getBasicInfo(url)
		  } catch(e) {
			try {
			  const results = await ytsr(url)
			  const videos = results.videos.slice(0, 10)
			  let index = 0;
			  let selectionMessage;
			  if (videos.length === 0) return message.channel.send('An error occured, please try again!').then(m => {setTimeout(() => {m.delete()}, 15000)})
			  await message.channel.send(new Discord.MessageEmbed()
			  .setColor('RANDOM')
			  .setDescription([
				"__**Song selection:**__",
				videos.map(v => ++index + " - **" + v.title + "**").join("\n"),
				"**Select your song by sending the number from 1 to " + videos.length + " in chat.**"
			  ].join("\n\n"))
			  .setFooter('Made by Lumap#0149 | You have 15 seconds to give a response')).then(m => { selectionMessage = m})
	  
			  let response;
			  try {
				response = await message.channel.awaitMessages(msg => 0 < msg.content && msg.content < videos.length + 1 && msg.author.id == message.author.id, {
				  max: 1,
				  time: 15000,
				  errors: ['time']
				});
			  } catch(e) {
				selectionMessage.delete()
				  
				return message.channel.send(new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription('Video selection timed out, cancelling it...')
				.setFooter('Made by Lumap#0149')).then(m => {setTimeout(() => {m.delete()}, 15000)})
			  }
			  selectionMessage.delete()
			  const videoIndex = parseInt(response.first().content)
			  video = await ytdl.getBasicInfo(videos[videoIndex - 1].videoId)
			} catch(e) {
			  console.log(e)
			  return message.channel.send(new Discord.MessageEmbed()
			  .setColor('RANDOM')
			  .setDescription('I wasn\'t able to find a result :(')
			  .setFooter('Made by Lumap#0149')).then(m => {setTimeout(() => {m.delete()}, 15000)})
			}
		  }
		  let addedtoqueue;
		  await message.channel.send(new Discord.MessageEmbed()
		  .setColor('RANDOM')
		  .setDescription(`**${video.title}** has been added to the queue!`)).then(m => addedtoqueue=m)
		    return await queueSong(video, message, voiceChannel, queue).then(u => {setTimeout(() => {addedtoqueue.delete()},15000)
			})
		}
	  
	  
	  async function queueSong(video, message, voiceChannel, queue) {
		const serverQueue = queue.get(message.guild.id)
		let seconds = video.length_seconds
		const minute = Math.round(seconds/60,0)
		seconds%=60
		seconds = seconds < 10 ? "0"+seconds : seconds
		
		const song = {
		  id: video.id || video.video_id,
		  title: video.title,
		  url: video.video_url || "https://www.youtube.com/watch?v=" + video.id,
		  duration: `${minute}:${seconds}`,
		  author: {
id: message.author.id,
username: message.author.username
}
		}
		if (video.thumbnail) {song.thumbnail = video.thumbnail}
		if (video.author) {song.artist = video.author.name}
		if (video.duration) {song.duration = video.duration}
		if (video.player_response) {
			let vid = video.player_response.videoDetails
			if (vid.isLiveContent) song.duration = 'Live'
			song.thumbnail = vid.thumbnail.thumbnails[vid.thumbnail.thumbnails.length-1].url
			song.artist = vid.author.name
			}

			if (video.server_response) {
				let vid = video.server_response.videoDetails
		
				song.artist = vid.author.name
				}
		
	  
		if (!serverQueue) {
		  const queueConstruct = {
			textChannel: message.channel,
			voiceChannel,
			connection: null,
			songs: [song],
			volume: 100,
			playing: true
		  }
	  
		  try {
			const connection = await voiceChannel.join();
			message.guild.voiceStates.cache.get('674497635171696644').setSelfDeaf(true)
			queueConstruct.connection = connection;
			queue.set(message.guild.id, queueConstruct)
			playSong(message.guild, queue, queueConstruct.songs[0])
		  } catch(e) {
			console.log(e)
			message.channel.send('An error happened while trying to join the voice channel, please try again')
			return queue.delete(message.guild.id)
		  }
		} else serverQueue.songs.push(song);
	  
		return;
	  }
	  
	  async function playSong(guild, queue, song) {
		const serverQueue = queue.get(guild.id);
	  
		if (serverQueue.songs === [] || !song) {
		  serverQueue.voiceChannel.leave();
		  queue.delete(guild.id);
		message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription('Queue has ended, leaving voice channel...').setFooter('Thank you for using pichu! | Made by Lumap#0149')) 
		  return;
		}

		if (serverQueue.message) {
			serverQueue.message.delete()
		}
	  
		serverQueue.connection.play(ytdl(song.id, {filter: 'audioonly',highWaterMark:600,volume:1}))
		  .on("finish", () => {
			serverQueue.songs.shift();
			if (serverQueue.songs[0]) {
				if (serverQueue.songs[0].duration === 'NaN:NaN') {serverQueue.songs.shift()}
				}
			playSong(guild, queue, serverQueue.songs[0])
		  })
		  .on("end", () => {
			serverQueue.songs.shift();
			if (serverQueue.songs[0]) {
			if (serverQueue.songs[0].duration === 'NaN:NaN') {serverQueue.songs.shift()}
			}
			playSong(guild, queue, serverQueue.songs[0])
		  })
		  .on("error", () => {
			  console.error
			  serverQueue.qongs.shift()
			  playSong(guild,queue,serverQueue.songs[0])
			})
		  .setVolumeLogarithmic(serverQueue.volume / 250)
		const embednp = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Now playing...')
		.setThumbnail(song.thumbnail)
		.setDescription(`Song: **[${song.title}](${song.url})**\nRequested by **${song.author.username}**\nDuration: **${song.duration}**\nArtist: **${song.artist}**`)
		let rng = Math.floor(Math.random()*10)
		if (rng === 5) {
			embednp.setFooter('Please consider voting for me if you like me! pichu vote | Made by Lumap#0149')
		} else if (rng === 2) {
			embednp.setFooter('Do you like this bot? if yes, consider adding it in your server to support my dev! pichu invite | Made by Lumap#0149')
		} else {
			embednp.setFooter('Made by Lumap#0149')
		}
		serverQueue.textChannel.send(embednp).then(msg => {
			serverQueue.message = msg
		})
	  }
    },
}

const ytsr = (url) => new Promise((resolve, reject) => ytsearch(url, (err, r) => err ? reject(err) : resolve(r)))
