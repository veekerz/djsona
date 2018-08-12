const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("...");
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("... \:(");

     let kickEmbed = new Discord.RichEmbed()
     .setDescription("*Shall we resolve this dissonance~?*")
     .setColor("#16FECC")
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked in", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", kReason);

     let kickChannel = message.guild.channels.find(`name`, "reports");
     if(!kickChannel) return message.channel.send("Can't find incidents channel.");

     message.guild.member(kUser).kick(kReason);
     kickChannel.send(kickEmbed);

}

module.exports.help = {
  name: "kick"
}
