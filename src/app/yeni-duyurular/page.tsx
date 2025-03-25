'use client';
import router from "next/router";
import { useState, useEffect } from "react";
import { FaImage, FaVideo, FaTrash, FaCheckCircle, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function MediaUpload() {
  const [media, setMedia] = useState<{ image: string | ArrayBuffer | null; video: string | ArrayBuffer | null }>({ image: null, video: null });
  const [error, setError] = useState<string | null>(null);
  
  const [fileInputKey, setFileInputKey] = useState<FileInputKeys>({ image: 0, video: 0 });

  type FileInputKeys = {
    image: number;
    video: number;
  };

  useEffect(() => {
    const savedAnnouncements = JSON.parse(localStorage.getItem("announcements") || "[]");
    console.log("Eski duyurular yüklendi:", savedAnnouncements);
  }, []);
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "image") {
        const img = new Image();
        if (typeof reader.result === "string") {
          img.src = reader.result;
        }
        img.onload = () => {
          const { naturalWidth: width, naturalHeight: height } = img;
          const aspectRatio = width / height;
          const isValidSize = width >= 1280 && width <= 3840 && height >= 720 && height <= 2160;
          if (Math.abs(aspectRatio - 16 / 9) < 0.1 && isValidSize) {
            setMedia((prev) => ({ ...prev, image: reader.result }));
            setError(null);
          } else {
            setError("Lütfen 16:9 en boy oranına sahip ve çözünürlüğü 1280x720 ile 3840x2160 arasında bir resim yükleyin.");
          }
        };
      } else if (type === "video") {
        const video = document.createElement("video");
        if (typeof reader.result === "string") {
          video.src = reader.result;
        }
        video.onloadedmetadata = () => {
          const { videoWidth: width, videoHeight: height } = video;
          if ((width === 1920 && height === 1080) || (width === 3840 && height === 2160)) {
            setMedia((prev) => ({ ...prev, video: reader.result }));
            setError(null);
          } else {
            setError("Lütfen 1920x1080 (1080p) veya 3840x2160 (4K) çözünürlükte bir video yükleyin.");
          }
        };
      }
    };
    reader.readAsDataURL(file);
  };

const handleDeleteMedia = (type: keyof FileInputKeys) => {  // Use keyof here
  setMedia((prev) => ({
    ...prev,
    [type]: null,
  }));
  setFileInputKey(prev => ({ ...prev, [type]: prev[type] + 1 }));
};

  const handleCreateAnnouncement = () => {
    if (!media.image && !media.video) return;

    const newAnnouncement = {
      id: Date.now(),
      image: media.image,
      video: media.video,
      date: new Date().toLocaleString(),
    };

    const savedAnnouncements = JSON.parse(localStorage.getItem("announcements") || "[]");
    const updatedAnnouncements = [newAnnouncement, ...savedAnnouncements];

    localStorage.setItem("announcements", JSON.stringify(updatedAnnouncements));

    console.log("Duyuru kaydedildi:", newAnnouncement);
    alert("Duyuru başarıyla oluşturuldu!");

    setMedia({ image: null, video: null });
  };

  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
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
  
    {/* Main Content */}
    <div className="flex-1 bg-slate-200 p-6 pb-3">
      <div className="w-full max-w-8xl px-4 mx-auto mt-8 md:mt-30">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Announcement Creation */}
          <div className="w-full md:w-1/2 min-h-[300px] h-[500px] bg-gray-900 rounded-md shadow-md p-6 flex flex-col overflow-auto">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Yeni Duyuru Oluştur</h1>
            {error && (
              <p className="flex w-full text-red-400 text-center mb-6">
                {error}
              </p>
            )}
            <div className="flex flex-col justify-center items-center flex-1 gap-6 w-full h-full border-2 border-dashed border-gray-500 rounded-md p-6">
          
{(["image", "video"] as const).map((type) => (  // Note the 'as const' here
  <div key={type} className="w-full mb-4">
    <label className="block text-lg font-semibold text-gray-200 mb-2 text-left">
      {type === "image" ? "Resim Yükle" : "Video Yükle"}
    </label>
    <input
      type="file"
      accept={type === "image" ? "image/*" : "video/*"}
      onChange={(e) => handleUpload(e, type)}
      className="hidden"
      id={`${type}-upload`}
      key={`${type}-${fileInputKey[type]}`}
    />
    <label
      htmlFor={`${type}-upload`}
      className="w-full bg-blue-500 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
    >
      {type === "image" ? <FaImage size={20} /> : <FaVideo size={20} />}
      {type === "image" ? "Resim Seç" : "Video Seç"}
    </label>
  </div>
))}
            </div>
          </div>
  
         {/* Preview */}
<div className="w-full md:w-1/2 min-h-[300px] h-[500px] bg-gray-900 rounded-md shadow-md p-6 overflow-auto">
  <h2 className="text-3xl font-bold text-white mb-6 text-center">Ön İzleme</h2>
  {!media.image && !media.video ? (
    <div className="flex items-center justify-center h-[380px] border-2 border-dashed border-gray-500 rounded-md">
      <p className="text-gray-400 text-lg">Ön izleme burada gözükecek</p>
    </div>
  ) : (
    <>
      {media.image && (
        <div className="mb-4 relative h-[360px] overflow-hidden rounded-lg border border-gray-500">
          <img 
            src={typeof media.image === "string" ? media.image : undefined} 
            alt="Uploaded" 
            className="w-full h-full object-cover p-2"
          />
          <button
            onClick={() => handleDeleteMedia("image")}
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all"
          >
            <FaTrash size={16} />
          </button>
        </div>
      )}
      {media.video && (
        <div className="mb-4 relative h-[360px]">
          <video 
            controls 
            className="w-full h-full object-cover p-2 rounded-lg shadow-lg border border-gray-500"
          >
            <source src={typeof media.video === "string" ? media.video : undefined} type="video/mp4" />
          </video>
          <button
            onClick={() => handleDeleteMedia("video")}
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all"
          >
            <FaTrash size={16} />
          </button>
        </div>
      )}
    </>
  )}

  
            {(media.image || media.video) && (
              <button
                onClick={handleCreateAnnouncement}
                className="w-full text-white bg-emerald-600 py-3 mt-6 rounded-md cursor-pointer transition-all hover:bg-emerald-800 flex items-center justify-center gap-3"
              >
                <FaCheckCircle size={20} /> Duyuruyu Oluştur
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div> );};