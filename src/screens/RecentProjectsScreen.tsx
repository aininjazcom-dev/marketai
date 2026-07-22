import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

export default function RecentProjectsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Posts', 'Ads', 'Designs', 'Videos'];

  const projects = [
    {
      id: 1,
      title: 'Weekend Offer Campaign',
      date: '18 May 2024 • 9:30 AM',
      status: 'Published',
      type: 'Post',
      color: 'text-green-600',
      bg: 'bg-green-50',
      img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      title: 'Summer Drinks Promotion',
      date: '17 May 2024 • 4:20 PM',
      status: 'Active',
      type: 'Ad',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      title: 'Biryani Special Poster',
      date: '17 May 2024 • 11:15 AM',
      status: 'Completed',
      type: 'Design',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&h=150&fit=crop'
    },
    {
      id: 4,
      title: 'Customer Review Post',
      date: '16 May 2024 • 6:45 PM',
      status: 'Published',
      type: 'Post',
      color: 'text-green-600',
      bg: 'bg-green-50',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=150&fit=crop'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background relative">
      <TopBar title="Recent Projects" showBack onBack={() => navigate(-1)} />
      
      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-200 shrink-0">
        <div className="flex space-x-6 overflow-x-auto no-scrollbar pt-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-start space-x-4">
            <img src={project.img} alt={project.title} className="w-20 h-20 rounded-lg object-cover bg-gray-100 shrink-0" />
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-[15px] font-semibold text-gray-900 truncate">{project.title}</h3>
              <p className="text-[12px] text-gray-500 mt-1">{project.date}</p>
              <p className={`text-[12px] font-medium mt-1 ${project.color}`}>{project.status}</p>
            </div>
            <div className={`px-2 py-1 rounded text-[10px] font-medium mt-1 shrink-0 ${project.bg} ${project.color}`}>
              {project.type}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
