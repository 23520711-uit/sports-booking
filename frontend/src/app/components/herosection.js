'use client';

export default function HEROSECTION() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Website đặt sân thể thao cấp tốc
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Dễ dàng tìm kiếm và đặt lịch các sân bóng đá, cầu lông, tennis... gần bạn. 
          Cập nhật thời gian thực về khung giờ trống, đặt sân ngay trên website chỉ trong vài phút, 
          không cần gọi điện, không lo hết chỗ.
        </p>
        <a
          href="/dat-san"
          className="inline-block bg-teal-400 text-white px-6 py-3 rounded hover:bg-teal-500 transition"
        >
          Bắt đầu đặt sân
        </a>
      </section>
    </main>
  );
}