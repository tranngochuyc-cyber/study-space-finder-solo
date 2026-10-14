# Báo cáo kiểm thử

Ngày 14/10/2026. Node v24.19.0; Playwright điều khiển Microsoft Edge headless trên Windows. Website được phục vụ HTTP local. Không suy diễn kết quả sang Safari, Firefox hoặc điện thoại thật.

## Unit — 8/8 PASS

Chạy thực tế: `npm test` → `node --test tests/search.test.js`.

| Ca kiểm thử | Mong đợi | Thực tế | Kết quả |
|---|---|---|---|
| Dữ liệu | 18 ID duy nhất, demo, 3 loại, ≥6 khu vực | Đúng | PASS |
| Tiếng Việt | Đặng → dang; tên/địa chỉ/khu vực không dấu tìm được | Đúng | PASS |
| AND giữa các nhóm | Cafe + giá thấp + yên tĩnh + wifi/ac chỉ còn space-01 | Đúng | PASS |
| Biên giá | 50.000 ở nhóm thấp; >50.000 ở nhóm giữa; 3 miễn phí | Đúng | PASS |
| Sort | Hai chiều giá đúng, không đổi mảng nguồn | Đúng | PASS |
| Yêu thích + lọc/rỗng | Kết hợp đúng và trả mảng rỗng hợp lệ | Đúng | PASS |
| Storage hợp lệ/hỏng | Khôi phục ID, bỏ lưu được; JSON sai có cảnh báo | Đúng | PASS |
| Storage bị chặn | Lưu RAM được, có cảnh báo | Đúng | PASS |

## Browser — 14/14 nhóm PASS

Chạy thực tế: `node tests/browser.cjs` với PLAYWRIGHT_MODULE trỏ module có sẵn. Kết quả máy đọc: `test-results/browser-results.json`; ảnh: `list-*`, `detail-*`, `favorites-*`. Kết quả được chạy lại sau sửa vòng Tab và sau chỉnh cỡ chữ.

| Ca kiểm thử | Mong đợi | Thực tế | Kết quả |
|---|---|---|---|
| Tải trang | 18 card | 18 | PASS |
| Tìm tên/địa chỉ/khu vực | an nhien=1, mam xanh=1, thu duc=2 | Đúng | PASS |
| Category + price + quiet + ac; chip | 1 kết quả, bỏ quiet còn 2, reset 18 | Đúng | PASS |
| Sort giao diện | Cao nhất 180.000đ, thấp nhất miễn phí | Đúng | PASS |
| Không kết quả | Empty state, reset phục hồi 18 | Đúng | PASS |
| Yêu thích + refresh + modal | Giữ sau reload, bỏ lưu cập nhật card/count, trả focus | Đúng | PASS |
| Bàn phím modal | Focus vào X, Shift+Tab ở trong, X/backdrop đóng, trả focus | Đúng sau sửa | PASS |
| URL yêu thích | Direct hash, refresh, Back/Forward đổi view đúng | Đúng | PASS |
| Hai tab | Tab khác lưu làm count cập nhật | Đúng | PASS |
| Responsive | List/favorites/modal không tràn 1440/768/360px | Đúng | PASS |
| Mạng lỗi | Nút thử lại, phục hồi khi mạng trở lại | Đúng | PASS |
| JSON rỗng/sai schema | Empty state cho [], error state cho object sai | Đúng | PASS |
| localStorage không dùng được | Toggle vẫn hoạt động, có cảnh báo lưu phiên | Đúng | PASS |
| Runtime | Không pageerror | 0 lỗi thu được | PASS |

## Kiểm tra bổ sung

- `node --check` cho 4 module chính: PASS.
- Đã mở ảnh desktop và mobile/modal để xem phân cấp và chữ tiếng Việt. Tên “An Nhiên Reading Café”, đoạn mô tả và nhãn giá/giờ hiển thị dấu đúng trong ảnh modal 360px.
- Ảnh SVG tự tạo, không request ảnh/font bên thứ ba. Các đường dẫn HTML không bắt đầu bằng `/`; URL JSON dựa trên import.meta.url. Chưa xác nhận trên URL GitHub Pages thực tế.
- Tiêu đề hero, khám phá và yêu thích có nội dung phù hợp; không có trang đặt chỗ giả.

## Chưa thực hiện

| Mục | Kết quả | Lý do/giới hạn |
|---|---|---|
| Lighthouse Performance ≥90 | NOT RUN | Chưa có công cụ Lighthouse trong runtime; không công bố điểm |
| Lighthouse Accessibility ≥90 | NOT RUN | Chưa chạy Lighthouse |
| Audit toàn bộ WCAG 2.2 AA | NOT RUN | Các kiểm thử bàn phím/nhãn không thay thế audit |
| Screen reader NVDA/VoiceOver | NOT RUN | Chưa thử bằng công cụ hỗ trợ thực tế |
| Safari, Firefox, thiết bị thật | NOT RUN | Chỉ Edge headless |
| GitHub Pages URL public | NOT RUN | GitHub CLI đăng nhập không hợp lệ, chưa publish |
| Nghiên cứu usability với sinh viên | NOT RUN | Chưa có người tham gia; không tự tạo số liệu |

Các lần test thất bại ban đầu được giữ trong ERROR-LOG. PASS phản ánh lần chạy sau khi sửa, không che giấu lỗi ban đầu.
