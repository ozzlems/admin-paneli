"use client";

import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
      alert("Giriş başarılı! Yönlendiriliyorsunuz...");
      router.push("/eski-duyurular"); // Eski Duyurular sayfasına yönlendir
    } else {
      alert("Hatalı ID veya şifre! Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="select-none flex items-center justify-center h-screen bg-gradient-to-bl from-blue-200 from-10% via-slate-400 to-slate-300 ">
      <div className="w-[100%] max-w-2xl lg:max-w-2xl p-12 bg-gray-900 flex-col flex items-center gap-5 rounded-lg shadow-lg">
        {/* Logo */}
        <img src="\akdeniz.png" alt="logo" className="w-30 md:w-30" />

        {/* Başlık */}
        <h1 className="text-2xl md:text-3xl mt-1 font-semibold text-gray-200 ">Admin Girişi</h1>

        {/* Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
          {/* ID Input */}
          <div className="w-full">
            <label className="block text-sm md:text-base text-gray-300 mb-2">ID</label>
            <div className="w-full flex items-center gap-2 bg-gray-800 p-3 rounded-xl focus-within:bg-gray-750 transition duration-300">
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
            <div className="w-full flex items-center gap-2 bg-gray-800 p-3 rounded-xl focus-within:bg-gray-750 transition duration-300 relative">
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

          {/* Login Button */}
          <button
            type="submit"
            className="p-3 px-44 align-middle bg-blue-500 rounded-lg mt-8 hover:bg-blue-600 text-sm md:text-base text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;