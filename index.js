const botconfig = require("./botconfig.json")
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", async () => {
  console.log(`A sublime duet.`);
  bot.user.setActivity("etwahl.js");
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  //if(message.content === `Is Mike the love of my life?`){
    //message.channel.send(`YASSSSSSSSSSS`);
  //}

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

//   if(cmd === `${prefix}kick`){
//
//    //!kick @user reason
//
//    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//    if(!kUser) return message.channel.send("Can't find user!");
//    let kReason = args.join(" ").slice(22);
//    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("...");
//    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("...");
//
//    let kickEmbed = new Discord.RichEmbed()
//    .setDescription("*Shall we resolve this dissonance~?*")
//    .setColor("#16FECC")
//    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
//    .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
//    .addField("Kicked in", message.channel)
//    .addField("Time", message.createdAt)
//    .addField("Reason", kReason);
//
//    let kickChannel = message.guild.channels.find(`name`, "reports");
//    if(!kickChannel) return message.channel.send("Can't find incidents channel.");
//
//    message.guild.member(kUser).kick(kReason);
//    kickChannel.send(kickEmbed);
//
//    return;
// }
//
//
// if(cmd === `${prefix}ban`){
//
//     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//     if(!bUser) return message.channel.send("Can't find user!");
//     let bReason = args.join(" ").slice(22);
//     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("...");
//     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("...");
//
//     let banEmbed = new Discord.RichEmbed()
//     .setDescription("*Shall we resolve this dissonance~?*")
//     .setColor("#16FECC")
//     .addField("Banned User", `${bUser} with ID ${bUser.id}`)
//     .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
//     .addField("Banned in", message.channel)
//     .addField("Time", message.createdAt)
//     .addField("Reason", bReason);
//
//     let incidentchannel = message.guild.channels.find(`name`, "reports");
//     if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
//
//     message.guild.member(bUser).ban(bReason);
//     incidentchannel.send(banEmbed);
//
//
//     return;
// }
//
//
//
//
//   if(cmd === `${prefix}report`){
//     //~report @user this is the reason
//
//     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//     if(!rUser) return message.channel.send("Couldn't find user.");
//     let reason = args.join(" ").slice(22);
//
//     let reportEmbed = new Discord.RichEmbed()
//     .setDescription("*Order through music~*")
//     .setColor("#16FECC")
//     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
//     .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
//     .addField("Channel", message.channel)
//     .addField("Time", message.createdAt)
//     .addField("Reason", reason);
//
//     message.channel.send(reportEmbed);
//
//     let reportschannel = message.guild.channels.find(`name`, "reports");
//     if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
//
//     message.delete().catch(O_o=>{});
//     reportschannel.send(reportEmbed);
//
//     return;
//   }






  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("*From my mind to yours~*")
    .setColor("#16FECC")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField("You joined", message.member.joinedAt)
    .addField("Total members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }




  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("*Only you can hear me, Summoner~*")
    .setColor("#16FECC")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Born on", bot.user.createdAt);

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}hello`){
    return message.channel.send("Hello, Summoner ♪");
  }


})
bot.login(botconfig.token);
