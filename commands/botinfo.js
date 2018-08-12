const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("*Only you can hear me, Summoner~*")
    .setColor("#16FECC")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Born on", bot.user.createdAt);

    message.channel.send(botembed);

}

module.exports.help = {
  name: "botinfo"
}
