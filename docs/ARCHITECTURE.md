# Kiến trúc và 5 giai đoạn

## Giai đoạn 1 — khảo sát và giao diện

Thư mục cha chứa website Indieverse và nhiều thay đổi chưa commit. Tạo thư mục riêng và Git riêng để tránh ghi đè dự án đó. Đọc QUALITY.md trước khi sửa. Phạm vi sản phẩm gồm khám phá, danh sách yêu thích và modal chi tiết; không tự thêm trang hồ sơ, blog hoặc backend.

Wireframe desktop: header → hero hai cột → search → tabs loại → sidebar bộ lọc + grid 3 cột → thông điệp kết → footer. Tablet: grid 2 cột. Mobile: hero một cột, filter phía trên kết quả, card một cột. Yêu thích dùng cùng vùng kết quả để tái sử dụng chức năng; nhãn và trạng thái rỗng riêng. Modal là lớp native trên trang.

Hệ thống UI: nền kem `#fbfaf6`, chữ `#213d36`, xanh `#215c4e`, viền `#e1e5dd`; font Segoe UI/Arial hỗ trợ tiếng Việt, serif Georgia chỉ nhấn một câu. Radius 7–18px, khoảng cách 8/16/24/32px, outline focus nâu. Minh họa SVG nội bộ giúp chạy không phụ thuộc mạng ảnh. Kiểm tra giai đoạn: HTML/CSS được tạo, đường dẫn tương đối; syntax JS kiểm tra ở giai đoạn 2–3.

## Giai đoạn 2 — dữ liệu và trình bày

`spaces.json` có 18 ID ổn định, 3 loại và nhiều khu vực. Schema: id, name, district, type, price (VND), unit, quiet (1–3), amenities, address, description, hours, demo. `validateSpaces` chặn sai kiểu, trùng ID, giá âm hoặc tiện ích lạ. `space-cards.js` tạo card/modal và escape dữ liệu. Kiểm tra: đếm dữ liệu và kiểm tra cú pháp; sau đó browser xác nhận 18 card.

## Giai đoạn 3 — tương tác

`search.js` chỉ nhận dữ liệu, state và Set yêu thích, trả mảng mới. `favorites.js` giữ Set trong closure và ghi localStorage có try/catch. `app.js` làm điều phối. Mỗi thay đổi gọi render, mọi nơi đọc cùng một nguồn favorites. Kiểm tra: 8 unit tests về tiếng Việt, AND, biên giá, sort, storage và kết quả rỗng.

## Giai đoạn 4 — chất lượng

Native dialog + vòng Tab tường minh, khôi phục focus, thông báo aria-live, nhãn input, giảm chuyển động. Ảnh có kích thước cố định và lazy loading, font hệ thống, không SDK bên ngoài. Browser tests thực tế ở 1440/768/360px cho khám phá/yêu thích/modal, mạng lỗi, JSON lỗi, storage chặn. Xem TEST-REPORT để phân biệt đã kiểm và chưa đo.

## Giai đoạn 5 — bàn giao

README, các tài liệu học và lịch sử Git nhỏ theo chức năng. GitHub Pages chưa xuất bản do đăng nhập không hợp lệ; cung cấp các bước tự triển khai. Không thay đổi cấu hình triển khai của repository cha.

## Cấu trúc

```text
index.html                     cấu trúc ngữ nghĩa và form
.nojekyll                      GitHub Pages phục vụ file tĩnh
assets/css/base.css            reset, token, font, focus
assets/css/components.css      layout, component, responsive
assets/images/*.svg            minh họa tự tạo
assets/js/app.js               controller + validate/fetch/modal
assets/js/search.js            tìm/lọc/sort thuần
assets/js/components/space-cards.js  view helpers
assets/js/features/favorites.js     persistence
data/spaces.json               dữ liệu demo
scripts/serve.cjs              HTTP local phục vụ phát triển
scripts/create-demo.cjs        công cụ soạn dữ liệu, không cần chạy lại
tests/search.test.js           kiểm thử logic bằng Node
tests/browser.cjs              kiểm thử tích hợp bằng Edge
docs/*.md                     tài liệu tiếng Việt
```

Nếu chia nhóm 3: người 1 phụ trách dữ liệu/search; người 2 UI/card/modal/CSS; người 3 favorites/integration/test. Thống nhất schema và hàm export trước; không cùng sửa app.js trong một nhánh để giảm xung đột.
