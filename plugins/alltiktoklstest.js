const axios = require("axios");
const { cmd } = require("../lib/command");
const config = require('../settings');
const prefix = config.PREFIX || ".";

cmd({
  pattern: "tiklist",
  alias: ["tlist", "ttlist"],
  react: '🎵',
  desc: "TikTok Song Downloader with List Only",
  category: "tiktok",
  use: ".tiklist <TikTok URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args[0];
    if (!url || !url.includes("tiktok.com")) return reply("🥲 කරුණාකර වලංගු TikTok ලින්ක් එකක් දෙන්න.");

    await conn.sendMessage(from, { react: { text: "🧠", key: m.key } });

    const api = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(url)}`;
    const res = await axios.get(api);
    const { title, thumbnail, metrics, author } = res.data.result;

    const cap = `
\`乂 Ｄ𝚒ｎｕｗｈ Чт Ｄｏｗｎ⟩⟩⟩\`
╭────────✦✧✦────────╯

\`╭───────────────✿\` 

* \`✠.𝙳𝚘𝚠𝚗𝙻𝚘𝚊𝚍𝚜 :\` _${metrics.download_count}_
* \`✠.𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜 :\` _${metrics.comment_count}_
* \`✠.𝙻𝚒𝚔𝚎𝚜    :\` _${metrics.digg_count}_
* \`✠.𝚂𝚑𝚊𝚛𝚎   :\` _${metrics.share_count}_
* \`✠.𝙻𝚒𝚗𝚔   :\` _${url}_

* \`✠.𝙰𝚞𝚝𝚑𝚘𝚛 :\` 
> *𝙽𝚒𝚌𝚔 𝙽𝚊𝚖𝚎* :- _${author.nickname}_
> *𝚄𝚜𝚎𝚛𝙽𝚊𝚖𝚎*  :- _${author.username}_
\`╰───────────────✿\`

> 〽️ade By Dinuwh Bbh
`;

    if (config.MODE === 'button') {
      const sections = [
        {
          title: "",
          rows: [
            { title: "1", rowId: `${prefix}ytaud ${url}`, description: '`❲ Audio File ❳` 🎧' },
            { title: "2", rowId: `${prefix}ytdoc ${url}`, description: '`❲ Document File ❳` 📄' },
            { title: "3", rowId: `${prefix}ytvoice ${url}`, description: '`❲ Voice Note (ptt) ❳` 🎤' },
            { title: "4", rowId: `${prefix}devilv ${url}`, description: '`❲ Video File (mp4) ❳` 📽️' },
          ]
        }
      ];
      const listMessage = {
        caption: cap,
        image: { url: thumbnail },
        footer: '> 〽️ade By Dinuwh Bbh',
        title: '',
        buttonText: '> *◎Power Full Whatsapp bot Make By Dinuwh◎*',
        sections
      };
      return await conn.sendMessage(from, listMessage, { quoted: mek });
    }

    /*if (config.MODE === 'nonbutton') {
  // පළවෙනි list message (Audio + Document)
  const listData1 = {
    title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 1 ◎",
    sections: [{
      title: "DINUWH MD OPTIONS 1",
      rows: [
        { title: "[Aud🎧]", description: "Download as audio\n〽️ade By Dinuwh Bbh", id: `${prefix}yta ${url}` },
        { title: "[Doc📁]", description: "Download as document\n〽️ade By Dinuwh Bbh", id: `${prefix}ytc ${url}` },
      ],
    }],
  };

  await conn.sendMessage(from, {
    title: listData1.title,
    buttonText: "🔘 Choose Audio/Doc",
    listType: 1,
    sections: listData1.sections,
  }, { quoted: mek });

  // දෙවන list message (Voice + Video)
  const listData2 = {
    title: "◎ 𝙲𝙷𝙾𝙾𝚂 𝙵𝙾𝚁𝙼𝙰𝚃𝙴 2 ◎",
    sections: [{
      title: "DINUWH MD OPTIONS 2",
      rows: [
        { title: "[Voice 💡]", description: "Download as Voice Note\n〽️ade By Dinuwh Bbh", id: `${prefix}ytv ${url}` },
        { title: "[Vide📽️]", description: "Download as Video\n〽️ade By Dinuwh Bbh", id: `${prefix}de ${url}` },
      ],
    }],
  };

  await conn.sendMessage(from, {
    title: listData2.title,
    buttonText: "📁 Choose Voice/Video",
    listType: 1,
    sections: listData2.sections,
  }, { quoted: mek });*/

} catch (e) {
  console.error(e);
  reply(`❌ Error: ${e.message}`);
}
