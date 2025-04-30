'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaBell, FaSignOutAlt, FaUser, FaTimes, FaBars, FaVideo, FaImage, FaTrash } from "react-icons/fa";

const initialVideos = [
  { id: 1, url: "https://cdn.pixabay.com/video/2017/09/20/12127-235051444_large.mp4" },
  { id: 2, url: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4" },
  { id: 3, url: "https://videos.pexels.com/video-files/854417/854417-uhd_2560_1440_25fps.mp4" },
  { id: 4, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },

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

       {/* Video Secrtion */}
<div className="max-w-6xl mx-auto  sm:p-6  sm:pt-12">
  <div className="bg-white rounded-xl shadow-xl p-6 mb-4 border border-gray-200">
    <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2.5">
      <FaVideo className="text-blue-500" /> Video Duyurular
    </h2>
    
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Video Preview */}
      <div className="xl:w-1/2">
        <div className="bg-gray-50 rounded-lg border border-gray-300 overflow-hidden">
          {selectedVideo ? (
           <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
           <video 
             key={selectedVideo} // Bu satırı ekledik
             controls 
             className="absolute top-0 left-0 w-full h-full object-contain"
           >
             <source src={selectedVideo} type="video/mp4" />
             Tarayıcınız video oynatmayı desteklemiyor.
           </video>
         </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 h-52 text-gray-500">
              <FaVideo className="text-4xl mb-3" />
              <p>Video seçiniz</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Video List */}
      <div className="xl:w-1/2">
        <div className="bg-gray-50 rounded-lg border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Video URL</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {videos.map((video) => (
                  <tr 
                    key={video.id} 
                    className={`hover:bg-blue-50 cursor-pointer ${selectedVideo === video.url ? 'bg-blue-100' : ''}`}
                    onClick={() => setSelectedVideo(video.url)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{video.id}</td>
                    <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-800 break-all">
                      <a href={video.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        {video.url.substring(0, 40)}...
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVideo(video.id);
                        }}
                      >
                        <FaTrash />
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

  {/* Image Section  */}
  <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2.5">
      <FaImage className="text-green-600" /> Resim Duyurular
    </h2>
    
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Image Preview */}
      <div className="xl:w-1/2">
        <div className="bg-gray-50 rounded-lg py-4 border border-gray-300 overflow-hidden">
          {selectedImage ? (
           <div className="relative pt-[50%]  "> {/* 4:3 aspect ratio */}
           <img
             key={selectedImage} // Bu satırı ekledik
             src={selectedImage}
             alt="Selected"
             className="absolute top-0 left-0 w-full h-full object-contain "
           />
         </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 h-52 text-gray-500">
              <FaImage className="text-4xl mb-3" />
              <p>Resim seçiniz</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Image List */}
      <div className="xl:w-1/2">
        <div className="bg-gray-50 rounded-lg border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Resim URL</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {images.map((image) => (
                  <tr 
                    key={image.id} 
                    className={`hover:bg-green-50 cursor-pointer ${selectedImage === image.url ? 'bg-green-100' : ''}`}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{image.id}</td>
                    <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-800 break-all">
                      <a href={image.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        {image.url.substring(0, 40)}...
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.id);
                        }}
                      >
                        <FaTrash />
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
      </div>
    </div>
  );
}
export default EskiDuyurular;