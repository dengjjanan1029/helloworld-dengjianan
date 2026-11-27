/**
 * HelloWorld 网站 · 练习一
 * 技术栈：Node.js + Express（无数据库）
 * 作用：浏览器访问时显示欢迎语 + 当前服务器时间
 * 说明：同一份代码既能「本地运行」，也能「Vercel 部署」
 */

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// 服务器端时间格式化（固定使用北京时间 UTC+8）
function formatServerTime(date) {
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(date);

  const get = (t) => parts.find((p) => p.type === t)?.value ?? '00';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
}

const page = (serverTime) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello World · 邓佳男的第一个 AI 网站</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
                   "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      background-color: #0f1226;
      background-image:
        radial-gradient(circle at 15% 15%, rgba(88, 101, 242, 0.45), transparent 45%),
        radial-gradient(circle at 85% 85%, rgba(0, 209, 178, 0.35), transparent 45%),
        linear-gradient(135deg, #0b0e1f 0%, #171a35 100%);
      color: #fff;
    }
    .card {
      width: 100%;
      max-width: 620px;
      padding: 48px 36px;
      border-radius: 24px;
      text-align: center;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.14);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(14px);
      animation: floatIn 0.8s ease-out both;
    }
    @keyframes floatIn {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .badge {
      display: inline-block;
      margin-bottom: 22px;
      padding: 6px 16px;
      font-size: 13px;
      letter-spacing: 2px;
      color: #7ef0d0;
      border: 1px solid rgba(126, 240, 208, 0.35);
      border-radius: 999px;
      background: rgba(126, 240, 208, 0.08);
    }
    h1 {
      font-size: clamp(30px, 7vw, 50px);
      line-height: 1.25;
      background: linear-gradient(90deg, #8ab4ff, #7ef0d0 60%, #f6c6ff);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 14px;
    }
    .subtitle {
      font-size: clamp(16px, 3.6vw, 20px);
      color: #e8ebff;
      margin-bottom: 8px;
    }
    .desc {
      font-size: 14px;
      color: rgba(232, 235, 255, 0.6);
      margin-bottom: 32px;
    }
    .time-box {
      display: inline-flex;
      flex-direction: column;
      gap: 8px;
      padding: 20px 30px;
      border-radius: 16px;
      background: rgba(0, 0, 0, 0.28);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .time-label {
      font-size: 12px;
      letter-spacing: 1.5px;
      color: rgba(232, 235, 255, 0.55);
    }
    .time-value {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: clamp(17px, 4vw, 25px);
      font-weight: 600;
      color: #7ef0d0;
      letter-spacing: 1px;
    }
    .hint {
      margin-top: 26px;
      font-size: 12px;
      color: rgba(232, 235, 255, 0.42);
      line-height: 1.7;
    }
  </style>
</head>
<body>
  <main class="card">
    <span class="badge">MY FIRST AI WEBSITE</span>
    <h1>Hello World！</h1>
    <p class="subtitle">我是邓佳男，我的第一个 AI 开发的网站</p>
    <p class="desc">Node.js · 已成功连通 · 页面由一个 AI 助手亲手生成</p>

    <div class="time-box">
      <span class="time-label">当前服务器时间</span>
      <span class="time-value" id="server-time">${serverTime}</span>
    </div>

    <p class="hint">
      服务器时间取自 Node.js 运行环境（Asia/Shanghai）<br />
      刷新页面可获取最新的服务器时间
    </p>
  </main>
</body>
</html>`;

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(page(formatServerTime(new Date())));
});

// 健康检查接口（可选，Vercel 部署后可用 /health 验证）
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: formatServerTime(new Date()) });
});

// 本地运行时才监听端口；部署到 Vercel 时由平台调用导出的 app
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ HelloWorld 网站已启动：http://localhost:${PORT}`);
  });
}

module.exports = app;
