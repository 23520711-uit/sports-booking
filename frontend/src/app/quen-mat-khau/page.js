export default function QuenMatKhauPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Icon khóa */}
        <a href="/" className="flex justify-center">
            <div className="bg-cyan-400 p-3 rounded-full cursor-pointer hover:bg-cyan-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2m4 0v4m0-4h4m-4 0H8m4-4v4m0 0v4" />
                </svg>
            </div>
        </a>

        {/* Tiêu đề */}
        <div>
          <h2 className="text-2xl font-bold text-white">Đổi mật khẩu</h2>
          <p className="text-sm text-gray-400 mt-2">
            Đừng lo, chúng tôi sẽ giúp bạn lấy lại mật khẩu
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Địa chỉ Email"
            className="w-full px-4 py-2 rounded bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 rounded transition"
          >
            Đổi mật khẩu
          </button>
        </form>

        {/* Link quay lại đăng nhập */}
        <div className="text-sm text-gray-400">
          <a href="/dang-nhap" className="hover:underline">← Quay trở lại đăng nhập</a>
        </div>
      </div>
    </div>
  );
}