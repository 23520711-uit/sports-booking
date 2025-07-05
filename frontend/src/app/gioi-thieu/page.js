import NAVBAR from '../components/navbar';

export default function GioiThieuPage() {
  return (
    <>
      <NAVBAR />

      <main className="max-w-3xl mx-auto py-16 px-4 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Giới thiệu</h1>

        <p className="mb-6">
          Vireo là nền tảng quản lý và đặt sân thể thao trực tuyến, giúp đơn giản hóa quá trình vận hành và kết nối giữa khách hàng với các cơ sở sân bãi.
        </p>

        <h2 className="text-xl font-semibold mb-2">Chúng tôi làm gì?</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Cung cấp hệ thống đặt sân trực tuyến nhanh chóng, chính xác.</li>
          <li>Hỗ trợ quản lý lịch sân, tình trạng sân theo thời gian thực.</li>
          <li>Tích hợp quản lý khách hàng, chương trình khuyến mãi và chính sách ưu đãi.</li>
          <li>Phù hợp với nhiều loại hình sân như bóng đá, cầu lông, tennis, bóng rổ, bơi lội...</li>
          <li>Hệ thống thông báo, nhắc lịch tự động, giảm thiểu sai sót cho cả khách hàng và nhân viên vận hành.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Lợi ích mang lại</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Tiết kiệm thời gian cho cả khách hàng và cơ sở sân bãi.</li>
          <li>Tối ưu hóa năng quản lý, giảm công việc thủ công.</li>
          <li>Hỗ trợ vận hành linh hoạt cho nhiều mô hình sân thể thao.</li>
          <li>Giao diện thân thiện, dễ tiếp cận với mọi đối tượng người dùng.</li>
        </ul>
      </main>
    </>
  );
}