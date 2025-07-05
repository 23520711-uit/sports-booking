'use client';

import Link from 'next/link';

export default function NAVBAR() {
  return (
    <nav className="w-full bg-white shadow-sm px-4 py-2 flex items-center justify-between">
        {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img src="/pic/tsubasa.png" alt="Logo" className="h-8 w-auto cursor-pointer" />
            </Link>
          </div>
    
      {/* Menu items */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <Link href="/gioi-thieu" className="hover:text-black">Giới thiệu</Link>
        <Link href="/dieu-khoan" className="hover:text-black">Điều khoản</Link>
        <Link href="/chinh-sach" className="hover:text-black">Chính sách</Link>
        <Link href="/dang-nhap" className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Đăng nhập</Link>
        <Link href="/dat-san" className="bg-teal-400 text-white px-4 py-1 rounded hover:bg-teal-500">Đặt sân ngay</Link>
      </div>
    </nav>
  );
}

