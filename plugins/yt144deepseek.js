const axios = require("axios");
const fs = require("fs");
const { cmd } = require("../lib/command");
const yts = require("yt-search");
const config = require("../settings");

cmd({
  pattern: "mymp4",
  alias: ["vre", "yta"],
  react: "🎬",
  desc: "Download YouTube MP4 Video",
  category: "download",
  filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("🔍 කරුණාකර ගීතයක් හෝ YouTube ලින්ක් එකක් දෙන්න!");

    const search = await yts(q);
    if (!search.videos.length) return reply("❌ වීඩියෝවක් හමුනොවුණා!");

    const data = search.videos[0];
    const ytUrl = data.url;

    const api = `https://yt-five-tau.vercel.app/download?q=${ytUrl}&format=144`;
    const { data: apiRes } = await axios.get(api);

    if (!apiRes?.status || !apiRes.result?.download) {
      return reply("❌ බාගත කල නොහැක. වෙනත් වීඩියෝවක් උත්සහ කරන්න!");
    }

    const result = apiRes.result;

    // download buffer properly
    const videoBuffer = await axios.get(result.download, {
      responseType: 'arraybuffer'
    });

    const message = {
      video: Buffer.from(videoBuffer.data),
      caption: `🎬 ${result.title}\n\n${config.FOOTER}`,
      mimetype: "video/mp4",
      fileName: `${result.title}.mp4`,
    };

    await conn.sendMessage(from, message, { quoted: mek });
    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

  } catch (error) {
    console.error("Error fetching or sending", error);
    await conn.sendMessage(from, "*❌ Video Fetch Error*", { quoted: mek });
  }
});
