# Nghiên cứu UX và quyết định thiết kế

Ngày đọc: 14/10/2026. Các nguồn dưới đây đã truy cập được qua công cụ web. Đây là tham khảo bên ngoài, không phải kết quả đo trên Study Space Finder. Không trích tỷ lệ thành công hoặc tuyên bố tăng chuyển đổi cho dự án.

| Nguồn | Điều rút ra | Áp dụng và giới hạn |
|---|---|---|
| [Baymard — Product lists and filtering](https://baymard.com/research-articles/current-state-product-list-and-filtering) | Danh sách, lọc, sắp xếp ảnh hưởng khả năng tìm lựa chọn phù hợp | Đưa ba công cụ gần nhau. Nghiên cứu ecommerce, không chứng minh trực tiếp hành vi sinh viên Việt Nam |
| [Baymard — Applied filters](https://baymard.com/research-articles/how-to-design-applied-filters) | Tổng quan bộ lọc giúp nhận biết và bỏ điều kiện | Chip xóa riêng, đặt lại, số kết quả; cần nghiên cứu người dùng để đánh giá hiệu quả tại đây |
| [NN/g — Ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Hiển thị trạng thái, kiểm soát người dùng, phục hồi lỗi | Loading/error/empty, Escape/X, thử lại, cảnh báo lưu thất bại |
| [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Hướng tới khả năng nhận biết, thao tác bàn phím và tương phản | Nhãn, outline, aria-live, dialog, reduced motion; chưa audit đầy đủ AA |
| [Google — Web Vitals](https://web.dev/articles/vitals) | LCP, INP, CLS đại diện các mặt tải, tương tác và ổn định bố cục | Font hệ thống, ảnh có kích thước, không framework; chưa đo field data hoặc Lighthouse |

Airbnb và Google Maps là gợi ý tổ chức tìm kiếm và thông tin từ brief. Không sao chép giao diện, logo, dữ liệu hoặc ảnh. Không thực hiện khảo sát đầy đủ các trang tài khoản/đặt chỗ của hai dịch vụ; không dùng sự nổi tiếng làm bằng chứng chất lượng.

Phạm vi nội trang: khám phá và danh sách yêu thích là hai view có URL hash; chi tiết là modal có dữ liệu đầy đủ. Không có mục điều hướng giả đến hồ sơ hoặc dịch vụ chưa kết nối. Không hiển thị điểm đánh giá khách hàng, “đang mở cửa” hoặc chỗ trống giả.

Ảnh: SVG tự tạo trong dự án, chỉ minh họa loại không gian. Không có tài sản thương hiệu hoặc ảnh từ nguồn không rõ giấy phép. Hình giữa các địa điểm có thể lặp vì không phải ảnh thật.

Điều cần làm sau: thử với sinh viên thật để xem bộ lọc nào hữu ích; kiểm tra bằng screen reader; đo Lighthouse ở URL triển khai; thu thập dữ liệu địa điểm được phép sử dụng trước khi biến demo thành sản phẩm thực tế.
