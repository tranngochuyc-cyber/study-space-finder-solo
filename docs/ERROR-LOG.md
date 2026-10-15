# Nhật ký lỗi thực tế — 14/10/2026

| Lỗi đã gặp | Nguyên nhân | Xử lý | Cách phát hiện lại |
|---|---|---|---|
| Git cha báo dubious ownership | Owner thư mục khác user của phiên | Dùng `git -c safe.directory=...` riêng cho lệnh đọc trạng thái; không sửa global | git status ở root |
| GitHub CLI trong sandbox báo token invalid | Môi trường hạn chế làm kiểm tra đăng nhập thất bại; kiểm tra lại ngoài sandbox xác nhận đăng nhập hợp lệ | Chạy lại gh auth status với quyền được duyệt, sau đó tạo repo/push/bật Pages; không cần đăng nhập lại, không đọc auth file | gh auth status ngoài sandbox |
| Commit đầu báo Author identity unknown | Repository mới chưa có user.name/email | Dùng danh tính tác giả đã có trong commit mới nhất của repo cha với `git -c` chỉ áp dụng từng lệnh; không cấu hình global | git commit |
| HTTP local bị socket access forbidden; Edge crash khi launch | Sandbox hạn chế socket/tiến trình/profile trình duyệt | Xin quyền thực thi và chạy server/Edge ngoài sandbox | Invoke-WebRequest và browser tests |
| EADDRINUSE khi chạy server lần hai | Server sandbox cũ vẫn giữ cổng 4173 | Dừng đúng session server cũ bằng Ctrl+C rồi mở lại | Output node scripts/serve.cjs |
| Browser timeout tới 127.0.0.1 | Server ban đầu bị giới hạn truy cập sandbox | Khởi động lại ngoài sandbox; trang sau đó tải 18 card | Browser test initial load |
| Assertion focus ngay sau Escape thất bại | Test đọc focus trước khi close event chạy | Test chờ điều kiện focus cụ thể bằng waitForFunction | Test modal remove/save |
| Shift+Tab không ở trong dialog | Native dialog có thể chuyển focus ra browser chrome | Thêm handler Tab/Shift+Tab wrap về nút cuối/đầu trong dialog | Test keyboard trap; sau sửa PASS |

Network abort, JSON sai và localStorage bị chặn trong bộ kiểm thử là lỗi cố ý mô phỏng để xác nhận phục hồi, không phải lỗi triển khai còn tồn tại. Sau các sửa trên, 14 nhóm kiểm thử browser đạt và không thu được pageerror. Chưa có kết quả Lighthouse hoặc kiểm thử screen reader.

15/10/2026: Cổng 4173 bị chiếm và không truy cập được. Thêm PORT tùy chọn cho server, chạy ở 4187; kiểm thử thành công. Ảnh card trước đó bị thuộc tính height HTML giữ chiều cao cố định; thêm CSS height:auto khắc phục.

