
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageOutput } from './components/ImageOutput';
import { Loader } from './components/Loader';
import { SparklesIcon, ChevronDownIcon, FilmIcon, CutIcon, CameraIcon } from './components/icons';
import { editImageWithPrompt } from './services/geminiService';
import { generateVideoFromImage } from './services/veoService';

// Fix: Add type definition for window.aistudio to avoid TypeScript errors
// and consolidate it in the component that uses it.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}
declare global {
  interface Window {
    aistudio?: AIStudio;
  }
}

type Mode = 'edit' | 'cutout' | 'video';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('edit');
  const [cutoutBg, setCutoutBg] = useState<'Blanc' | 'Noir'>('Blanc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const keyStatus = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(keyStatus);
      }
    };
    checkApiKey();
  }, []);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setEditedImageUrl(null);
    setGeneratedVideoUrl(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCutoutSelection = (bg: 'Blanc' | 'Noir') => {
    setMode('cutout');
    setCutoutBg(bg);
    setIsDropdownOpen(false);
    // Automatically generate prompt for cutout
    const cutoutPrompt = `Détourage professionnel de l'objet principal avec un fond ${bg.toLowerCase()}.`;
    setPrompt(cutoutPrompt);
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === 'edit') {
      setPrompt(''); // Clear prompt when switching to standard edit
    } else if (newMode === 'video') {
      setPrompt(''); // Clear prompt for video
    }
  };


  const handleGenerate = useCallback(async () => {
    if (!originalImage) {
      setError('Veuillez télécharger une image.');
      return;
    }
    if (!prompt && (mode === 'edit' || mode === 'video')) {
       setError('Veuillez saisir une instruction.');
       return;
    }

    if (mode === 'video') {
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            const keyStatus = await window.aistudio.hasSelectedApiKey();
            if (!keyStatus) {
                await window.aistudio.openSelectKey();
                // Assume key is selected after dialog closes to avoid race conditions.
                setHasApiKey(true); 
            }
        }
    }


    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);
    setGeneratedVideoUrl(null);

    try {
        if (mode === 'edit' || mode === 'cutout') {
            setLoadingMessage('Modification de votre image, veuillez patienter...');
            const finalPrompt = mode === 'cutout'
                ? `Détourage professionnel de l'objet principal sur un fond ${cutoutBg === 'Blanc' ? 'blanc pur (#FFFFFF)' : 'noir pur (#000000)'}. L'objet doit être parfaitement détouré avec des bords nets.`
                : prompt;

            const newImageBase64 = await editImageWithPrompt(originalImage, finalPrompt);
            setEditedImageUrl(`data:image/png;base64,${newImageBase64}`);
        } else if (mode === 'video') {
            setLoadingMessage('Génération de votre vidéo, cela peut prendre quelques minutes...');
            const videoUrl = await generateVideoFromImage(originalImage, prompt);
            setGeneratedVideoUrl(videoUrl);
        }

    } catch (e: any) {
      console.error(e);
      let errorMessage = 'La génération a échoué. Veuillez consulter la console pour plus de détails.';
      if (e.message.includes('Requested entity was not found')) {
        errorMessage = 'La clé API est invalide ou manquante. Veuillez en sélectionner une nouvelle.';
        if(window.aistudio) await window.aistudio.openSelectKey();
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImage, prompt, mode, cutoutBg]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-red-600">
                Agent Marketing - Éditeur d'Images & Vidéos
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Faites ce que vous souhaitez de vos images. Téléchargez, décrivez, et laissez l'IA transformer votre vision en réalité.
            </p>
        </div>

        <div className="mb-8 flex justify-center">
            <div className="flex flex-wrap items-stretch justify-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-md">
                <button onClick={() => handleModeChange('edit')} className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all text-sm font-semibold border-2 ${mode === 'edit' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-600'}`}>
                    <CameraIcon />
                    Mise en situation
                </button>
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`h-full w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all text-sm font-semibold border-2 ${mode === 'cutout' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-600'}`}>
                        <CutIcon />
                        Détourage
                        <ChevronDownIcon isOpen={isDropdownOpen} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCutoutSelection('Blanc'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fond Blanc</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleCutoutSelection('Noir'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fond Noir</a>
                        </div>
                    )}
                </div>
                 <button onClick={() => handleModeChange('video')} className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all text-sm font-semibold border-2 ${mode === 'video' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-600'}`}>
                    <FilmIcon />
                    Génération de vidéo (Bêta)
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <ImageUploader onImageUpload={handleImageUpload} />

            {originalImage && (
              <>
                <div className="border-t border-gray-200 pt-6">
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-600 mb-2">
                    {mode === 'cutout' ? 'Instruction (auto-générée)' : 'Décrivez votre modification'}
                  </label>
                  <textarea
                    id="prompt"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={mode === 'cutout'}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors placeholder-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    placeholder={
                        mode === 'edit' ? "Ex: Ajouter un filtre rétro, le transformer en aquarelle..." :
                        mode === 'video' ? "Ex: Une rotation lente du produit avec des éclats de lumière..." :
                        "Instruction de détourage"
                    }
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30"
                >
                  {isLoading ? (
                    <>
                      <Loader />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      {mode === 'video' ? <FilmIcon className="h-5 w-5"/> : <SparklesIcon className="h-5 w-5"/>}
                      {mode === 'video' ? 'Générer la vidéo' : 'Générer l\'image'}
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Output Column */}
          <div className="flex items-center justify-center bg-white p-6 rounded-xl shadow-md border border-gray-200 min-h-[400px] lg:min-h-0">
            {isLoading && (
              <div className="text-center">
                <Loader large={true} />
                <p className="mt-4 text-gray-500">{loadingMessage}</p>
              </div>
            )}
            {error && <p className="text-red-500 text-center font-medium">{error}</p>}
            {!isLoading && !error && (
              <ImageOutput 
                originalImageUrl={originalImageUrl} 
                editedImageUrl={editedImageUrl} 
                generatedVideoUrl={generatedVideoUrl}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;