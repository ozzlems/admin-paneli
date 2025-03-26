'use client';
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { FaArrowLeft, FaImage, FaVideo, FaTrash, FaPaperPlane, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function NewAnnouncementPage() {
  const router = useRouter();
  const [media, setMedia] = useState<{
    image: string | ArrayBuffer | null;
    video: string | ArrayBuffer | null;
  }>({ image: null, video: null });
  const [error, setError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 20 * 1024 * 1024) {
      setError('Dosya boyutu 20 MB üzerinde olamaz');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'image') {
        const img = new Image();
        img.onload = () => {
          const { naturalWidth: width, naturalHeight: height } = img;
          const aspectRatio = width / height;
          
          // 16:9 en boy oranı ve çözünürlük kontrolü
          if (Math.abs(aspectRatio - 16/9) > 0.1) {
            setError('Lütfen 16:9 en boy oranına sahip bir resim yükleyin');
            return;
          }
          
          setMedia(prev => ({ ...prev, image: reader.result }));
          setError(null);
        };
        img.src = URL.createObjectURL(file);
      } else {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          const { videoWidth: width, videoHeight: height } = video;
          
          // Sadece Full HD veya 4K videoları kabul et
          if (!((width === 1920 && height === 1080) || (width === 3840 && height === 2160))) {
            setError('Sadece 1080p veya 4K çözünürlükte video yükleyebilirsiniz');
            return;
          }
          
          setMedia(prev => ({ ...prev, video: reader.result }));
          setError(null);
        };
        video.src = URL.createObjectURL(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMedia = (type: 'image' | 'video') => {
    setMedia(prev => ({ ...prev, [type]: null }));
    if (type === 'image' && imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (type === 'video' && videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!media.image && !media.video) {
      setError('Lütfen en az bir medya dosyası yükleyin');
      return;
    }

    // Burada API çağrısı yapılabilir
    console.log('Duyuru oluşturuldu:', media);
    alert('Duyuru başarıyla oluşturuldu!');
    
    // Formu temizle
    setMedia({ image: null, video: null });
    setError(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
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
        className="flex items-center gap-2 bg-red-600 p-2.5  rounded-lg hover:bg-red-700"
        onClick={() => router.push("/login")}
      >
        <FaSignOutAlt /> Çıkış Yap
      </button>
    </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-200">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl  mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaArrowLeft className="text-gray-600 text-lg" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800/90">Yeni Duyuru Oluştur</h1>
          </div>
        </header>

        {/* Upload Section */}
        <main className="max-w-6xl  mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-400/80 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, 'image')}
                  className="hidden"
                  id="image-upload"
                  ref={imageInputRef}
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <FaImage className="text-blue-500 text-4xl mb-3" />
                  <span className="text-lg font-medium text-gray-700">Resim Yükle</span>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG (16:9 oran)</p>
                </label>
              </div>

              {/* Video Upload */}
              <div className="border-2 border-dashed border-gray-400/80 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleUpload(e, 'video')}
                  className="hidden"
                  id="video-upload"
                  ref={videoInputRef}
                />
                <label
                  htmlFor="video-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <FaVideo className="text-blue-500 text-4xl mb-3" />
                  <span className="text-lg font-medium text-gray-700">Video Yükle</span>
                  <p className="text-sm text-gray-500 mt-1">MP4 (1080p veya 4K)</p>
                </label>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 rounded-md">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
          </div>

          {/* Preview Section - Buton sadece burada gözükecek */}
          {(media.image || media.video) && (
            <div className="bg-slate-50 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 ml-8">Ön İzleme</h2>
              
              <div className="space-y-2">
                {media.image && (
                  <div className="relative">
                    <img 
                      src={media.image as string} 
                      alt="Yüklenen resim" 
                      className="w-full h-auto max-h-[360px] object-contain rounded-md shadow-sm border-2 border-gray-300/90"
                    />
                    <button
                      onClick={() => handleDeleteMedia('image')}
                      className="absolute top-2 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}

                {media.video && (
                  <div className="relative">
                    <video 
                      controls 
                      className="w-full max-h-[360px] rounded-md shadow-sm border-2 border-gray-300/90"
                    >
                      <source src={media.video as string} type="video/mp4" />
                    </video>
                    <button
                      onClick={() => handleDeleteMedia('video')}
                      className="absolute top-2 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}

                {/* Duyuru Oluştur Butonu SADECE burada */}
                <div className="flex  justify-center pt-3">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-800 rounded-md text-white font-medium flex items-center gap-2 transition-colors"
                  >
                    <FaPaperPlane /> Duyuruyu Oluştur
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}