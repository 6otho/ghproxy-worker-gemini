# ⚡ 通用代理加速 Cloudflare Worker

这是一个部署在 Cloudflare Workers 上的通用代理脚本，它可以帮助你加速访问全球的任意网络资源，尤其适用于解决某些链接（如 GitHub Releases、Docker Hub 镜像、机场订阅链接等）在中国大陆访问缓慢或无法访问的问题。

 <!-- 建议您截一张项目主页的图片并替换此处的 URL -->

## ✨ 功能特性

- **零成本部署**：完全基于 Cloudflare 的免费套餐，无需服务器，无需域名。
- **通用代理**：理论上可以代理加速任何 `http/https` 链接。
- **简洁的用户界面**：提供了一个简单直观的前端页面，方便生成加速链接。
- **一键复制**：生成链接后可一键复制到剪贴板。
- **亮/暗模式**：自适应系统的亮/暗模式，并提供手动切换按钮。
- **高度可定制**：通过简单的变量配置，即可开启或关闭安全访问限制。

## 🛠️ 变量配置

在部署之前，您可以根据自己的需求修改脚本头部的变量。所有配置项都在代码的 **`用户配置区域`** 部分。

| 变量名                 | 类型    | 默认值 | 说明                                                                                                                              |
| ---------------------- | ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_WHITELIST_CHECK` | 布尔值  | `false`  | **安全开关**。设置为 `true` 后，将只允许代理 `targetDomains` 和 `urlWhitelist` 中定义的链接，防止 Worker 被滥用。**强烈建议在公开场合分享时设置为 `true`**。 |
| `targetDomains`        | 数组    | `[...]`  | **域名白名单**。当安全开关开启时，只有这个列表中的域名开头的链接才会被代理。                                                       |
| `urlWhitelist`         | 数组    | `[...]`  | **URL关键字白名单**。当安全开关开启时，目标 URL 中必须包含此列表中的至少一个关键字（不区分大小写）。这是一个额外的安全层。                 |

---

## 部署教程 (小白友好版)

只需简单三步，即可拥有属于你自己的通用代理加速服务！

### 第 1 步：准备工作

- **注册一个 Cloudflare 账号**：访问 [Cloudflare 官网](https://dash.cloudflare.com/sign-up) 并完成注册。整个过程是免费的。

### 第 2 步：创建 Worker 服务

1.  登录到您的 Cloudflare 账号，在左侧菜单栏中选择 **Workers & Pages**。
     <!-- 建议替换为真实截图 -->

2.  点击 **Create application** (创建应用程序) 按钮。
     <!-- 建议替换为真实截图 -->

3.  在 "Create an application" 页面，选择 **Workers** 下的 **Create Worker** (创建 Worker)。
     <!-- 建议替换为真实截图 -->

4.  为你的 Worker 服务取一个**自定义的子域名**（例如 `my-proxy-worker`）。这个名字将成为你服务URL的一部分 (`https://my-proxy-worker.your-subdomain.workers.dev`)。然后点击 **Deploy** (部署)。
     <!-- 建议替换为真实截图 -->

### 第 3 步：粘贴代码并部署

1.  部署成功后，你会看到一个管理页面。点击 **Configure Worker** (配置 Worker) 或 **Edit code** (编辑代码)。
     <!-- 建议替换为真实截图 -->

2.  你会进入一个在线代码编辑器。**删除**编辑器里已有的所有默认代码。

3.  **完整地复制** [worker.js](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/worker.js) 文件中的**全部代码**。（**注意**：请将这里的链接替换成您自己仓库中代码文件的 Raw 链接）。

4.  将复制的代码**粘贴**到 Cloudflare 的在线编辑器中。

5.  （可选）根据上面的 **`变量配置`** 表格，在代码顶部修改你想要的配置。

6.  点击右上角的 **Save and deploy** (保存并部署) 按钮。
     <!-- 建议替换为真实截图 -->

**恭喜你，部署完成！** 🎉

现在，你可以直接访问你的 Worker 地址（例如 `https://my-proxy-worker.your-subdomain.workers.dev`）来使用这个代理服务了。

## 🚀 快速上手 (Fork & Deploy)

如果你熟悉 GitHub，也可以直接 Fork 本仓库，然后使用 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/) 进行部署。

1.  **Fork 本仓库**
2.  **克隆到本地**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
    cd YOUR_REPO
    ```
3.  **安装 Wrangler**:
    ```bash
    npm install -g wrangler
    ```
4.  **登录 Cloudflare**:
    ```bash
    wrangler login
    ```
5.  **发布 Worker**:
    ```bash
    wrangler deploy
    ```

## 📜 许可证

本项目基于 [MIT License](./LICENSE) 许可证开源。
