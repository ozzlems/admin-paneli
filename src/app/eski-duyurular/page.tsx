"use client";
import { useRouter } from "next/navigation"; // Doğru import
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

// Mock Data
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
    if (selectedVideo && videos.find((video) => video.id === id)?.url === selectedVideo) {
      setSelectedVideo(null);
    }
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
    if (selectedImage && images.find((image) => image.id === id)?.url === selectedImage) {
      setSelectedImage(null);
    }
  };

  return (
    <div className="select-none flex items-center justify-center min-h-screen bg-gradient-to-tl from-blue-200 from-50%  to-slate-400 p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-sm">Duyurular</h1>

        <div className="flex justify-end mb-8">
        <button
      className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition duration-300 flex items-center gap-2"
      onClick={() => router.push("/yeni-duyurular")} 
    >
  <span className="bg-white text-emerald-600 p-1  rounded-full  flex items-center justify-center">
  <AiOutlinePlus size={16} className="font-bold" />
  </span>
  Yeni Duyuru
</button>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8 min-h-[300px]">
          <h2 className="text-2xl font-bold text-white mb-4">Videolar</h2>
          <div className="flex gap-8">
            <div className="flex-1 flex items-center justify-center border border-gray-600 rounded-lg min-h-[200px]">
              {selectedVideo ? (
                <video key={selectedVideo} controls className="w-full rounded-lg shadow-lg">
                  <source src={selectedVideo} type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              ) : (
                <p className="text-gray-400">Video ön izleme burada gözükecek</p>
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
                {videos.map((video) => {
                    const isSelected = selectedVideo === video.url ? "border-2 border-blue-500" : "";
                    return (
                      <tr
                        key={video.id}
                        className={`hover:bg-gray-800 cursor-pointer ${isSelected}`}
                        onClick={() => setSelectedVideo(video.url)}
                      >
                        <td className="p-2 text-white">{video.id}</td>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 min-h-[300px]">
          <h2 className="text-2xl font-bold text-white mb-4">Resimler</h2>
          <div className="flex gap-8">
            <div className="flex-1 flex items-center justify-center border border-gray-600 rounded-lg min-h-[200px]">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
              ) : (
                <p className="text-gray-400">Resim ön izleme burada gözükecek</p>
              )}
            </div>
            <div className="flex-1">
              <table className="w-full table-fixed min-h-[150px]">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="p-2 w-1/6">ID</th>
                    <th className="p-2 w-4/6 text-center">URL</th>
                    <th className="p-2 w-1/6 text-center">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((image) => (
                     <tr
                     key={image.id}
                     className={`hover:bg-gray-800 cursor-pointer ${
                       selectedImage === image.url ? "border-2 border-blue-500" : ""
                     }`}
                     onClick={() => setSelectedImage(image.url)}
                   >
                     <td className="p-2 text-white">{image.id}</td>
                     <td className="p-2 text-blue-400 underline break-all">{image.url}</td>
                     <td className="p-2">
                       <button
                         className="bg-red-500 text-white px-6 py-1  rounded-md hover:bg-red-700 transition duration-100"
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
