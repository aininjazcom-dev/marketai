import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { dataProvider } from '../services/dataProvider';
import { Calendar, Share2, Camera, MessageCircle, Image, Video, Megaphone } from 'lucide-react';

export default function MarketingKitScreen() {
  const navigate = useNavigate();
  const [kits, setKits] = useState<any[]>([]);

  useEffect(() => {
    dataProvider.getMarketingKits().then(setKits);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'facebook': return <Share2 className="text-blue-600" size={24} />;
      case 'instagram': return <Camera className="text-pink-600" size={24} />;
      case 'whatsapp': return <MessageCircle className="text-green-500" size={24} />;
      case 'poster': return <Image className="text-green-600" size={24} />;
      case 'reel': return <Video className="text-purple-600" size={24} />;
      case 'ad': return <Megaphone className="text-red-500" size={24} />;
      default: return <Image className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Today's Marketing Kit" showBack onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        
        {/* Theme Header */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Today's Theme</p>
            <h2 className="text-[15px] font-bold text-gray-900 mb-2">Weekend Special Offer 🎉</h2>
            <p className="text-xs text-gray-400">Date: 18 May 2024</p>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <Calendar className="text-gray-600" size={20} />
          </div>
        </div>

        {/* Content List */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">Your Ready-to-Use Content</h3>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {kits.map((kit) => (
              <div key={kit.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                    {getIcon(kit.icon_type)}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-gray-900">{kit.title}</h4>
                    <p className="text-[12px] text-gray-500 mt-0.5">{kit.subtitle}</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-medium rounded uppercase tracking-wide">
                  {kit.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 bg-white border-t border-gray-100 pb-safe">
        <button className="w-full bg-primary text-white py-3.5 rounded-lg font-medium text-[15px] active:bg-primary/90 transition-colors shadow-sm">
          View All & Customize
        </button>
      </div>
    </div>
  );
}
