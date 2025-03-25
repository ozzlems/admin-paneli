'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaSave, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  
  // Örnek kullanıcı verileri
  const [userData, setUserData] = useState({
    name: "Ahmet",
    surname: "Yılmaz",
    email: "ahmet.yilmaz@akdeniz.edu.tr",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Profil bilgilerini kaydetme işlemi
    console.log("Profil bilgileri kaydedildi:", userData);
    setEditMode(false);
    // Burada API çağrısı yapılabilir
  };

  const handlePasswordChange = () => {
    if (userData.newPassword !== userData.confirmPassword) {
      alert("Yeni şifreler eşleşmiyor!");
      return;
    }
    console.log("Şifre değiştirildi:", userData);
    setPasswordEditMode(false);
    // Burada şifre değiştirme API çağrısı yapılabilir
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Diğer sayfayla aynı */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col gap-6">
        <div className="flex items-left gap-2 mb-4 mt-2 mr-2 justify-center">
          <img src="/akdeniz.png" alt="Akdeniz Icon" className="w-10 h-10" />
          <h2 className="text-2xl font-bold text-left text-gray-100 mt-1.5">
            Admin Panel
          </h2>
        </div>
        <ul>
          <li
            className="mb-4 p-2.5 rounded-sm bg-gray-700 cursor-pointer hover:bg-gray-600 flex items-center gap-2"
            onClick={() => router.push("/eski-duyurular")}
          >
            <FaUser /> Duyurular
          </li>
          <li className="mb-4 p-2.5 rounded-sm bg-gray-800 cursor-pointer flex items-center gap-2">
            <FaUser /> Profil
          </li>
        </ul>
        <button
          className="flex items-center gap-2 bg-red-600 p-2.5 rounded-lg hover:bg-red-700 mt-auto"
          onClick={() => router.push("/login")}
        >
          <FaSignOutAlt /> Çıkış Yap
        </button>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 bg-slate-200 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Başlık ve Geri Butonu */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <FaArrowLeft /> Geri Dön
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Profil Bilgileri</h1>
            <div className="w-8"></div> {/* Boş div for spacing */}
          </div>

          {/* Profil Bilgileri Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Kişisel Bilgiler</h2>
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Düzenle
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    İptal
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <FaSave /> Kaydet
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-100 rounded-md">{userData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                {editMode ? (
                  <input
                    type="text"
                    name="surname"
                    value={userData.surname}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-100 rounded-md">{userData.surname}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-100 rounded-md">{userData.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Şifre Değiştirme Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Şifre Değiştir</h2>
              {!passwordEditMode ? (
                <button 
                  onClick={() => setPasswordEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Şifre Değiştir
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPasswordEditMode(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    İptal
                  </button>
                  <button 
                    onClick={handlePasswordChange}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <FaSave /> Onayla
                  </button>
                </div>
              )}
            </div>

            {passwordEditMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FaLock /> Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={userData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FaLock /> Yeni Şifre
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FaLock /> Yeni Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}