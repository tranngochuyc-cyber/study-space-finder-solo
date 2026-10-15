# Study Space Finder — Solo

## 🌐 Website trực tuyến

### [👉 Mở Study Space Finder trên GitHub Pages](https://tranngochuyc-cyber.github.io/study-space-finder-solo/)

Truy cập trực tiếp trên máy tính hoặc điện thoại, không cần cài đặt. Website đã được triển khai trên GitHub Pages; kiểm tra ngày 15/10/2026 trả về HTTP 200.

Bạn có thể tìm kiếm, lọc địa điểm, xem chi tiết và lưu yêu thích ngay trên website. Dữ liệu địa điểm là minh họa cho dự án học tập.

Website tìm góc học dành cho sinh viên, viết bằng HTML5, CSS3 và JavaScript ES Modules. Không framework, không backend, không cần build. **18 địa điểm đều hư cấu**, địa chỉ/giá/giờ chỉ minh họa. Khu vực dùng tên quen thuộc để học lọc dữ liệu, không phải danh mục hành chính hiện hành.

## Chạy trên máy

Cần Node.js (đã kiểm tra với v24). Mở terminal ngay trong thư mục `study-space-finder-solo`:

```powershell
npm start
```

Mở http://127.0.0.1:4173. Dừng bằng Ctrl+C. Không mở `index.html` bằng `file://`, vì trình duyệt chặn fetch/ES Modules trong ngữ cảnh đó. Không cần `npm install` để chạy website hoặc unit test. `scripts/serve.cjs` chỉ là công cụ HTTP local, không phải backend sản phẩm.

## Chức năng

- Tìm theo tên, địa chỉ và khu vực, hỗ trợ không dấu và chữ Đ.
- Loại địa điểm, khu vực, ngân sách, yên tĩnh và bốn tiện ích. Các điều kiện kết hợp AND; mỗi nhóm loại/khu vực chỉ chọn một giá trị nên không cần OR đa lựa chọn.
- Chip xóa riêng, đặt lại, số kết quả, trạng thái tải/rỗng/lỗi và thử lại.
- Sắp xếp theo tên tiếng Việt, giá tăng/giảm.
- Chi tiết bằng native dialog: Escape, X, backdrop, vòng Tab và trả focus.
- Yêu thích lưu localStorage, đồng bộ card/dialog/danh sách và giữa tab. Khi storage lỗi, chuyển sang bộ nhớ phiên và thông báo.
- `#explore` và `#favorites` hỗ trợ truy cập trực tiếp, refresh, Back/Forward. Chi tiết là modal theo yêu cầu, không có URL riêng.

## Đọc code theo thứ tự

1. `data/spaces.json`: xem một bản ghi.
2. `assets/js/search.js`: hiểu normalize, filter, sort.
3. `assets/js/components/space-cards.js`: biến dữ liệu thành HTML có escape.
4. `assets/js/features/favorites.js`: lưu và phục hồi Set yêu thích.
5. `assets/js/app.js`: nối DOM, state, fetch và các sự kiện.

Đọc tiếp [kiến trúc](docs/ARCHITECTURE.md), [nhật ký học](docs/LEARNING-NOTES.md), [nghiên cứu UX](docs/UX-RESEARCH.md), [câu hỏi bảo vệ](docs/DEFENSE-QUESTIONS.md), [báo cáo kiểm thử](docs/TEST-REPORT.md), [nhật ký lệnh](docs/COMMAND-HISTORY.md) và [nhật ký lỗi](docs/ERROR-LOG.md).

## Kiểm thử

```powershell
npm test
```

Kiểm thử trình duyệt tùy chọn cần Playwright và Microsoft Edge. Mở HTTP server ở terminal khác, sau đó chạy `node tests/browser.cjs`. Có thể đặt `PLAYWRIGHT_MODULE` trỏ tới module Playwright đã cài. Ảnh và JSON được ghi vào `test-results/` (không commit). Không cần Playwright để người dùng sử dụng website.

## Git/GitHub Pages

Dự án có Git repository riêng, không dùng remote của website Indieverse bên ngoài. Source: [GitHub](https://github.com/tranngochuyc-cyber/study-space-finder-solo). GitHub Pages: [Study Space Finder](https://tranngochuyc-cyber.github.io/study-space-finder-solo/). Xem TEST-REPORT để biết kiểm thử URL công khai.

Các lệnh sau là hướng dẫn cho một bản sao dự án. Thay tên và email bằng thông tin của bạn. Repository hiện tại đã được tạo bằng lệnh gh repo create; không cần tạo lại:

```powershell
git config user.name "Tên của bạn"
git config user.email "email-cua-ban@example.com"
gh auth login -h github.com
gh repo create study-space-finder-solo --public --source=. --remote=origin --push
```

Hoặc tạo repository trống trên GitHub, rồi:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/study-space-finder-solo.git
git push -u origin main
```

Trong repository mới: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Giữ `.nojekyll` ở root. Các đường dẫn CSS/JS/ảnh là tương đối; JSON được phân giải từ `import.meta.url`, nên dùng được ở đường dẫn `/study-space-finder-solo/`.

Sau khi Pages báo xong, mở URL mà GitHub cung cấp, thử tìm kiếm, lưu, refresh và truy cập `#favorites`. Chỉ khi URL thực tế hoạt động mới coi là deploy thành công. Không force push, không tải secret/token lên Git.

## Giới hạn

Không có bản đồ, định vị, tài khoản, đặt chỗ, đánh giá, tình trạng mở cửa hay dữ liệu thời gian thực. Không đồng bộ yêu thích giữa thiết bị. Query và bộ lọc không lưu qua refresh; chỉ yêu thích và trang hash được giữ. Minh họa SVG tự tạo trong dự án, không đại diện ảnh thật. Chưa đo Lighthouse hoặc chứng nhận WCAG AA.
