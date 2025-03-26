"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaBell, FaSignOutAlt, FaUser } from "react-icons/fa";


const initialVideos = [
  { id: 1, url: "https://cdn.pixabay.com/video/2017/09/20/12127-235051444_large.mp4" },
  { id: 2, url: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4" },
  { id: 3, url: "https://videos.pexels.com/video-files/854417/854417-uhd_2560_1440_25fps.mp4" },
];

const initialImages = [
  { id: 1, url: "https://wallpapers.com/images/hd/yellow-house-and-greenery-best-hd-h5hf3cmcwkls52wo.jpg" },
  { id: 2, url: "https://wallpapersok.com/images/hd/contrasting-scenic-views-a5u9zq0a0ymy2dug.jpg" },
];

const EskiDuyurular = () => {
  const router = useRouter();
  const [videos, setVideos] = useState(initialVideos);
  const [images, setImages] = useState(initialImages);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter((video) => video.id !== id));
    setSelectedVideo(null);
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
    setSelectedImage(null);
  };

  return (

    <div className="flex min-h-screen bg-slate-200">
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
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold ml-4 text-slate-800">Duyurular</h1>
          <div className="flex items-center mt-2 gap-4">
            <button
              className="bg-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-700 transition duration-300 flex items-center gap-2"
              onClick={() => router.push("/yeni-duyurular")}
            >
              <AiOutlinePlus size={16} /> Yeni Duyuru
            </button>
          
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-gray-800  rounded-lg shadow-lg p-6 mb-8 min-h-[250px]">
          <h2 className="text-2xl font-bold mb-4">Videolar</h2>
          <div className="flex gap-8">
            <div className="flex-1 flex items-center justify-center border border-gray-600 rounded-lg min-h-[240px]">
              {selectedVideo ? (
                <video key={selectedVideo} controls className="w-full h-full object-contain rounded-lg shadow-lg">
                  <source src={selectedVideo} type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              ) : (
                <p className="text-gray-400">Video önizleme burada görünecek</p>
              )}
            </div>
            <div className="flex-1">
              <table className="w-full table-fixed min-h-[150px]">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="p-2 w-1/6">ID</th>
                    <th className="p-2 w-3/6 text-center">URL</th>
                    <th className="p-2 w-1/6 text-center">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr
                      key={video.id}
                      className={`cursor-pointer hover:bg-gray-700 ${selectedVideo === video.url ? "border-2 border-blue-500" : ""}`}
                      onClick={() => setSelectedVideo(video.url)}
                    >
                      <td className="p-2">{video.id}</td>
                      <td className="p-2 text-blue-400 underline break-all">{video.url}</td>
                      <td className="p-2 text-center">
                        <button
                          className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-700 transition duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVideo(video.id);
                          }}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

     {/* Image Section */}
<div className="bg-gray-800 rounded-lg shadow-lg p-6 min-h-[300px]">
  <h2 className="text-2xl font-bold mb-4">Resimler</h2>
  <div className="flex gap-8">
    <div className="flex-1 flex items-center justify-center border border-gray-600 rounded-lg h-[280px] w-full overflow-hidden">
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected"
          className="h-full w-full  object-cover rounded-lg shadow-lg"
        />
      ) : (
        <p className="text-gray-400">Resim önizleme burada görünecek</p>
      )}
    </div>
    <div className="flex-1">
      <table className="w-full table-fixed min-h-[120px]">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="p-2 w-1/6">ID</th>
            <th className="p-2 w-3/6 text-center">URL</th>
            <th className="p-2 w-1/6 text-center">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr
              key={image.id}
              className={`cursor-pointer hover:bg-gray-700 ${
                selectedImage === image.url ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(image.url)}
            >
              <td className="p-2">{image.id}</td>
              <td className="p-2 text-blue-400 underline break-all">
                {image.url}
              </td>
              <td className="p-2 text-center">
                <button
                  className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-700 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image.id);
                  }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default EskiDuyurular;
