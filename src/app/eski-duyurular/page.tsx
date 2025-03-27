'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaBell, FaSignOutAlt, FaUser, FaArrowLeft, FaTimes, FaBars } from "react-icons/fa";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter((video) => video.id !== id));
    setSelectedVideo(null);
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-200">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <img src="/akdeniz.png" alt="Akdeniz Icon" className="w-10 h-10 " />
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
  

      {/* Main Content */}
      <div className="flex-1 select-none">
        {/* Header */}
        <header className="bg-transparent shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex justify-center sm:justify-center">
              <h1 className="text-2xl sm:text-3xl ml-12 font-bold text-gray-800/90">Duyurular</h1>
            </div>
            
            <button
              className="bg-emerald-600 px-4 py-2 w-full sm:w-auto rounded-md hover:bg-emerald-700 transition duration-300 flex items-center justify-center gap-2"
              onClick={() => router.push("/yeni-duyurular")}
            >
              <AiOutlinePlus size={16} className="font-extrabold" /> Yeni Duyuru
            </button>
          </div>
        </header>

        {/* Video Section */}
        <div className="max-w-6xl mx-auto p-4 sm:p-6 pt-6 sm:pt-12">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Videolar</h2>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
              <div className="w-full lg:flex-1 flex items-center justify-center border border-gray-600 rounded-lg min-h-[180px] sm:min-h-[240px] bg-gray-800">
                {selectedVideo ? (
                  <video 
                    key={selectedVideo} 
                    controls 
                    className="w-full h-full object-contain rounded-lg shadow-lg"
                  >
                    <source src={selectedVideo} type="video/mp4" />
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>
                ) : (
                  <p className="text-gray-400 text-sm sm:text-base">Video önizleme burada görünecek</p>
                )}
              </div>
              <div className="w-full lg:flex-1 overflow-x-auto">
                <table className="w-full table-fixed min-h-[150px]">
                  <thead>
                    <tr className="text-left text-gray-400">
                      <th className="p-2 w-1/6 text-sm sm:text-base">ID</th>
                      <th className="p-2 w-3/6 text-center text-sm sm:text-base">URL</th>
                      <th className="p-2 w-1/6 text-center text-sm sm:text-base">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map((video) => (
                      <tr
                        key={video.id}
                        className={`cursor-pointer hover:bg-gray-700 ${selectedVideo === video.url ? "border-2 border-blue-500" : ""}`}
                        onClick={() => setSelectedVideo(video.url)}
                      >
                        <td className="p-2 text-white text-sm sm:text-base">{video.id}</td>
                        <td className="p-2 text-blue-400 underline break-all text-xs sm:text-sm">
                          {video.url}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            className="bg-red-500 text-white px-3 sm:px-6 py-1 text-sm sm:text-base rounded-md hover:bg-red-700 transition duration-300"
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
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Resimler</h2>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
              <div className="w-full lg:flex-1 flex items-center justify-center border border-gray-600 rounded-lg h-[180px] sm:h-[250px] w-full overflow-hidden bg-gray-800">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="h-full w-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <p className="text-gray-400 text-sm sm:text-base">Resim önizleme burada görünecek</p>
                )}
              </div>
              <div className="w-full lg:flex-1 overflow-x-auto">
                <table className="w-full table-fixed min-h-[120px]">
                  <thead>
                    <tr className="text-left text-gray-400">
                      <th className="p-2 w-1/6 text-sm sm:text-base">ID</th>
                      <th className="p-2 w-3/6 text-center text-sm sm:text-base">URL</th>
                      <th className="p-2 w-1/6 text-center text-sm sm:text-base">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((image) => (
                      <tr
                        key={image.id}
                        className={`cursor-pointer hover:bg-gray-700 ${selectedImage === image.url ? "border-2 border-blue-500" : ""}`}
                        onClick={() => setSelectedImage(image.url)}
                      >
                        <td className="p-2 text-white text-sm sm:text-base">{image.id}</td>
                        <td className="p-2 text-blue-400 underline break-all text-xs sm:text-sm">
                          {image.url}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            className="bg-red-500 text-white px-3 sm:px-6 py-1 text-sm sm:text-base rounded-md hover:bg-red-700 transition duration-300"
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
    </div>
  );
};

export default EskiDuyurular;