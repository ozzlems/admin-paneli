"use client";

import { useState } from "react";

// Mock Data
const initialVideos = [
  { id: 1, url: "https://cdn.pixabay.com/video/2017/09/20/12127-235051444_large.mp4" },
  { id: 2, url: "https://media.istockphoto.com/id/1015465374/tr/video/hava-los-angeles-%C5%9Fafak.mp4?s=mp4-640x640-is&k=20&c=IrzkBVAR3_aqmtPF5-Xs8OMq6u9UbfNCeE6QbbXxJzs=" },
];

const initialImages = [
  { id: 1, url: "https://i.pinimg.com/736x/9e/b7/a3/9eb7a3152c18b9ec987ca250d28eb92e.jpg" },
  { id: 2, url: "https://i.pinimg.com/736x/5b/02/47/5b0247d140ff9659066d61fa63edc79a.jpg" },
];

const EskiDuyurular = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [images, setImages] = useState(initialImages);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Silme fonksiyonları
  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter((video) => video.id !== id));
    if (selectedVideo && videos.find((video) => video.id === id)?.url === selectedVideo) {
      setSelectedVideo(null); // Silinen video ön izlemeden kaldırılır
    }
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
    if (selectedImage && images.find((image) => image.id === id)?.url === selectedImage) {
      setSelectedImage(null); // Silinen resim ön izlemeden kaldırılır
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-blue-300 to-orange-200 p-6">
      <div className="w-full max-w-6xl">
        {/* Başlık */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">Duyurular</h1>

        {/* Yeni Duyuru Butonu */}
        <div className="flex justify-end mb-8">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => alert("Yeni Duyuru butonuna tıklandı!")}
          >
            Yeni Duyuru
          </button>
        </div>

        {/* Videolar Tablosu */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Videolar</h2>
          <div className="flex gap-8">
            {/* Video Ön İzleme */}
            <div className="flex-1">
              {selectedVideo && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-4">Video Ön İzleme</h2>
                  <video key={selectedVideo} controls className="w-full rounded-lg shadow-lg">
                    <source src={selectedVideo} type="video/mp4" />
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>
                </div>
              )}
            </div>

            {/* Video Tablosu */}
            <div className="flex-1">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="p-2 w-1/6">ID</th>
                    <th className="p-2 w-3/6">URL</th>
                    <th className="p-2 w-1/6 text-center">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr
                      key={video.id}
                      className="hover:bg-gray-800 cursor-pointer"
                      onClick={() => setSelectedVideo(video.url)}
                    >
                      <td className="p-2 text-white">{video.id}</td>
                      <td className="p-2 text-blue-400 underline break-all">{video.url}</td>
                      <td className="p-2 text-center">
                        <div className="inline-block">
                          <button
                            className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-600 transition duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteVideo(video.id);
                            }}
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Resimler Tablosu */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Resimler</h2>
          <div className="flex gap-8">
            {/* Resim Ön İzleme */}
            <div className="flex-1 flex items-center justify-left">
              {selectedImage && (
                <div className="w-120 h-96 overflow-hidden rounded-sm shadow-sm border border-gray-700 flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Resim Tablosu */}
            <div className="flex-1">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="p-2 w-1/6">ID</th>
                    <th className="p-2 w-4/6">URL</th>
                    <th className="p-2 w-1/6">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((image) => (
                    <tr
                      key={image.id}
                      className="hover:bg-gray-800 cursor-pointer"
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <td className="p-2 text-white">{image.id}</td>
                      <td className="p-2 text-blue-400 underline break-words">{image.url}</td>
                      <td className="p-2">
                        <button
                          className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-600 transition duration-300"
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