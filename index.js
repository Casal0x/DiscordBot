const Discord = require("discord.js");
const YTDL = require('ytdl-core');
const client = new Discord.Client();

let botName;
const commandPrefix = "?";

client.login('KEY'); // Your Discord Bot Key

const play = (connection, message) => {
    let server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: 'audioonly'}));

    server.queue.shift();

    server.dispatcher.on('end', () => { 
        if(server.queue[0]) play(connection, message)
        else connection.disconnect();
    });
}

let servers = {};

client.on('ready', () => {
    botName = client.user.tag;
    console.log('Bot Online! Nickname:', botName);    
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
  
  
    if(!oldUserChannel && newUserChannel) {
  
      client.channels.get('CHANNELID').send("User went form Channel" + oldUserChannel + "to the new" 
             + newUserChannel + "Channel");
        console.log("User went form Channel" + oldUserChannel + "to the new" 
        + newUserChannel.name + "Channel");
        
  
    }
    
    if (oldUserChannel !== newUserChannel) {
        
        var user = newUserChannel ? newUserChannel.members.map(item => {
            return item.id;
        }) : "";

        let channel = 'CHANNELID'; // CHANNEL ID where the chatbot will send text.

        switch(user.toString()){
            case 'USERID':
                client.channels.get(channel).send('some text!', { tts: true });
                break;
            case 'USERID':
                client.channels.get(channel).send('some text!', { tts: true });
                break;
            case 'USERID':
                client.channels.get(channel).send('some text', { tts: true });
                break;
            case 'USERID':
                client.channels.get(channel).send('some text!', { tts: true });
                break;
            default:
                break;
        }

      }
});

client.on('message', (message) => {
    if(message.author.equals(client.user)) return;

    if(message.content.startsWith(commandPrefix)){

        let args = message.content.substring(commandPrefix.length).split(' ');

        switch(args[0].toLowerCase()){
            case 'play':

                var url = args[1];

                if(!url){
                    message.channel.send('Please insert a link!');
                    return;
                }

                if(!message.member.voiceChannel){
                    message.channel.send('You have to be in a voice channel!');
                    return;
                }

                if(!YTDL.validateURL(url)) {
                    message.channel.send('Invalid Youtube link!');
                    return;
                }

                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                };                

                var server = servers[message.guild.id];

                server.queue.push(url);

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection => {
                    play(connection, message);
                });

                break;
            case 'skip':
                var server = servers[message.guild.id];

                if(server.dispatcher) server.dispatcher.end();
                break;
            case 'stop':
                var server = servers[message.guild.id];
 
                if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                break;

            // This part is to set up messages when you or someone else write a message with the username configured.
            case 'username':
                message.channel.send('some text', { tts: true })
                break;
            case 'username':
                message.channel.send('some text', { tts: true })
                break;
            case 'username':
                message.channel.send('some text', { tts: true }) 
                break;
            default:
                message.channel.send('some text');
                break;
        }
        
    }else{
        if(message.content.toUpperCase().includes('USERNAME')){
            message.channel.send('some text',{
                tts: true
            });
        }
    }
})