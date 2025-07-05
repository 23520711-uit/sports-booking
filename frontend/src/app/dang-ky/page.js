export default function DANGKY() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Logo dẫn về trang chủ */}
        <a href="/">
          <img src="/pic/tsubasa.png" alt="Logo" className="mx-auto h-12 w-auto cursor-pointer" />
        </a>

        {/* Tiêu đề */}
        <div>
          <h2 className="text-2xl font-bold text-white">Tạo tài khoản</h2>
          <p className="text-sm text-gray-400 mt-2">
            Đã có tài khoản? <a href="/dang-nhap" className="text-cyan-400 hover:underline">Đăng nhập</a>
          </p>
        </div>

        {/* Form đăng ký */}
        <form className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Họ tên"
            className="w-full px-4 py-2 rounded bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="email"
            placeholder="Địa chỉ Email"
            className="w-full px-4 py-2 rounded bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 rounded bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <label className="flex items-center space-x-2 text-sm text-gray-300">
            <input type="checkbox" className="form-checkbox text-cyan-400" />
            <span>Tôi đã đọc và đồng ý với <a href="dieu-khoan" className="text-cyan-400 underline">Điều khoản dịch vụ</a></span>
          </label>

          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 rounded transition"
          >
            Đăng ký với email
          </button>
        </form>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center">
          <a href="dieu-khoan" className="hover:underline">Điều khoản dịch vụ</a> &nbsp;•&nbsp;
          <a href="chinh-sach" className="hover:underline">Chính sách bảo mật</a>
        </div>
      </div>
    </div>
  );
}