import NAVBAR from '../components/navbar';

export default function ChinhSachPage() {
  return (
    <>
      <NAVBAR />

      <main className="max-w-4xl mx-auto py-16 px-4 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Chính sách bảo mật</h1>

        <p className="mb-6">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng khi sử dụng hệ thống Vireo. Chính sách này quy định cách thức chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn.
        </p>

        {/* Mục 1 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">1. Thông tin thu thập</h2>
          <p>Khi bạn sử dụng hệ thống, chúng tôi có thể thu thập các loại thông tin sau:</p>
          <ul className="list-disc list-inside">
            <li>Thông tin cá nhân: Họ tên, số điện thoại, email, địa chỉ, thông tin tài khoản đăng nhập.</li>
            <li>Thông tin giao dịch: Lịch sử đặt sân, thanh toán, huỷ đặt chỗ.</li>
            <li>Dữ liệu kỹ thuật: Địa chỉ IP, thiết bị, trình duyệt, hệ điều hành, cookies.</li>
            <li>Thông tin khác: Nội dung phản hồi, trao đổi hỗ trợ người dùng.</li>
          </ul>
        </div>

        {/* Mục 2 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">2. Mục đích sử dụng thông tin</h2>
          <p>Thông tin thu thập được sử dụng để:</p>
          <ul className="list-disc list-inside">
            <li>Cung cấp và vận hành dịch vụ đặt sân.</li>
            <li>Quản lý tài khoản, xử lý giao dịch, gửi thông báo liên quan đến dịch vụ.</li>
            <li>Hỗ trợ khách hàng, xử lý khiếu nại và cải thiện chất lượng dịch vụ.</li>
            <li>Đảm bảo an toàn, bảo mật hệ thống, phòng ngừa hành vi gian lận.</li>
            <li>Thực hiện các nghĩa vụ pháp lý (nếu có).</li>
          </ul>
        </div>

        {/* Mục 3 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">3. Bảo mật và lưu trữ thông tin</h2>
          <ul className="list-disc list-inside">
            <li>Thông tin cá nhân của người dùng được lưu trữ trên hệ thống máy chủ bảo mật.</li>
            <li>Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp nhằm ngăn chặn việc truy cập trái phép, mất mát, rò rỉ hoặc thay đổi dữ liệu.</li>
            <li>Thời gian lưu trữ: Thông tin người dùng được lưu trữ trong thời gian sử dụng dịch vụ và tối đa 5 năm kể từ khi ngừng sử dụng, trừ khi pháp luật có quy định khác.</li>
          </ul>
        </div>

        {/* Mục 4 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">4. Chia sẻ thông tin với bên thứ ba</h2>
          <p>Chúng tôi cam kết không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba, ngoại trừ:</p>
          <ul className="list-disc list-inside">
            <li>Khi có sự đồng ý của bạn.</li>
            <li>Theo yêu cầu của cơ quan chức năng có thẩm quyền theo quy định pháp luật.</li>
            <li>Đối tác cung cấp dịch vụ hỗ trợ kỹ thuật, vận hành hệ thống (trong phạm vi cần thiết và có cam kết bảo mật).</li>
          </ul>
        </div>

        {/* Mục 5 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">5. Quyền của người dùng</h2>
          <ul className="list-disc list-inside">
            <li>Kiểm tra, cập nhật, chỉnh sửa thông tin cá nhân của mình trên hệ thống.</li>
            <li>Yêu cầu xóa thông tin khi không còn sử dụng dịch vụ (trừ trường hợp phải lưu trữ theo quy định pháp luật).</li>
            <li>Kiểm tra yêu cầu hỗ trợ về quyền riêng tư qua các kênh liên hệ chính thức của hệ thống.</li>
          </ul>
        </div>

        {/* Mục 6 */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">6. Thay đổi chính sách</h2>
          <p>
            Chính sách bảo mật có thể được cập nhật định kỳ nhằm phù hợp với các thay đổi pháp luật hoặc hoạt động dịch vụ. Mọi thay đổi sẽ được thông báo rõ ràng trên hệ thống.
          </p>
        </div>
      </main>
    </>
  );
}