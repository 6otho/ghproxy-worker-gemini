// ==================================================
// 用户配置区域
// ==================================================
const ENABLE_WHITELIST_CHECK = false
const targetDomains = [
"https://api.github.com", "https://raw.githubusercontent.com", "https://gist.githubusercontent.com", "https://github.com",
"https://registry-1.docker.io", "https://gcr.io", "https://k8s.gcr.io", "https://ghcr.io", "https://quay.io",
"https://cdn.jsdelivr.net", "https://raw.fastgit.org"
]
const urlWhitelist = ["user-id-1", "user-id-2"]

// ==================================================
// 网页UI界面HTML (已移除“深度加速”功能)
// ==================================================
const HOMEPAGE_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>通用代理加速</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%233B82F6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'%3E%3C/path%3E%3C/svg%3E">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* 亮模式配置 */
    body.light {
      --c-bg-gradient-start: #f1f5f9; --c-bg-gradient-end: #e2e8f0; --c-text-primary: #111827; --c-text-secondary: #4b5563; --c-link: #3b82f6;
      --c-container-bg: #ffffff; --c-container-border: rgba(128,128,128,0.2); --c-section-bg-gradient-start: #ffffff; --c-section-bg-gradient-end: #f3f4f6;
      --c-input-bg: #ffffff; --c-input-border: #9ca3af; --c-input-text: #111827; --c-input-placeholder: #9ca3af; --c-input-focus-ring-sub: #a855f7; --c-input-focus-ring-generic: #3b82f6;
      --c-btn-sub-bg: #9333ea; --c-btn-sub-hover-bg: #7e22ce; --c-btn-generic-bg: #2563eb; --c-btn-generic-hover-bg: #1d4ed8; --c-btn-primary-text: #ffffff;
      --c-btn-secondary-bg: #e5e7eb; --c-btn-secondary-hover-bg: #d1d5db; --c-btn-secondary-text: #1f2937;
      --c-result-bg: #f3f4f6; --c-result-text-success: #15803d; --c-result-text-error: #b91c1c; --c-toast-bg: #10b981; --c-toast-text: #ffffff;
    }

    /* 暗模式配置 */
    body.dark {
      --c-bg-gradient-start: #1f2937; --c-bg-gradient-end: #374151; --c-text-primary: #f3f4f6; --c-text-secondary: #d1d5db; --c-link: #60a5fa;
      --c-container-bg: #1f2937; --c-container-border: rgba(128,128,128,0.3); --c-section-bg-gradient-start: #374151; --c-section-bg-gradient-end: #1f2937;
      --c-input-bg: #374151; --c-input-border: #4b5563; --c-input-text: #f3f4f6; --c-input-placeholder: #9ca3af; --c-input-focus-ring-sub: #a855f7; --c-input-focus-ring-generic: #3b82f6;
      --c-btn-sub-bg: #9333ea; --c-btn-sub-hover-bg: #a855f7; --c-btn-generic-bg: #2563eb; --c-btn-generic-hover-bg: #3b82f6; --c-btn-primary-text: #ffffff;
      --c-btn-secondary-bg: #4b5563; --c-btn-secondary-hover-bg: #6b7280; --c-btn-secondary-text: #f3f4f6;
      --c-result-bg: #2d3748; --c-result-text-success: #4ade80; --c-result-text-error: #f87171; --c-toast-bg: #10b981; --c-toast-text: #ffffff;
    }

    /* 其他字体大小变量 */
    :root {
      --fs-h2: 1.375rem; --fs-p: 1rem; --fs-label: 0.875rem; --fs-result: 0.9rem;
      --fs-h2-mobile: 1.125rem; --fs-p-mobile: 0.9rem; --fs-label-mobile: 0.8rem; --fs-result-mobile: 0.8rem;
    }

    /* 样式应用区 */
    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; transition: background-color 0.3s, color 0.3s; padding: 1rem; background: linear-gradient(to bottom right, var(--c-bg-gradient-start), var(--c-bg-gradient-end)); color: var(--c-text-primary); }
    .container { width: 100%; max-width: 800px; padding: 1.5rem; border-radius: 0.75rem; border: 1px solid var(--c-container-border); box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); background: var(--c-container-bg); transition: background-color 0.3s, border-color 0.3s; }
    .dark .container { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); }
    .section-box { background: linear-gradient(to bottom, var(--c-section-bg-gradient-start), var(--c-section-bg-gradient-end)); border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); transition: background-color 0.3s; }
    .dark .section-box { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
    .theme-toggle { position: fixed; top: 0.5rem; right: 0.5rem; padding: 0.5rem; font-size: 1.2rem; cursor: pointer; border-radius: 9999px; background-color: var(--c-btn-secondary-bg); color: var(--c-btn-secondary-text); transition: background-color 0.3s; }
    .theme-toggle:hover { background-color: var(--c-btn-secondary-hover-bg); }
    .toast { position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%); padding: 0.75rem 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); opacity: 0; transition: opacity 0.3s; z-index: 9999; background-color: var(--c-toast-bg); color: var(--c-toast-text); }
    .toast.show { opacity: 1; }
    h1 { font-weight: 700; text-align: center; margin-bottom: 2rem; }
    h2 { font-size: var(--fs-h2); font-weight: 600; margin-bottom: 0.5rem; }
    p { color: var(--c-text-secondary); margin-bottom: 1rem; font-size: var(--fs-p); }
    label { color: var(--c-text-secondary); font-size: var(--fs-label); }
    footer { margin-top: 1.5rem; text-align: center; }
    footer p { font-size: inherit; color: var(--c-text-secondary); margin-bottom: 0.25rem; }
    footer a { color: var(--c-link); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    .input-field { flex-grow: 1; padding: 0.5rem 0.75rem; border: 1px solid var(--c-input-border); border-radius: 0.5rem; background-color: var(--c-input-bg); color: var(--c-input-text); transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s; }
    .input-field::placeholder { color: var(--c-input-placeholder); }
    .input-field:focus { outline: none; box-shadow: 0 0 0 2px var(--c-container-bg), 0 0 0 4px var(--focus-ring-color); }
    #sub-url:focus { --focus-ring-color: var(--c-input-focus-ring-sub); }
    #generic-url:focus { --focus-ring-color: var(--c-input-focus-ring-generic); }
    .btn { padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: var(--fs-p); font-weight: 500; color: var(--c-btn-primary-text); transition: background-color 0.2s; cursor: pointer; border: none; }
    .btn-sub { background-color: var(--c-btn-sub-bg); }
    .btn-sub:hover { background-color: var(--c-btn-sub-hover-bg); }
    .btn-generic { background-color: var(--c-btn-generic-bg); }
    .btn-generic:hover { background-color: var(--c-btn-generic-hover-bg); }
    .btn-secondary { background-color: var(--c-btn-secondary-bg); color: var(--c-btn-secondary-text); padding: 0.25rem 0.75rem; width: 100%; }
    .btn-secondary:hover { background-color: var(--c-btn-secondary-hover-bg); }
    .result-text { word-break: break-all; overflow-wrap: break-word; font-size: var(--fs-result); padding: 0.5rem; border-radius: 0.25rem; background: var(--c-result-bg); margin-top: 1rem; }
    .result-text.success { color: var(--c-result-text-success); }
    .result-text.error { color: var(--c-result-text-error); }
    .flex-row { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
    .action-buttons { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
    @media (max-width: 640px) {
      .container { padding: 1rem; } .section-box { padding: 1rem; }
      h2 { font-size: var(--fs-h2-mobile); } p, .btn { font-size: var(--fs-p-mobile); }
      label { font-size: var(--fs-label-mobile); } .result-text { font-size: var(--fs-result-mobile); }
      .flex-row { flex-direction: column; gap: 0.5rem; } .action-buttons { flex-direction: column; gap: 0.5rem; }
      footer { font-size: 10px; }
    }
  </style>
</head>
<body class="light">
  <button onclick="toggleTheme()" class="theme-toggle"><span class="sun">☀️</span><span class="moon hidden">🌙</span></button>
  <div class="container">
    <h1 class="font-bold text-center mb-8 text-2xl md:text-3xl"><span class="text-blue-500">⚡</span> 通用代理加速服务</h1>
    <div class="section-box">
      <h2 class="font-semibold mb-2">🚀 机场订阅加速</h2>
      <p class="mb-4">输入机场订阅链接，解决无法访问或更新缓慢的问题。</p>
      <div class="flex-row">
        <input id="sub-url" type="text" placeholder="粘贴你的订阅链接 (Clash/V2Ray等)" class="input-field">
        <button onclick="convertSubscriptionUrl()" class="btn btn-sub">生成链接</button>
      </div>
      <p id="sub-result" class="result-text hidden"></p>
      <div id="sub-buttons" class="action-buttons hidden"><button onclick="copyToClipboard(subAcceleratedUrl, '链接')" class="btn btn-secondary">📋 复制链接</button></div>
    </div>
    <div class="section-box">
      <h2 class="font-semibold mb-2">⚡ 通用链接加速</h2>
      <p class="mb-4">加速任何可下载的链接，如 GitHub Releases, Raw, Gist 等。</p>
      <div class="flex-row">
        <input id="generic-url" type="text" placeholder="粘贴任何需要加速的原始链接" class="input-field">
        <button onclick="convertGenericUrl()" class="btn btn-generic">生成链接</button>
      </div>
      <p id="generic-result" class="result-text hidden"></p>
      <div id="generic-buttons" class="action-buttons hidden"><button onclick="copyToClipboard(genericAcceleratedUrl, '链接')" class="btn btn-secondary">📋 复制链接</button></div>
    </div>
    <footer class="mt-6 text-center text-xs">
      <p>这是一个基于 Cloudflare Workers 的通用代理服务。</p>
      <p>原始项目: <a href="https://github.com/l3oku/gh_proxy">l3oku/gh_proxy</a></p>
    </footer>
  </div>
  <div id="toast" class="toast"></div>
  <script>
    const currentDomain = window.location.hostname; let subAcceleratedUrl = ''; let genericAcceleratedUrl = '';
    function toggleTheme() { const body = document.body; body.classList.toggle('dark'); body.classList.toggle('light'); document.querySelector('.sun').classList.toggle('hidden'); document.querySelector('.moon').classList.toggle('hidden'); localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light'); }
    if (localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) { document.body.classList.remove('light'); document.body.classList.add('dark'); document.querySelector('.sun').classList.add('hidden'); document.querySelector('.moon').classList.remove('hidden'); } else { document.body.classList.remove('dark'); document.body.classList.add('light'); }
    function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => { toast.classList.remove('show'); }, 2000); }
    function copyToClipboard(text, type = '内容') { if (!text) return; navigator.clipboard.writeText(text).then(() => { showToast(type + '已复制到剪贴板'); }).catch(err => { showToast('复制失败: ' + err, true); }); }
    
    // 【已简化】生成链接的函数
    function generateUrl(inputId, resultId, buttonsId) { 
        const input = document.getElementById(inputId).value.trim(); 
        const resultEl = document.getElementById(resultId); 
        const buttonsEl = document.getElementById(buttonsId); 
        if (!input) { resultEl.innerHTML = '<strong>错误:</strong> 链接不能为空。'; resultEl.className = 'result-text error'; resultEl.classList.remove('hidden'); buttonsEl.classList.add('hidden'); return null; } 
        if (!input.startsWith('http://') && !input.startsWith('https://')) { resultEl.innerHTML = '<strong>错误:</strong> 链接必须以 http:// 或 https:// 开头。'; resultEl.className = 'result-text error'; resultEl.classList.remove('hidden'); buttonsEl.classList.add('hidden'); return null; } 
        
        const finalUrl = 'https://' + currentDomain + '/' + input; 
        
        // 根据是哪个输入框来更新对应的全局变量
        if (inputId === 'sub-url') {
            subAcceleratedUrl = finalUrl;
        } else {
            genericAcceleratedUrl = finalUrl;
        }

        resultEl.innerHTML = '<strong>加速链接:</strong> ' + finalUrl; 
        resultEl.className = 'result-text success'; 
        resultEl.classList.remove('hidden'); 
        buttonsEl.classList.remove('hidden'); 
        copyToClipboard(finalUrl, '链接'); 
    }
    
    function convertSubscriptionUrl() { generateUrl('sub-url', 'sub-result', 'sub-buttons'); }
    function convertGenericUrl() { generateUrl('generic-url', 'generic-result', 'generic-buttons'); }
  </script>
</body>
</html>
`;


// ==================================================
// Worker 核心逻辑 (已简化, 移除了深度订阅逻辑)
// ==================================================
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname + url.search;

  // 路由1: 访问根路径，返回主页HTML
  if (url.pathname === "/") {
    return new Response(HOMEPAGE_HTML, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' },
    });
  }
  
  // 路由2: 处理所有通用代理请求 (包括订阅链接)
  const targetUrlStr = path.substring(1); // 移除开头的 '/'

  if (!targetUrlStr) {
    return new Response(`用法: ${url.origin}/https://example.com/some/path\n\nGithub: https://github.com/l3oku/gh_proxy\n`, { status: 400 });
  }

  // 白名单检查 (如果开启)
  if (ENABLE_WHITELIST_CHECK) {
      const isDomainAllowed = targetDomains.some(domain => targetUrlStr.startsWith(domain.replace("https://", "")));
      if (!isDomainAllowed) {
          return new Response(`Error: 目标域名不在白名单中。\n\nAllowed domains start with: ${targetDomains.join(", ")}\n`, { status: 403 });
      }
      const isUrlAllowed = urlWhitelist.some(keyword => targetUrlStr.toLowerCase().includes(keyword.toLowerCase()));
      if (!isUrlAllowed) {
          return new Response(`Error: URL 不在白名单中。\n\nURL must contain one of: ${urlWhitelist.join(", ")}\n`, { status: 403 });
      }
  }

  try {
    const modifiedRequest = new Request(targetUrlStr, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    });

    const response = await fetch(modifiedRequest);
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (e) {
    return new Response(`代理请求错误: ${e.message}\n请确保你的链接格式正确，例如：\n${url.origin}/https://raw.githubusercontent.com/user/repo/main/file.txt`, { status: 500 });
  }
}
