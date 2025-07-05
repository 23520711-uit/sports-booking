import NAVBAR from '../components/navbar';

export default function DieuKhoanPage() {
  return (
    <>
      <NAVBAR />

      <main className="max-w-4xl mx-auto py-16 px-4 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Điều khoản dịch vụ</h1>

        <p className="mb-6">
          Chào mừng bạn đến với Vireo. Vui lòng đọc kỹ các điều khoản sử dụng dưới đây trước khi sử dụng dịch vụ của chúng tôi.
        </p>

        {/* Điều khoản 1 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">1. Chấp nhận điều khoản</h2>
          <p>
            Khi truy cập và sử dụng hệ thống, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào trong các điều khoản, vui lòng ngưng sử dụng dịch vụ.
          </p>
        </div>

        {/* Điều khoản 2 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">2. Đối tượng sử dụng</h2>
          <ul className="list-disc list-inside">
            <li>Khách hàng cá nhân, nhóm, tổ chức có nhu cầu đặt sân tập thể thao.</li>
            <li>Cơ sở kinh doanh sân thể thao đăng ký tham gia hệ thống để quản lý và vận hành sân bãi.</li>
          </ul>
        </div>

        {/* Điều khoản 3 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">3. Quyền và trách nhiệm của người dùng</h2>
          <ul className="list-disc list-inside">
            <li>Cung cấp thông tin chính xác khi đăng ký và sử dụng dịch vụ.</li>
            <li>Chịu trách nhiệm bảo mật thông tin tài khoản.</li>
            <li>Tuân thủ các quy định, chính sách và thanh toán, huỷ đặt chỗ, hoàn tiền (nếu có).</li>
            <li>Không sử dụng hệ thống cho mục đích gian lận, phá hoại hoặc các hành vi vi phạm pháp luật.</li>
          </ul>
        </div>

        {/* Điều khoản 4 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">4. Quyền và trách nhiệm của hệ thống</h2>
          <ul className="list-disc list-inside">
            <li>Cung cấp nền tảng đặt sân, quản lý sân và các dịch vụ hỗ trợ đi kèm.</li>
            <li>Bảo vệ thông tin người dùng theo chính sách bảo mật.</li>
            <li>Có thể tạm thời chặn tài khoản nếu phát hiện hành vi vi phạm điều khoản.</li>
          </ul>
        </div>

        {/* Điều khoản 5–8 (có thể thêm tiếp như trên) */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">5. Thay đổi dịch vụ</h2>
          <p>
            Chúng tôi có quyền cập nhật, thay đổi các tính năng, nội dung, hoặc ngừng cung cấp dịch vụ vào bất cứ thời điểm nào mà không cần thông báo trước, nhưng sẽ luôn cố gắng thông báo kịp thời cho người dùng nếu có thay đổi quan trọng.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg">6. Miễn trừ trách nhiệm</h2>
          <p>
            Chúng tôi không chịu trách nhiệm về các sự cố do lỗi đường truyền internet, thiết bị cá nhân của người dùng, hoặc các sự kiện bất khả kháng ngoài khả năng kiểm soát.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg">7. Chính sách bảo mật</h2>
          <p>
            Mọi thông tin cá nhân người dùng được thu thập và xử lý tuân thủ theo chính sách bảo mật của chúng tôi. (Xem chi tiết tại trang Chính Sách Bảo Mật).
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-lg">8. Liên hệ</h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi hay khiếu nại nào liên quan đến điều khoản, vui lòng liên hệ: <br />
            Email: vireo.contact@gmail.com <br />
            Hotline: 1111111111
          </p>
        </div>
      </main>
    </>
  );
}
