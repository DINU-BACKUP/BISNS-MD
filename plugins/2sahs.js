const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");
const config = require("../settings");




cmd(
  {
    pattern: "panda",
    desc: "Send song as PTT with stylish caption and thumbnail",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*🎧 Please provide a song name or YouTube link...*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*❌ Song not found. Try another one.*");

      const data = search.videos[0];
      const title = data.title;
      const timestamp = data.timestamp;
      const ago = data.ago;
      const views = data.views.toLocaleString();
      const ytUrl = data.url;
      const thumbnail = data.thumbnail;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const res = await fetchJson(api);

      if (!res?.status || !res?.data?.url) {
        return reply("❌ Unable to download the song. Try another one!");
      }

      const audioUrl = res.data.url;

      const styledCaption = `
┏━━━━━━━━━━━━━━━━━━┓
┃ ☘️ \`𝚃𝙸𝚃𝙻𝙴\` : *${title}*
┃ 📆 \`𝚄𝙿𝙻𝙾𝙰𝙳\` : *${ago}*
┃ 👀 \`𝚅𝙸𝙴𝚆𝚂\` : *${views}*
┗━━━━━━━━━━━━━━━━━━┛
\`00:00\` *─────●──────────* \`${timestamp}\`

*|| HeadPhones For Best Experience 🎧🙇‍♂️*

> *🫟🎶 හිත නිවන || M U S I C 🙇‍♂️🇱🇰*

\`🔮🪄 ආසම පාටින් රියැක්ට් එකක් දාගෙන යමුහ් 😩💗\`
`;

      // Send thumbnail + caption
      await robin.sendMessage(
        config.PANDATM,
        {
          image: { url: thumbnail },
          caption: styledCaption,
        },
        { quoted: mek }
      );

      // Send audio as voice note
      await robin.sendMessage(
        config.PANDATM,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Notify sender
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *${title}* successfully posted to *${config.BOOT || "Remix Hub"}* 🔥`,
        },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("*😓 Error occurred. Please try again later.*");
    }
  }
);
cmd(
  {
    pattern: "sahas2", // <-- Pattern fixed to sahas
    desc: "Stylish MP3 sender to configured JID",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*ඔයාලා ගීත නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...!*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*ගීතය හමුනොවුණා... ❌*");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = {
        title: data.title,
        thumbnail: data.thumbnail,
        download: apiRes.data.url,
      };

      const caption = `*${result.title}*

\`◊. 🌀 Date :* ${data.ago}\`    \`⏰ Time :* ${data.timestamp}\`

* *ලස්සන රියැක්ට් ඕනී...💗😽🍃*

> *🫟🎶මනෝපාර | Music ᥫ᭡|🇱🇰*`;

      // Send thumbnail with caption
      await robin.sendMessage(
        config.SAHAS,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send PTT Audio
      await robin.sendMessage(
        config.SAHAS,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Send Confirmation
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* This Song || *${config.SAHAS}* Sended😒👈`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);


//================


cmd(
  {
    pattern: "sahasb", // <-- Pattern fixed to sahas
    desc: "Stylish MP3 sender to configured JID",
    category: "download",
    react: "🎧",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    try {
      if (!q) return reply("*ඔයාලා ගීත නමක් හෝ YouTube ලින්ක් එකක් දෙන්න...!*");

      const search = await yts(q);
      if (!search.videos.length) return reply("*ගීතය හමුනොවුණා... ❌*");

      const data = search.videos[0];
      const ytUrl = data.url;

      const api = `https://manul-official-new-api-site.vercel.app/convert?mp3=${encodeURIComponent(ytUrl)}&apikey=Manul-Official`;
      const { data: apiRes } = await axios.get(api);

      if (!apiRes?.status || !apiRes.data?.url) {
        return reply("❌ ගීතය බාගත කළ නොහැක. වෙනත් එකක් උත්සහ කරන්න!");
      }

      const result = {
        title: data.title,
        thumbnail: data.thumbnail,
        download: apiRes.data.url,
      };

      const caption = `*${result.title}*

\`◊. 📆 Ago :* ${data.ago}\`    \`🕒 Duration :* ${data.timestamp}\`

* *React ඕනි ලස්සන ළමයෝහ්...💗😽🍃*

> *🫟🎶Boot | සින්දු ᥫ᭡|🇱🇰*`;

      // Send thumbnail with caption
      await robin.sendMessage(
        config.SAHASI,
        {
          image: { url: result.thumbnail },
          caption: caption,
        },
        { quoted: mek }
      );

      // Send PTT Audio
      await robin.sendMessage(
        config.SAHASI,
        {
          audio: { url: result.download },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );

      // Send Confirmation
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          text: `✅ *"${result.title}"* This Song || *${config.SAHASI}* Sended😒👈`,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*ඇතැම් දෝෂයකි! පසුව නැවත උත්සහ කරන්න.*");
    }
  }
);
