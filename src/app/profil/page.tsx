'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaSave, FaSignOutAlt, FaArrowLeft, FaBell, FaCheck } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false);
  
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  
  const currentUserPassword = "123456";
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
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleSaveProfile = () => {
    console.log("Profil bilgileri kaydedildi:", userData);
    setEditMode(false);
  };

  const verifyCurrentPassword = () => {
    if (!userData.currentPassword) {
      setPasswordError("Lütfen mevcut şifrenizi girin");
      return;
    }

    if (userData.currentPassword !== currentUserPassword) {
      setPasswordError("Mevcut şifreniz yanlış!");
      return;
    }

    setCurrentPasswordVerified(true);
    setPasswordError("");
  };

  const handlePasswordChange = () => {
    if (userData.newPassword.length < 6) {
      setPasswordError("Yeni şifre en az 6 karakter olmalıdır!");
      return;
    }

    if (userData.newPassword !== userData.confirmPassword) {
      setConfirmPasswordError("Yeni şifreler eşleşmiyor!");
      return;
    }

    console.log("Şifre değiştirildi:", userData);
    setPasswordEditMode(false);
    setCurrentPasswordVerified(false);
    alert("Şifreniz başarıyla değiştirildi!");
    
    setUserData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const cancelPasswordChange = () => {
    setPasswordEditMode(false);
    setCurrentPasswordVerified(false);
    setPasswordError("");
    setConfirmPasswordError("");
    setUserData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  return(

    <div className="flex min-h-screen">
      {/* Sidebar - Diğer sayfayla aynı */}
     <div className="w-64 bg-gray-900 text-white p-6 flex flex-col gap-6">
          <div className="flex items-left gap-2 mb-4 mt-2 mr-2 justify-center">
            {/* Akdeniz İkonu */}
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
              <FaBell /> Duyurular
            </li>
            <li
              className="mb-4 p-2.5 rounded-sm bg-gray-700 cursor-pointer hover:bg-gray-600 flex items-center gap-2"
              onClick={() => router.push("/profil")}
            >
              <FaUser /> Profil
            </li>
          </ul>
          <button
            className="flex items-center gap-2 bg-red-600 p-2.5 rounded-lg hover:bg-red-700"
            onClick={() => router.push("/login")}
          >
            <FaSignOutAlt /> Çıkış Yap
          </button>
        </div>

      {/* Ana İçerik */}
      <div className="flex-1 bg-slate-200 p-8 ">
        <div className="max-w-4xl mx-auto">
          {/* Başlık ve Geri Butonu */}
          <div className="flex items-center justify-between mb-8 ">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-800 hover:scale-105 font-medium "
            >
              <FaArrowLeft /> 
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Profil Bilgileri</h1>
            <div className="w-8  "></div> {/* Boş div for spacing */}
          </div>

          {/* Profil Bilgileri Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Kişisel Bilgiler</h2>
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-800 transition-colors font-medium"
                >
                  Düzenle
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditMode(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors font-medium"
                  >
                    İptal
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <FaSave /> Kaydet
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Ad</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md text-gray-900 font-medium">{userData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Soyad</label>
                {editMode ? (
                  <input
                    type="text"
                    name="surname"
                    value={userData.surname}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md text-gray-900 font-medium">{userData.surname}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-800 mb-1">E-posta</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md text-gray-900 font-medium">{userData.email}</p>
                )}
              </div>
            </div>
          </div>

       
          
          {/* Şifre Değiştirme Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Şifre Değiştir</h2>
              {!passwordEditMode ? (
                <button 
                  onClick={() => setPasswordEditMode(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors font-medium"
                >
                  Şifre Değiştir
                </button>
              ) : (
                <button 
                  onClick={cancelPasswordChange}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors font-medium"
                >
                  İptal
                </button>
              )}
            </div>

            {passwordEditMode && (
              <div className="space-y-8">
                {!currentPasswordVerified ? (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <FaLock /> Mevcut Şifrenizi Girin
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={userData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium"
                        placeholder="Mevcut şifreniz"
                      />
                      {passwordError && (
                        <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                      )}
                    </div>
                    <button
                      onClick={verifyCurrentPassword}
                      className="bg-green-600 text-white px-4 py-2  rounded-md  hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
                    >
                      <FaCheck /> Şifreyi Doğrula
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 bg-green-50 p-3 rounded-md border border-green-200">
                      <p className="text-green-800 flex items-center gap-2">
                        <FaCheck className="text-green-600" /> Mevcut şifre doğrulandı
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1 flex items-center gap-2">
                        <FaLock /> Yeni Şifre
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={userData.newPassword}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium"
                        placeholder="En az 6 karakter"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1 flex items-center gap-2">
                        <FaLock /> Yeni Şifre Tekrar
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium"
                        placeholder="Şifreyi tekrar girin"
                      />
                      {confirmPasswordError && (
                        <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>
                      )}
                    </div>

                    <div className="md:col-span-2 mt-2">
                      <button
                        onClick={handlePasswordChange}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium w-full justify-center"
                      >
                        <FaSave /> Şifreyi Değiştir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}