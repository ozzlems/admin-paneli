"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setMessage(data.message || data.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
        console.error("API Error:", data);
      }
    } catch (error: any) {
      setMessage(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="select-none flex items-center justify-center h-screen bg-gradient-to-bl from-blue-200 from-10% via-slate-400 to-slate-300">
      <div className="w-[100%] max-w-3xl lg:max-w-3xl p-12 bg-gray-900 flex-col flex items-center gap-6 rounded-md shadow-lg">
        <h1 className="text-2xl md:text-3xl mt-1 font-semibold text-gray-200">Şifremi Unuttum</h1>
        <p className="text-sm text-gray-300 text-center">
          Şifrenizi sıfırlamak için e-posta adresinizi girin. Size geçici bir şifre göndereceğiz.
        </p>
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="block text-sm md:text-base text-gray-300 mb-2">E-posta</label>
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 p-3 rounded-lg text-sm md:text-base text-white placeholder-gray-500 focus:bg-gray-750 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`p-3 cursor-pointer align-middle bg-blue-500 rounded-lg mt-8 hover:bg-blue-600 text-sm md:text-base text-white ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
          </button>
        </form>
        {message && (
          <p className={`text-sm ${message.includes('hata') ? 'text-red-400' : 'text-gray-300'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}