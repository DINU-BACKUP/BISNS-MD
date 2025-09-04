const { cmd } = require('../lib/command');
const { sleep } = require('../lib/functions');
const os = require('os');
const { exec } = require("child_process");
const { config } = require("../settings");
const PREFIX = config.PREFIX;

cmd({
    pattern: "rtttt",
    desc: "Restart the QUEEN-SENU-MD bot",
    category: "owner",
    react: "🔄",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const hostname = os.hostname();
        let keyMsg = await conn.sendMessage(from, { 
            text: `*🤖 Platform:* ${hostname}\n\n🐼 Restarting QUEEN-SENU-MD Bot... ♻️\n\n🌻 Have A Nice Day! 🌻`
        });

        let loadingFrames = [
            "🟥 LOADING ━━━━━━━━━━━ 10%",
            "🟧 LOADING ███━━━━━━━━━ 30%",
            "🟨 LOADING █████━━━━━━━ 50%",
            "🟩 LOADING ████████━━━━ 80%",
            "🟩 LOADING ████████████ 100%",
            "✅ RESTART COMPLETED"
        ];

        for (let frame of loadingFrames) {
            await sleep(800);
            await conn.sendMessage(from, { text: frame, edit: keyMsg.key });
        }

        await sleep(1000);
        exec("pm2 restart all", (err) => {
            if (err) reply(`❌ Error: ${err.message}`);
        });

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "restart",
    desc: "Check if QUEEN-SENU-MD is alive",
    category: "info",
    react: "💖",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const hostname = os.hostname();
        let keyMsg = await conn.sendMessage(from, { 
            text: `🐼 Checking QUEEN-SENU-MD Status...\n*Platform:* ${hostname}`
        });

        let animation = [
            `${PREFIX}`rtttt,
            "🌑 Checking System...",
            "🌘 Loading Modules...",
            "🌗 Testing Connection...",
            "🌖 Finalizing...",
            "🌕 SYSTEM ONLINE!"
        ];

        for (let frame of animation) {
            await sleep(1000);
            await conn.sendMessage(from, { text: frame, edit: keyMsg.key });
        }

        await sleep(500);
        let finalMsg = `
✨ *QUEEN-SENU-MD is Alive!* ✨

🟢 Status: Online
🌐 Platform: ${hostname}
💫 Version: 2.0
🌸 Message: Hello! I'm here! ❤️
        `;
        
        await conn.sendMessage(from, { text: finalMsg, edit: keyMsg.key });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { text: `❌ Error: ${e.message}` });
    }
});
