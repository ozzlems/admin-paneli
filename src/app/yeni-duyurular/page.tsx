"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUpload, FaVideo, FaImage, FaCheckCircle } from "react-icons/fa";

const YeniDuyuru = () => {
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          if ((width === 1920 && height === 1080) || (width === 3840 && height === 2160)) {
            setImage(reader.result as string);
            setError(null);
          } else {
            setError("Lütfen 1920x1080 (1080p) veya 3840x2160 (4K) çözünürlükte bir resim yükleyin.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const video = document.createElement("video");
        video.src = reader.result as string;

        video.onloadedmetadata = () => {
          const width = video.videoWidth;
          const height = video.videoHeight;

          if ((width === 1920 && height === 1080) || (width === 3840 && height === 2160)) {
            setVideo(reader.result as string);
            setError(null);
          } else {
            setError("Lütfen 1920x1080 (1080p) veya 3840x2160 (4K) çözünürlükte bir video yükleyin.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (image || video) {
      alert("Duyuru başarıyla oluşturuldu!");
      router.push("/eski-duyurular");
    } else {
      setError("Lütfen bir resim veya video yükleyin.");
    }
  };
return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-blue-300 to-orange-200 p-6">
    <div className="w-full max-w-8xl flex gap-10 px-16">
      {/* Sol Taraf: Yükleme Alanı */}
      <div className="w-1/2 min-h-[500px] h-[500px] bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Yeni Duyuru Oluştur</h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="mb-6 w-full items-center align-middle justify-center mt-10">
          <label className="block text-lg font-semibold text-white mb-2 text-left">Resim Yükle</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
          <label htmlFor="image-upload" className="w-full bg-blue-500 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
            <FaImage size={20} /> Resim Seç
          </label>
        </div>

        <div className="mb-6 w-full">
          <label className="block text-lg font-semibold text-white mb-2 mt-4 text-left">Video Yükle</label>
          <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="video-upload" />
          <label htmlFor="video-upload" className="w-full bg-blue-500 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
            <FaVideo size={20} /> Video Seç
          </label>
        </div>
      </div>

      {/* Sağ Taraf: Ön İzleme Container'ı */}
      <div className="w-1/2 min-h-[500px] bg-gray-900 rounded-lg shadow-lg p-8 overflow-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Ön İzleme</h2>
        {image && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Seçtiğiniz Resim</h3>
            <img src={image} alt="Uploaded" className="w-full rounded-lg shadow-lg border border-gray-700" />
          </div>
        )}
        {video && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Seçtiğiniz Video</h3>
            <video controls className="w-full rounded-lg shadow-lg border border-gray-700">
              <source src={video} type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        )}

        {/* Duyuru Oluştur Butonu (Yalnızca resim veya video yüklendikten sonra görünür) */}
        {(image || video) && (
          <button 
            onClick={handleSubmit} 
            className="w-full text-white bg-emerald-600  py-3 mt-6 rounded-md cursor-pointer transition-all hover:bg-emerald-800 flex items-center justify-center gap-3 mt-6"
          >
            <FaCheckCircle size={20} /> Duyuruyu Oluştur
          </button>
        )}
      </div>
    </div>
  </div>
);
}
export default YeniDuyuru;
