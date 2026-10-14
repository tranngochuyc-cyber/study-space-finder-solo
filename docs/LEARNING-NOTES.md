# Nhật ký học tập

## 1. HTML/CSS: cấu trúc trước, trang trí sau

`index.html` dùng header/nav/main/section/aside/footer để mô tả ý nghĩa. Mỗi input có label; button dùng cho hành động, anchor dùng cho điều hướng. `base.css` giữ biến màu, font, focus và reset; `components.css` giữ từng khối và media query. Grid bố trí card, Flex bố trí hàng công cụ. Khi đọc CSS, tìm tên class trong HTML trước.

Ví dụ: `grid-template-columns: repeat(3, minmax(0, 1fr))` tạo ba cột đều nhau; `minmax(0,...)` giúp nội dung không ép cột vượt chiều rộng. Ở 360px chuyển một cột. `prefers-reduced-motion` tắt chuyển động theo thiết lập người dùng.

## 2. JSON → giao diện

Luồng: `loadSpaces()` → `fetch(new URL(..., import.meta.url))` → kiểm tra HTTP → `response.json()` → `validateSpaces()` → `spaces` → `selectSpaces()` → `cardHTML()` → DOM.

`fetch` bất đồng bộ nên dùng async/await. HTTP 404 không tự ném lỗi; cần `if (!response.ok) throw ...`. JSON có thể đúng cú pháp nhưng sai cấu trúc, nên vẫn phải validate. Dữ liệu mảng rỗng là hợp lệ và hiển thị empty state, không coi là lỗi mạng.

`cardHTML(space, saved)` tạo một card; `detailHTML` tạo chi tiết. `escapeHTML` chuyển `<` thành `&lt;`, tránh dữ liệu được hiểu thành thẻ. Không chèn trực tiếp dữ liệu người dùng chưa xử lý vào innerHTML. ID và type đã được kiểm tra trước khi dùng trong thuộc tính/đường dẫn ảnh.

## 3. Tìm tiếng Việt và lọc

`normalize(' Đặng ')` cho `'dang'`: NFD tách dấu, regex bỏ dấu kết hợp, đổi Đ/đ, lowercase rồi trim. Chữ Đ không được NFD đổi thành D, phải xử lý riêng. Ghép name/address/district để tìm một truy vấn trong cả ba trường.

`selectSpaces(spaces, state, favorites)` không đọc DOM. Ví dụ state có `type:'cafe'`, `price:'low'`, `amenities:['wifi','ac']` nghĩa là cà phê VÀ giá ≤50.000 VÀ có Wi-Fi VÀ điều hòa. Mỗi nhóm chỉ có một lựa chọn, các tiện ích đều là điều kiện bắt buộc. Nếu mở rộng thành nhiều quận: dùng `selectedDistricts.includes(space.district)` để OR trong nhóm, vẫn AND với giá.

Chip là cách nhìn thấy state hiện tại. Xóa chip phải thay state, đồng bộ form rồi render; không chỉ xóa phần tử DOM. `reset()` xóa truy vấn và bộ lọc, trở lại khám phá toàn bộ.

## 4. Sắp xếp

Sort theo `localeCompare(...,'vi')` cho tên tiếng Việt. Giá tăng dùng `a.price - b.price`, giảm đảo lại. Nếu giá bằng nhau, sort tên để kết quả ổn định. `filter()` tạo mảng mới trước `sort()`, vì sort làm thay đổi mảng tại chỗ. Ngân sách so theo giá niêm yết demo; đơn vị đồ uống/ngày khác nhau được ghi rõ, không quy đổi giá theo giờ.

## 5. Yêu thích

`createFavorites` tạo closure giữ `ids = new Set()`. Set ngăn trùng ID. `toggle(id)` thêm hoặc xóa rồi `JSON.stringify([...ids])` để lưu. `get ids()` trả bản sao, ngăn nơi khác sửa trực tiếp trạng thái nội bộ.

Storage có thể ném SecurityError hoặc quota exceeded. try/catch giữ thao tác hiện tại trong RAM và báo rõ không lưu lâu dài. JSON hỏng được bỏ qua an toàn, không làm website crash. `storage` event giúp tab khác đồng bộ; tab đang ghi phải tự render vì event không phát lại ở chính tab đó.

## 6. Controller và modal

`app.js` giữ một state chung. `syncControls` đưa state vào form; `render` đưa kết quả vào card, count, chips, navigation. Event delegation trên document tìm button gần nhất nên card render lại không cần đăng ký listener từng nút.

`openDetail` ghi lại nút mở, tạo nội dung, gọi `showModal`, focus nút X. Native dialog làm nền inert. Handler keydown giữ Tab/Shift+Tab giữa nút đầu/cuối. Escape dùng hành vi native; close event khôi phục focus. Khi card đã biến mất do bỏ lưu, focus quay về vùng kết quả thay vì phần tử rời DOM.

Sự kiện close xảy ra sau hành động đóng, nên kiểm thử phải chờ điều kiện focus, không kết luận ngay sau keypress. Không dùng sleep cố định nếu có thể chờ trạng thái cụ thể.

## 7. Trạng thái và URL

Đang tải: aria-busy + thông báo. Lỗi: lời giải thích và nút thử lại. Không kết quả: nút trở lại toàn bộ. `#favorites` có thể tải trực tiếp trên GitHub Pages vì server vẫn phục vụ index.html. Query không lưu trong URL là giới hạn có chủ ý của bản solo; không có deep link riêng cho modal.

## 8. Các file hỗ trợ

`scripts/serve.cjs` cung cấp MIME đúng cho module/JSON và chặn đường dẫn thoát root. `create-demo.cjs` tạo dữ liệu minh họa + SVG một lần; sửa JSON trực tiếp nếu học quản lý dữ liệu, không chạy lại nếu muốn giữ các thay đổi thủ công. `package.json` chỉ có script, không cần dependency runtime. `tests/` không được import vào website. `.gitignore` bỏ kết quả kiểm thử và node_modules khỏi Git.

## Bài tập tự làm

1. Thêm địa điểm thứ 19, chạy npm test và sửa test số lượng theo yêu cầu mới.
2. Thêm lọc quận nhiều lựa chọn với OR, viết test có hai quận.
3. Tự giải thích vì sao Set cần chuyển sang array trước JSON.stringify.
4. Thêm query vào URLSearchParams và kiểm tra refresh/Back, tránh lưu state bằng hai nguồn không đồng bộ.
