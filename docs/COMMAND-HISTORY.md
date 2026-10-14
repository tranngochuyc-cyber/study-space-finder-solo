# Nhật ký lệnh thực tế

Ngày 14/10/2026, shell PowerShell. Các lệnh chính dưới đây đã chạy; lệnh kiểm thử có thể chạy nhiều lần khi phát hiện/sửa lỗi. Những lần chạy cần mạng local hoặc browser được xin quyền ngoài sandbox. Công cụ apply_patch dùng để viết file, không phải lệnh terminal.

## Khảo sát (thư mục cha web_review_game)

```powershell
Get-Content -LiteralPath 'C:\Users\HP-VT\.codex\attachments\98b00b93-6dc2-4732-9d85-38ae05bef8d9\Pasted text.txt' -Raw
Get-Content -LiteralPath 'QUALITY.md' -Raw
Get-ChildItem -Force | Select-Object Mode,Name
git status --short
git -c safe.directory='D:/folder lv/folder IT/Code/web_review_game' status --short
Get-Content package.json -Raw
git -c safe.directory='D:/folder lv/folder IT/Code/web_review_game' remote -v
gh auth status
git -c safe.directory='D:/folder lv/folder IT/Code/web_review_game' log -1 --format='%an <%ae>'
git -c safe.directory='D:/folder lv/folder IT/Code/web_review_game' config --get user.name
git -c safe.directory='D:/folder lv/folder IT/Code/web_review_game' config --get user.email
```

Mục đích: đọc yêu cầu/quy chuẩn, xác nhận dự án cũ có thay đổi, biết remote cũ để không dùng nhầm. Git status đầu lỗi ownership, lệnh có `-c` giải quyết cho một lần đọc. GitHub báo token invalid. Danh tính tác giả lấy từ commit đã có, không đọc file xác thực.

Đã kiểm tra vị trí Node/Python/gh bằng `Get-Command node,python,gh -ErrorAction SilentlyContinue | Select-Object Name,Source`; kiểm tra module bằng `require.resolve` và liệt kê tên package trong runtime. Runtime có Playwright nhưng không có Chromium tải sẵn; dùng Edge có sẵn.

## Tạo và kiểm tra (trong study-space-finder-solo)

```powershell
node scripts/create-demo.cjs
node --check assets/js/app.js
node --check assets/js/search.js
node --check assets/js/features/favorites.js
node --check assets/js/components/space-cards.js
node scripts/serve.cjs
npm test
$env:PLAYWRIGHT_MODULE='C:/Users/HP-VT/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
node tests/browser.cjs
Invoke-WebRequest -Uri 'http://127.0.0.1:4173' -UseBasicParsing | Select-Object StatusCode
```

create-demo tạo 18 bản ghi và SVG. check xác nhận cú pháp. serve mở HTTP local cổng 4173. npm test chạy unit tests. browser chạy tương tác thật và chụp ảnh. Invoke-WebRequest ban đầu lỗi sandbox; kiểm tra trang qua browser thành công sau khi khởi động lại server đúng quyền. Đã gửi Ctrl+C tới session server sandbox cũ.

Đã sửa điều kiện chờ focus trong test bằng lệnh thực tế:

```powershell
(Get-Content -LiteralPath 'tests/browser.cjs' -Raw).Replace("assert.equal(await page.evaluate(()=>document.activeElement.id),'results');","await page.waitForFunction(()=>document.activeElement.id==='results');") | Set-Content -LiteralPath 'tests/browser.cjs' -Encoding utf8
```

Đã định dạng lại CSS bằng script Node inline (không thay đổi thuộc tính): tách `{`, `;`, `}` thành dòng và thụt lề để người học dễ đọc. Lệnh thực tế:

```powershell
node -e "const fs=require('fs');for(const f of ['assets/css/base.css','assets/css/components.css']){const s=fs.readFileSync(f,'utf8');let d=0;const lines=[];let text='';for(const c of s){if(c==='{'){lines.push('  '.repeat(d)+text.trim()+' {');text='';d++;}else if(c==='}'){if(text.trim())lines.push('  '.repeat(d)+text.trim());text='';d--;lines.push('  '.repeat(d)+'}');}else if(c===';'){text+=c;lines.push('  '.repeat(d)+text.trim());text='';}else{text+=c;}}fs.writeFileSync(f,lines.join('\n')+'\n');}"
```

## Git riêng

```powershell
git init -b main
git add index.html .nojekyll .gitignore package.json assets/css scripts/serve.cjs
git commit -m "feat: create responsive Study Space Finder shell"
git -c user.name='tranngochuyc-cyber' -c user.email='242765205+tranngochuyc-cyber@users.noreply.github.com' commit -m "feat: create responsive Study Space Finder shell"
git add data assets/images assets/js scripts/create-demo.cjs
git -c user.name='tranngochuyc-cyber' -c user.email='242765205+tranngochuyc-cyber@users.noreply.github.com' commit -m "feat: add demo spaces search filters details and favorites"
git status --short
```

Commit không có danh tính bị từ chối; commit với danh tính từ lịch sử cha thành công. Không push, không force push, không sửa Git cha. Các commit bổ sung cho kiểm thử/tài liệu được ghi trong `git log`.

## Chỉ đề xuất, chưa chạy

Lệnh đăng nhập, tạo remote, push và bật Pages trong README là hướng dẫn cho người dùng, **không nằm trong những công việc đã thực hiện**. Chưa chạy Lighthouse. Chưa cài framework hoặc thư viện runtime nào vào sản phẩm.
