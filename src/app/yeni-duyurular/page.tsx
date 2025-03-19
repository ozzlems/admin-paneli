"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUpload, FaVideo, FaImage, FaCheckCircle, FaTrash } from "react-icons/fa";

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

          // En boy oranını kontrol et (16:9)
          const aspectRatio = width / height;
          const targetAspectRatio = 16 / 9; // 16:9 en boy oranı

          // Çözünürlük aralığını kontrol et
          const isWidthInRange = width >= 1280 && width <= 3840; // Genişlik 1280-3840 arasında
          const isHeightInRange = height >= 720 && height <= 2160; // Yükseklik 720-2160 arasında

          // En boy oranı ve çözünürlük aralığı kontrolü
          if (
            Math.abs(aspectRatio - targetAspectRatio) < 0.1 && // En boy oranı 16:9'a yakın olmalı (daha esnek tolerans)
            isWidthInRange && // Genişlik 1280-3840 arasında olmalı
            isHeightInRange // Yükseklik 720-2160 arasında olmalı
          ) {
            setImage(reader.result as string);
            setError(null);
          } else {
            setError(
              "Lütfen 16:9 en boy oranına sahip ve çözünürlüğü 1280x720 ile 3840x2160 arasında bir resim yükleyin."
            );
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

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleDeleteVideo = () => {
    setVideo(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-blue-300 to-orange-200 p-6">
      <div className="w-full max-w-8xl flex gap-10 px-16">
        {/* Sol Taraf: Yükleme Alanı */}
        <div className="w-1/2 min-h-[300px] h-[420px] bg-gray-900 rounded-md shadow-md p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">Yeni Duyuru Oluştur</h1>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}

          <div className="mb-8 w-full items-center align-middle justify-center mt-12">
            <label className="block text-lg font-semibold text-white mb-2 text-left ">Resim Yükle</label>
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

        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[420px] bg-gray-900 rounded-md shadow-md p-4 md:p-6 overflow-auto">
  <h2 className="text-2xl font-bold text-white mb-4 md:mb-6 text-center">Ön İzleme</h2>
  {/* Çerçeve ve Ön İzleme Alanı */}
  {!image && !video ? (
    <div className="flex items-center justify-center h-[200px] md:h-[400px] border-2 border-dashed border-gray-500 rounded-md ">
      <p className="text-gray-400 text-lg">Ön izleme burada gözükecek</p>
    </div>
  ) : (
    <>
      {image && (
        <div className="mb-4 md:mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white mb-2">Seçtiğiniz Resim</h3>
            <button
              onClick={handleDeleteImage}
              className="text-white bg-red-500/80 px-4 py-1 mb-1 rounded-md cursor-pointer transition-all hover:bg-red-800 flex items-center gap-2"
            >
              <FaTrash size={16} /> Sil
            </button>
          </div>
          <img src={image} alt="Uploaded" className="w-full rounded-lg shadow-lg border border-gray-700" />
        </div>
      )}
      {video && (
        <div className="mb-4 md:mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white mb-2">Seçtiğiniz Video</h3>
            <button
              onClick={handleDeleteVideo}
              className="text-white bg-red-500/80 px-4 py-1 mb-1 rounded-md cursor-pointer transition-all hover:bg-red-800 flex items-center gap-2"
            >
              <FaTrash size={16} /> Sil
            </button>
          </div>
          <video controls className="w-full rounded-lg shadow-lg border border-gray-700">
            <source src={video} type="video/mp4" />
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
        </div>
      )}
    </>
  )}

  {/* Duyuru Oluştur Butonu (Yalnızca resim veya video yüklendikten sonra görünür) */}
  {(image || video) && (
    <button
      onClick={handleSubmit}
      className="w-full text-white bg-emerald-600 py-2 md:py-3 mt-4 md:mt-6 rounded-md cursor-pointer transition-all hover:bg-emerald-800 flex items-center justify-center gap-3"
    >
      <FaCheckCircle size={20} /> Duyuruyu Oluştur
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default YeniDuyuru;