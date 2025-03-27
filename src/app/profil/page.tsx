'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaSave, FaSignOutAlt, FaArrowLeft, FaBell, FaCheck, FaTimes, FaBars } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    // Yeni şifre boş mu kontrolü
    if (!userData.newPassword) {
      setPasswordError("Yeni şifre alanı boş bırakılamaz!");
      return;
    }
  
    // Yeni şifre uzunluk kontrolü (minimum 6 karakter)
    if (userData.newPassword.length < 6) {
      setPasswordError("Yeni şifre en az 6 karakter olmalıdır!");
      return;
    }
  
    // Şifre eşleşme kontrolü
    if (userData.newPassword !== userData.confirmPassword) {
      setConfirmPasswordError("Yeni şifreler eşleşmiyor!");
      return;
    }
  
    // Başarılı durum
    console.log("Şifre değiştirildi:", userData);
    setPasswordEditMode(false);
    setCurrentPasswordVerified(false);
    alert("Şifreniz başarıyla değiştirildi!");
    
    // Formu temizle
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

    <div className="flex flex-col md:flex-row min-h-screen bg-slate-200">
      {/* Mobile Header */}
          <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/akdeniz.png" alt="Akdeniz Icon" className="w-10 h-10" />
              <h2 className="text-xl font-bold text-gray-100 ml-1">Admin Panel</h2>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-700"
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'flex flex-col justify-between' : 'hidden'} md:block w-full md:w-64 bg-gray-900 text-white p-6`}>
            <div>
              <div className="hidden md:flex items-left gap-3 mb-8 justify-center">
                <img alt="Akdeniz Icon" className="w-10 h-10" src="/akdeniz.png" />
                <h2 className="text-2xl font-bold text-gray-100">
                  Admin Panel
                </h2>
              </div>
              
              <ul className="space-y-4 mb-4">
                <li
                  className="p-2.5 rounded-sm bg-gray-700 cursor-pointer border-l-4 rounded-r-md border-b-neutral-50 hover:bg-gray-500 flex items-center gap-3"
                  onClick={() => router.push("/eski-duyurular")}
                >
                  <FaBell className="text-lg" /> 
                  <span className="text-base">Duyurular</span>
                </li>
                <li
                  className="p-2.5 rounded-sm bg-gray-700 cursor-pointer border-l-4 rounded-r-md border-b-neutral-50 hover:bg-gray-500 flex items-center gap-3"
                  onClick={() => router.push("/profil")}
                >
                  <FaUser className="text-lg" /> 
                  <span className="text-base">Profil</span>
                </li>
              </ul>
            </div>
            
            <button
              className="flex items-center gap-3 bg-red-600 p-2.5 w-full rounded-md lg:mt-8 md:mt-4 hover:bg-red-700 "
              onClick={() => router.push("/login")}
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-base">Çıkış Yap</span>
            </button>
          </div>
      

      {/* Ana İçerik */}
      <div className="flex-1 bg-slate-200">
  {/* Header */}
  <header className="bg-transparent shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
      <button 
        onClick={() => router.back()}
        className="mr-4 p-2 rounded-full hover:bg-gray-300/80 transition-colors"
      >
        <FaArrowLeft className="text-gray-600 text-lg" />
      </button>
      <div className="flex-1 flex justify-center pt-1">
        <h1 className="text-3xl font-bold mr-8 text-gray-800/90">Profil Bilgileri</h1>
      </div>
    </div>
  </header>
        <div className="max-w-5xl px-12 mx-auto">
          {/* Profil Bilgileri Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-600">Kişisel Bilgiler</h2>
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
                  <p className="p-2 bg-gray-100 border border-slate-400/50  rounded-md text-gray-900 font-medium">{userData.name}</p>
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
                  <p className="p-2 bg-gray-100 border border-slate-400/50  rounded-md text-gray-900 font-medium">{userData.surname}</p>
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
                  <p className="p-2 bg-gray-100 border border-slate-400/50  rounded-md text-gray-900 font-medium">{userData.email}</p>
                )}
              </div>
            </div>
          </div>

       
          
          {/* Şifre Değiştirme Kartı */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-600">Şifre Değiştir</h2>
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
                      <label className="block text-sm font-medium text-gray-800/90 mb-2 flex items-center gap-2">
                        <FaLock /> Mevcut Şifrenizi Girin
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={userData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full p-2 border-2 border-gray-400/30 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium"
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
    onChange={(e) => {
      handleInputChange(e);
      // Kullanıcı yazmaya başladığında hata mesajını temizle
      if (e.target.value.length >= 6) {
        setPasswordError("");
      }
    }}
    className={`w-full p-2 border ${
      passwordError && userData.newPassword.length < 6 
        ? "border-red-500" 
        : "border-gray-300"
    } rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium`}
    placeholder="En az 6 karakter"
  />
  {passwordError && userData.newPassword.length < 6 && (
    <p className="mt-1 text-sm text-red-600">{passwordError}</p>
  )}
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
                        className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center gap-2 font-medium w-full justify-center"
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