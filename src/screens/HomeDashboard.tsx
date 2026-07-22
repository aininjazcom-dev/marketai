import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { dataProvider } from '../services/dataProvider';
import { ChevronRight, Calendar, PenTool, Megaphone, Bot, Activity, FolderOpen, Plus } from 'lucide-react';

export default function HomeDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    dataProvider.getProfile().then(setProfile);
  }, []);

  const menuItems = [
    { title: "Today's Marketing Kit", subtitle: "Get your daily content ideas", icon: Calendar, color: "text-blue-500", bg: "bg-blue-100", route: "/kit" },
    { title: "Create Poster", subtitle: "Design posters in one tap", icon: PenTool, color: "text-red-500", bg: "bg-red-100", route: "/poster" },
    { title: "Run Meta Ad", subtitle: "Create & run ads on Facebook", icon: Megaphone, color: "text-blue-600", bg: "bg-blue-100", route: "/ad" },
    { title: "AI Assistant", subtitle: "Ask anything about marketing", icon: Bot, color: "text-indigo-500", bg: "bg-indigo-100", route: "/assistant" },
    { title: "Marketing Score", subtitle: "Check your performance", icon: Activity, color: "text-green-500", bg: "bg-green-100", route: "/score" },
    { title: "Recent Projects", subtitle: "View your posts, ads & designs", icon: FolderOpen, color: "text-orange-500", bg: "bg-orange-100", route: "/projects" },
  ];

  return (
    <div className="flex flex-col h-full bg-background relative">
      <TopBar title="MarketingMate AI" />
      
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Profile Card */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xs text-center leading-tight overflow-hidden">
              <span className="font-serif">Rahim<br/>Restaurant</span>
            </div>
            <div>
              <h2 className="font-semibold text-[15px] flex items-center">
                {profile?.restaurant_name || 'Restaurant'}
                <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </h2>
              <p className="text-xs text-gray-500">{profile?.location || 'Location'}</p>
            </div>
          </div>
          <div className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
            {profile?.plan_type || 'Plan'}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mx-4 mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
          <h3 className="font-medium text-[15px] text-gray-900">Good Morning, {profile?.name || 'User'}! 👋</h3>
          <p className="text-sm text-gray-600 mt-1">Let's grow your business today.</p>
        </div>

        {/* Menu Grid */}
        <div className="p-4 space-y-3">
          {menuItems.map((item, index) => (
            <button 
              key={index} 
              onClick={() => navigate(item.route)}
              className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] text-gray-900">{item.title}</h4>
                  <p className="text-[13px] text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-6 right-4 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-20">
        <Plus size={28} />
      </button>
    </div>
  );
}
