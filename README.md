# HelloWorld 网站（练习一）

用 Node.js + Express 实现：浏览器访问时显示欢迎语和当前**服务器时间**。无数据库，可直接部署到 Vercel。

## 一、项目结构

```
helloworld-dengjianan/
├── server.js       # 服务器主程序（同时兼容本地运行与 Vercel 部署）
├── package.json    # 依赖清单（express）
├── vercel.json     # Vercel 部署配置
├── .gitignore      # 忽略 node_modules
└── README.md       # 本说明
```

## 二、本地运行

```bash
npm install
npm start
```

然后浏览器打开 <http://localhost:3000>，应看到：

- 大标题 `Hello World！`
- 副标题 `我是邓佳男，我的第一个 AI 开发的网站`
- 当前服务器时间（北京时间，刷新页面会更新）

健康检查接口：<http://localhost:3000/health> → `{"status":"ok","time":"..."}`

> 端口被占用时可改端口：`PORT=3001 npm start`

## 三、推送到 GitHub

```bash
git init
git add .
git commit -m "feat: HelloWorld 网站（AI 生成，练习一）"
git branch -M main
git remote add origin https://github.com/<你的用户名>/helloworld-dengjianan.git
git push -u origin main
```

仓库需先在 GitHub 网页上新建（**不要**勾选 Add a README file），否则 push 会冲突。

## 四、部署到 Vercel

1. 打开 <https://vercel.com>，用 GitHub 账号登录；
2. Add New → Project → 选择 `helloworld-dengjianan` → Import；
3. Framework Preset 选 **Other**，其余保持默认（无需填任何环境变量）；
4. 点击 **Deploy**，约 1 分钟完成；
5. 得到 `helloworld-dengjianan-xxx.vercel.app` 网址，公网任何人可访问。

## 五、验收对照

- ☑ GitHub 仓库中能看到 server.js
- ☑ Vercel 网址公网可访问，页面显示欢迎语 + 服务器时间
- ☑ 提交内容：Vercel 网址 + GitHub 仓库地址

## 六、说明（教学点）

- `server.js` 末尾用 `module.exports = app` 导出 Express 实例，Vercel 的 `@vercel/node` 会自动把它变成 Serverless Function；
- 只有本地直接 `node server.js` 时才 `listen(3000)`，部署时由平台接管，所以同一份代码两边都能跑；
- `vercel.json` 把所有路径都路由到 `server.js`，避免部署后访问根路径 404。
