import React, { useState } from 'react';
import { ImageIcon, DownloadIcon, EnlargeIcon, CloseIcon } from './icons';

interface ImageOutputProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  generatedVideoUrl: string | null;
}

export const ImageOutput: React.FC<ImageOutputProps> = ({ originalImageUrl, editedImageUrl, generatedVideoUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    if (!editedImageUrl) return;
    const link = document.createElement('a');
    link.href = editedImageUrl;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `edited-image-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVideoDownload = () => {
    if (!generatedVideoUrl) return;
    const link = document.createElement('a');
    link.href = generatedVideoUrl;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `generated-video-${timestamp}.mp4`;
    link.target = '_blank'; // Open in new tab to download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (editedImageUrl) {
    return (
      <div className="w-full flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center mb-2 text-red-600">Résultat</h3>
          <div className="w-full mb-4">
            <img 
              src={editedImageUrl} 
              alt="Edited" 
              className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-lg border-2 border-red-500 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="mt-2 flex justify-center items-center gap-3">
              <button onClick={handleDownload} className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors">
                  <DownloadIcon />
                  Télécharger
              </button>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors">
                  <EnlargeIcon />
                  Agrandir
              </button>
          </div>

        {isModalOpen && (
            <div 
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                onClick={() => setIsModalOpen(false)}
            >
                <div className="relative max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
                    <img src={editedImageUrl} alt="Edited Enlarged" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition-transform transform hover:scale-110"
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
        )}
    </div>
    );
  }

  if (generatedVideoUrl) {
    return (
        <div className="w-full flex flex-col items-center">
            <h3 className="text-lg font-semibold text-center mb-2 text-red-600">Vidéo Générée</h3>
            <div className="w-full mb-4 bg-black rounded-lg shadow-lg border-2 border-red-500">
                <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                />
            </div>
            <div className="mt-2 flex justify-center items-center gap-3">
                <button onClick={handleVideoDownload} className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors">
                    <DownloadIcon />
                    Télécharger la Vidéo
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="text-center text-gray-400">
      <ImageIcon />
      <p>Votre image ou vidéo modifiée apparaîtra ici</p>
    </div>
  );
};
