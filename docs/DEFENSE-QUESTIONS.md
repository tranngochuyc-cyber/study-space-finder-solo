# Câu hỏi bảo vệ

| Câu hỏi | Trả lời ngắn | File/hàm |
|---|---|---|
| Website có backend không? | Không. Server local chỉ phục vụ file để fetch/module chạy; Pages cũng phục vụ tĩnh. | scripts/serve.cjs |
| ES Modules có lợi gì? | import/export phân chia trách nhiệm, tránh biến global, trình duyệt hỗ trợ trực tiếp. | assets/js/app.js |
| JSON đi đến card thế nào? | fetch → response.json → validate → state → selectSpaces → cardHTML → DOM. | loadSpaces, render |
| Vì sao phải kiểm tra response.ok? | fetch vẫn resolve với HTTP 404/500. | loadSpaces |
| Tìm không dấu xử lý Đ ra sao? | NFD bỏ dấu kết hợp, thay Đ/đ riêng rồi lowercase. | search.js / normalize |
| AND và OR khác gì? | AND yêu cầu mọi nhóm đúng; OR cho nhiều giá trị trong một nhóm. Bản này single-select, mọi tiện ích chọn đều bắt buộc. | selectSpaces |
| Tại sao không sort mảng gốc? | sort mutate; filter trước tạo mảng mới để giữ dữ liệu nguồn. | selectSpaces |
| Giá miễn phí có lọc được không? | Có, dùng so sánh bằng 0; không kiểm tra truthy để bỏ mất giá 0. | selectSpaces, money |
| Vì sao dùng Set? | ID duy nhất, has/add/delete rõ ràng. | favorites.js |
| localStorage lỗi thì sao? | Catch, giữ trong RAM, báo không đảm bảo qua refresh. | createFavorites, toggle |
| Tab khác cập nhật sao? | Nghe storage event, reload và render lại. | app.js |
| XSS được hạn chế thế nào? | Escape các chuỗi dữ liệu khi tạo HTML; kiểm tra ID/type/amenity. | escapeHTML, validateSpaces |
| Modal hỗ trợ bàn phím thế nào? | showModal + focus ban đầu, vòng Tab, Escape, trả focus khi đóng. | openDetail, keydown, close |
| Nếu bỏ lưu khiến card biến mất? | Trả focus về results thay vì nút đã bị xóa. | dialog close handler |
| Tại sao dùng hash navigation? | Dễ tải trực tiếp trên hosting tĩnh không cần rewrite. | hashchange |
| Có đo Lighthouse ≥90 chưa? | Chưa; mục tiêu không đồng nghĩa với kết quả đo. | TEST-REPORT.md |
| Hình/giá/giờ có thật không? | Không, tất cả địa điểm hư cấu và nhãn demo rõ ràng. | data/spaces.json |
| Chia việc ba người ra sao? | Data/search; UI/modal; favorites/integration/tests, thống nhất schema trước. | ARCHITECTURE.md |
| Hạn chế chính? | Không dữ liệu thật, tài khoản, đặt chỗ, maps; lưu cục bộ theo origin; query không giữ sau refresh. | README.md |
| Chứng minh đã kiểm thử bằng gì? | Script tái chạy, JSON kết quả, ảnh và báo cáo phân biệt PASS/NOT RUN. | tests/, test-results/ |
