
const sadiya_md_footer = "🌀 Powered by DINUWH MD";
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");
// Get prefix dynamically from settings or fallback
const prefix = config.PREFIX || ".";

//Ptt
cmd({
  pattern: "ytvoice",
  //alias: ["ytmp3"],
  desc: "Download YouTube song (no caption, audio only)",
  category: "download",
  react: "🎤",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("SONG NAME 😒?");
    const search = await yts(q);
    if (!search.videos.length) return reply("Yt search Fail🤧!");
    const data = search.videos[0];
    const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(data.url)}&apikey=Manul-Official`;
    const result = await fetchJson(api);
    const dl_url = result.data.url;
    await robin.sendMessage(m.chat, {
      audio: { url: dl_url },
      mimetype: 'audio/mpeg',
      ptt: true,
      fileName: `${data.title}.mp3`
    }, { quoted: m });
  } catch (e) {
    reply("*🛑 ERROR! Something went wrong*");
    console.log(e);
  }
});
//ytdoc=====
cmd({
  pattern: "ytdoc",
 // alias: ["ytmp3"],
  desc: "Download YouTube song as document only",
  category: "download",
  react: "📄",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("📁 Song name Error");
    const search = await yts(q);
    if (!search.videos.length) return reply("Yt search Fail🤧!");
    const data = search.videos[0];
    const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(data.url)}&apikey=Manul-Official`;
    const result = await fetchJson(api);
    const dl_url = result.data.url;
    await robin.sendMessage(m.chat, {
      document: { url: dl_url },
      mimetype: 'audio/mpeg',
      fileName: `${data.title}.mp3`
    }, { quoted: m });
  } catch (e) {
    reply("❌ *ERROR! Something went wrong*");
    console.log(e);
  }
});
//=======
cmd({
  pattern: "ytaud",
  //alias: ["ytmp3"],
  desc: "Download YouTube song (no caption, audio only)",
  category: "download",
  react: "🎶",
  filename: __filename,
}, async (robin, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("SONG NAME 😒?");
    const search = await yts(q);
    if (!search.videos.length) return reply("Yt search Fail🤧!");
    const data = search.videos[0];
    const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(data.url)}&apikey=Manul-Official`;
    const result = await fetchJson(api);
    const dl_url = result.data.url;
    await robin.sendMessage(m.chat, {
      audio: { url: dl_url },
      mimetype: 'audio/mpeg',
      ptt: false,
      fileName: `${data.title}.mp3`
    }, { quoted: m });
  } catch (e) {
    reply("*🛑 ERROR! Something went wrong*");
    console.log(e);
  }
});
//video
cmd({
  pattern: "v144",
  //alias: ["yt144"],
  react: "📹",
  desc: "Download YouTube 144p video",
  category: "download",
  filename: __filename,
},
async (
  conn,
  mek,
  m,
  { from, q, reply }
) => {
  try {
    if (!q) return reply("🔎 YouTube නමක් හෝ ලින්ක් එකක් දෙන්න!");
    const search = await yts(q);
    if (!search.videos.length) return reply("❌ වීඩියෝවක් හමුනොවුණා!");
    const data = search.videos[0];
    const url = data.url;
    const api = `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${encodeURIComponent(url)}`;
    const res = await fetchJson(api);
    if (!res || !res.data?.url) return reply("❌ බාගත කිරීම අසාර්ථකයි!");
    
    const caption = `🎥 *𝚈𝚃 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳*
📌 *Title:* ${data.title}
⏱ *Duration:* ${data.timestamp}
👁 *Views:* ${data.views}
🌐 *Link:* ${data.url}
> *𝙳𝙸 𝙽 𝚄 𝚆 𝙷 - 𝙼 𝙳 || 𝑴𝑼𝑺𝑰𝑪 𝑽𝑰𝑫𝑬𝑶 𝑺𝑻𝒀𝑳𝑬 💚*`;

    await conn.sendMessage(
      from,
      { image: { url: data.thumbnail }, caption },
      { quoted: mek }
    );

    await conn.sendMessage(
      from,
      {
        video: { url: res.data.url },
        mimetype: "video/mp4",
        caption: "✅ Video බාගන්න ලැබුණා!",
      },
      { quoted: mek }
    );
  } catch (e) {
    console.error(e);
    reply("❌ අවුලක් ආවා බං! " + e.message);
  }
});
