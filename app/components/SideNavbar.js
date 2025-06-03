"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

const SideNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      window.location.href = '/auth/login';
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  return (
    <nav className="min-w-[18%] bg-light p-4 flex flex-col h-screen">
      <div className="flex justify-center mb-5">
        <img src="/images/logo-dlh.png" alt="DLH Logo" className="w-52" />
      </div>

      <ul className="flex flex-col justify-start flex-grow">
        <li className="mb-1">
          <Link href="/dashboard" className="block w-full text-base p-2 rounded-lg hover:bg-dark hover:text-primary transition-colors">
            DASHBOARD
          </Link>
        </li>
        <li className="mb-1">
          <Link href="/dashboard/suratkeluar" className="block w-full text-base p-2 rounded-lg hover:bg-dark hover:text-primary transition-colors">
            SURAT KELUAR
          </Link>
        </li>
        <li className="mb-1">
          <Link href="/dashboard/beritaacara" className="block w-full text-base p-2 rounded-lg hover:bg-dark hover:text-primary transition-colors">
            BERITA ACARA
          </Link>
        </li>
        <li className="mb-1">
          <Link href="/dashboard/surattugas" className="block w-full text-base p-2 rounded-lg hover:bg-dark hover:text-primary transition-colors">
            SURAT TUGAS
          </Link>
        </li>
        <li className="mb-1">
          <Link href="/dashboard/suratketerangan" className="block w-full text-base p-2 rounded-lg hover:bg-dark hover:text-primary transition-colors">
            SURAT KETERANGAN
          </Link>
        </li>
        <li className="mb-1">
          <Link href="/dashboard/suratmasuk" className="block w-full text-base p-2 rounded-lg hover:bg-dark hover:text-primary transition-colors">
            SURAT MASUK
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-base p-2 rounded-lg hover:bg-dark hover:text-primary transition-colors"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SideNavbar;