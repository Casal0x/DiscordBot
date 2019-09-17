const Discord = require("discord.js");
const YTDL = require('ytdl-core');
const client = new Discord.Client();

let botName;
const commandPrefix = "?";

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
    console.log('Bot is Online! as:', botName);    
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
  
  
    if(!oldUserChannel && newUserChannel) {
  
      client.channels.get('622428174818607154').send("User went form Channel" + oldUserChannel + "to the new" 
             + newUserChannel + "Channel");
        console.log("User went form Channel" + oldUserChannel + "to the new" 
        + newUserChannel.name + "Channel");
        
  
    }
    
    if (oldUserChannel !== newUserChannel) { // if the channel has changed
        
        var user = newUserChannel.members ? newUserChannel.members.map(item => {
            return item.id;
        }) : "";

        let channel = '619547781404819477';

        // if(user.toString() === '240018676496072704'){ // m0spi
        //     client.channels.get('619547781404819477').send('Alerta! monpi esta por jugar! salvese quien pueda!', { tts: true }); //240018676496072704            
        // }

        switch(user.toString()){
            case '240018676496072704':
                client.channels.get(channel).send('Alerta! monpi esta por jugar! salvese quien pueda!', { tts: true }); //240018676496072704
                break;
            case '318186694136561666':
                client.channels.get(channel).send('Llego el puto de Grasi!', { tts: true }); //grasi
                break;
            case '238496402483838978':
                client.channels.get(channel).send('Llego Guchita phtzihitgzihzhihzihzihizh', { tts: true }); //gucha
                break;
            case '238779943830552577':
                client.channels.get(channel).send('Verga llego casal!', { tts: true }); //Casal0x
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
                    message.channel.send('Por favor ingrese un link!');
                    return;
                }

                if(!message.member.voiceChannel){
                    message.channel.send('Tienes que estar en un canal de Voz!');
                    return;
                }

                if(!YTDL.validateURL(url)) {
                    console.log('sadasd')
                    message.channel.send('Link de youtube invalido');
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
            case 'grasi':
                message.channel.send('Grasi se la recontra come!', { tts: true })
                break;
            case 'm0spi':
                message.channel.send('Alerta! monspi esta por jugar! corran!', { tts: true })
                break;
            case 'm0spi':
                message.channel.send('Alerta! monspi esta por jugar! salvese quien pueda!', { tts: true }) 
                break;
            default:
                message.channel.send('Nope eso no existe!');
                break;
        }
        
    }else{
        if(message.content.toUpperCase().includes('GRASI')){
            message.channel.send('Grasi se la come',{
                tts: true
            });
        }
    }
})


client.login('NjIyNDI4NjczMzkxNDYwMzgy.XXzwGw.f0P7SXbyPSg8NQV6cH5B2NI2Aac');