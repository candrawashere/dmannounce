
const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "+"; //bot prefix gir kanka
var statuses = [`Candra#0008`]; //bot durum gir kanka
var timers = 2;
const config = require("./config.json");
const owners = ["823168252778774579","989266266659360818"]; //botu yönetebilcek id gir kanka
const id = ("856079329846755369"); // id gir

client.on("ready", () => {
  console.log(`Giriş yapıldı : ${client.user.tag}`);
  client.user.setStatus("dnd");
  var timeing = Math.floor(timers * 1000);
  setInterval(function() {
    var lengthesof = statuses.length;
    var amounter = Math.floor(Math.random() * lengthesof);
    client.user.setActivity(statuses[amounter], { type: "" });
  }, timeing);
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefix + "help".toLowerCase())) {
    message.react("✔");
    let help = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setFooter(`Developed by Candra`, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `> **${client.user.username} Yardım Komutları\n> Aktif Komutlar : " 6 " Komut\n> Prefix : \`${prefix}\`**\n> **Language : Türkçe :flag_tr:**`
      )
      .addFields(
        {
          name: "Herkes",
          value: `\`${prefix}dmduyuru\` , \`${prefix}ping\``
        },
        {
          name: "Yetkili",
          value: `\`${prefix}isim\` , \`${prefix}resim\` `
        },
        {
          name: "Extra",
          value: `\`${prefix}davet\` , \`${prefix}help\``
        }
      );
    message.channel.send(help);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "dmduyuru")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Geçerli bir mesaj gir !`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "everyone")
      .forEach(m => {
        if (m.user.bot) return;
        m.send(`${args}\n ${m}`)
          .then(() => {
            console.log(`Buna gönderdim : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`Engellemiş : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Mesajlar Gönderiliyor Sabretmezsen Göndermem : \`${
          message.guild.members.cache.filter(
            m => m.presence.status !== "online"
          ).size
        }\` `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`Herkese mesaj gönderme...`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});


client.on("message", async message => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Pingleniyor..").then(m => {
      m.edit(
        `\`\`\`javascript\nDiscord API : ${Math.round(
          client.ws.ping
        )} ms\n\`\`\` `
      );
    });
  }
   if (message.content.startsWith(prefix + "davet")) {
    message.channel.send("davet linki oluşturuluyor...").then(m => {
      let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Davet et`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=8&scope=bot`)
       .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
      m.edit(embed
      );
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "isim")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Sadece bot sahipleri bu komutu kullanabilir **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Bir isim belirt !**`
      );
    client.user.setUsername(`${botnameee}`);
    message.channel.send(`Bot ismi değiştiriliyor ...`).then(me => {
      me.edit(` Tamamlandı !`);
    });
  }
  if (message.content.startsWith(prefix + "resim")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Sadece bot sahipleri bu komutu kullanabilir **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Lütfen geçerli bir fotoğraf seç !**`
      );
    client.user.setAvatar(`${botnameee}`);
    message.channel.send(`Bot fotoğrafı değiştiriliyor ...`).then(me => {
      me.edit(` Tamamlandı !`);
    });
  }
});

client.login("token");
