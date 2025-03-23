"use client";

import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Sayfa yüklendiğinde kaydedilmiş kullanıcı bilgilerini kontrol et
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedUsername && savedPassword && savedRememberMe === "true") {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // Mock kullanıcı verisi
  const mockUser = {
    id: "admin",
    password: "123456",
  };

  const togglePasswordView = () => setShowPassword(!showPassword);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Giriş kontrolü
    if (username === mockUser.id && password === mockUser.password) {
      // Beni hatırla seçeneği işaretliyse bilgileri kaydet
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
        localStorage.setItem("rememberedPassword", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        // Beni hatırla seçeneği işaretli değilse kaydedilmiş bilgileri temizle
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberMe");
      }
      router.push("/eski-duyurular");
    } else {
      alert("Hatalı ID veya şifre! Lütfen tekrar deneyin.");
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password"); 
  };


  return (
    <div className="select-none flex items-center justify-center h-screen bg-gradient-to-bl from-blue-200 from-10% via-slate-400 to-slate-300 ">
      <div className="w-[100%] max-w-3xl lg:max-w-3xl p-10 bg-gray-900 flex-col flex items-center gap-4 rounded-md  shadow-lg">
        {/* Logo */}
        <img src="\akdeniz.png" alt="logo" className="w-30 md:w-30" />

        {/* Başlık */}
        <h1 className="text-2xl md:text-3xl mt-1 font-semibold text-gray-200 ">Admin Girişi</h1>

        {/* Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
          {/* ID Input */}
          <div className="w-full">
            <label className="block text-sm md:text-base text-gray-300 mb-2">Username</label>
            <div className="w-full flex items-center gap-2 bg-gray-800 p-3 rounded-lg focus-within:bg-gray-750 transition duration-300">
              <MdAlternateEmail className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter your ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500 focus:bg-gray-750 transition duration-300"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="w-full">
            <label className="block text-sm md:text-base text-gray-300 mb-2">Password</label>
            <div className="w-full flex items-center gap-2 bg-gray-800 p-3 rounded-lg focus-within:bg-gray-750 transition duration-300 relative">
              <FaFingerprint className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500 focus:bg-gray-750 transition duration-300"
                required
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute right-5 cursor-pointer text-gray-500 hover:text-gray-400 transition duration-300"
                  onClick={togglePasswordView}
                />
              ) : (
                <FaRegEye
                  className="absolute right-5 cursor-pointer text-gray-500 hover:text-gray-400 transition duration-300"
                  onClick={togglePasswordView}
                />
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center ml-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500  "
              />
              <label htmlFor="rememberMe" className="ml-2 cursor-pointer shadow-md mt-1 text-sm tracking-wide text-gray-300">
                Beni Hatırla
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm tracking-wide mr-2 mt-2 cursor-pointer text-blue-400 hover:text-blue-500 transition duration-300"
            >
              Şifremi Unuttum
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="p-3 cursor-pointer align-middle bg-blue-500 rounded-lg mt-8 hover:bg-blue-600 text-sm md:text-base text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;