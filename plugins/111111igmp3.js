const { cmd } = require('../lib/command'); // ✅ fix
const fetch = require('node-fetch');

cmd(
  {
    pattern: 'igm1',
    desc: 'Download Instagram video as MP3 (audio only)',
    react: '🎧',
    use: '.ig <Instagram link>',
    category: 'download',
    filename: __filename,
  },
  async (
    conn,
    msg,
    args,
    { from, q, reply }
  ) => {
    try {
      if (!q) return reply('📎 Instagram link එකක් දාපන් බ්‍රෝ!');
      
      reply.react('⌛');

      // Get video info from API
      const res = await fetch('https://darksadasyt-igdl.vercel.app/api/download?q=' + q);
      const json = await res.json();
      const url = json?.result?.data[0]?.downloadUrl;

      if (!url) return reply('😢 Video එක ගන්න බැරි උනා.');

      reply.react('🎶');

      // Directly send as audio with correct mimetype
      await conn.sendMessage(from, {
        audio: { url },
        mimetype: 'audio/mpeg',
        ptt: false,
      }, { quoted: msg });

      reply.react('✅');

    } catch (e) {
      console.log(e);
      reply('😵 Error එකක් ආව බ්‍රෝ!');
    }
  }
);
