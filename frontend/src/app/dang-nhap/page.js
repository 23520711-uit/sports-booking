import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Logo */} 
        <Link href="/">
            <img src="/pic/tsubasa.png" alt="Logo" className="mx-auto h-12 w-auto cursor-pointer" />
        </Link>

        {/* Tiêu đề */}
        <div>
          <h2 className="text-2xl font-bold text-white">Đăng nhập</h2>
          <p className="text-sm text-gray-400 mt-2">
            Không có tài khoản? <a href="/dang-ky" className="text-cyan-400 hover:underline">Đăng ký</a>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
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
          <div className="text-right">
            <a href="/quen-mat-khau" className="text-sm text-gray-400 hover:text-cyan-400">Quên mật khẩu?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 rounded transition"
          >
            Đăng nhập
          </button>
        </form>

        {/* Footer */}
        <div className="text-xs text-gray-500">
          <a href="/dieu-khoan" className="hover:underline">Điều khoản dịch vụ</a> &nbsp;•&nbsp;
          <a href="/chinh-sach" className="hover:underline">Chính sách bảo mật</a>
        </div>
      </div>
    </div>
  );
}