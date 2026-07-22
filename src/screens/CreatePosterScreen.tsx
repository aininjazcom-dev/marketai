import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { aiService } from '../services/aiService';
import { Wand2, Download, X } from 'lucide-react';

export default function CreatePosterScreen() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setThumbnails([]);
    setSelectedImage(null);

    try {
      const urls = await aiService.generatePosters(prompt);
      setThumbnails(urls);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!selectedImage) return;
    
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `poster-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      <TopBar title="Create Poster" showBack onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-20">
        
        {/* Input Area */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Describe your poster
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A modern promotional poster for a summer coffee drink with bright yellow background..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none h-28"
            />
          </div>

          {error && (
            <div className="text-red-500 text-[13px] font-medium bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-[15px] flex items-center justify-center space-x-2 disabled:opacity-50 transition-opacity"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Wand2 size={18} />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 px-1">Crafting your poster...</h3>
            <div className="bg-gray-200 animate-pulse rounded-xl aspect-square w-full" />
          </div>
        )}

        {/* Result Single Image */}
        {thumbnails.length > 0 && !isLoading && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 px-1">Your Generated Poster</h3>
            <div 
              onClick={() => setSelectedImage(thumbnails[0])}
              className="relative cursor-pointer group rounded-xl overflow-hidden shadow-sm border-2 border-transparent hover:border-primary transition-all aspect-square w-full"
            >
              <img src={thumbnails[0]} alt="Generated Poster" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md">Click to Preview & Download</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Upscale Modal */}
      {selectedImage && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-4 pt-safe">
            <button 
              onClick={() => setSelectedImage(null)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X size={20} />
            </button>
            <span className="text-white font-medium text-[15px]">Preview</span>
            <div className="w-10" /> {/* Spacer */}
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            <img 
              src={selectedImage} 
              alt="Upscaled version" 
              className="w-full max-w-md rounded-lg shadow-2xl" 
            />
          </div>

          <div className="p-4 pb-safe bg-gradient-to-t from-black/80 to-transparent">
            <button 
              onClick={handleDownload}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-[15px] flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors"
            >
              <Download size={20} />
              <span>Download High-Res</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
