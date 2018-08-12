const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("*From my mind to yours~*")
    .setColor("#16FECC")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField("You joined", message.member.joinedAt)
    .addField("Total members", message.guild.memberCount);
    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
