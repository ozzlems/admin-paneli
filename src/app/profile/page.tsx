"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const ProfileMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Çıkış işlemi burada gerçekleştirilebilir
    console.log("Çıkış yapıldı");
    router.push("/login"); // Kullanıcıyı giriş sayfasına yönlendir
  };

  const handleProfile = () => {
    // Profil sayfasına yönlendirme
    router.push("/profile");
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaUserCircle size={24} />
        <span>Admin</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
          <ul className="py-2">
            <li>
              <button
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition duration-300"
                onClick={handleProfile}
              >
                Profil Bilgileri
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition duration-300"
                onClick={handleLogout}
              >
                Çıkış Yap
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;