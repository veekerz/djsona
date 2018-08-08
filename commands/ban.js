const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Can't find user!");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

      let banEmbed = new Discord.RichEmbed()
      .setDescription("*Shall we resolve this dissonance~?*")
      .setColor("#16FECC")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned in", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);

//can change channel name to wherever u wanna keep logs
      let incidentchannel = message.guild.channels.find(`name`, "reports");
      if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

      message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

}

module.exports.help = {
  name: "ban"
}
