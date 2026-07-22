import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../components/TopBar';
import { Gift, Image, MessageCircle, TrendingUp, FileText, CheckCircle } from 'lucide-react';

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Unread'];

  const notifications = [
    {
      id: 1,
      message: 'Your Weekend Special Offer content is ready!',
      time: '9:30 AM',
      icon: Gift,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      unread: true,
    },
    {
      id: 2,
      message: 'New poster created successfully',
      time: '9:20 AM',
      icon: Image,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      unread: true,
    },
    {
      id: 3,
      message: '5 new messages received on WhatsApp',
      time: '9:15 AM',
      icon: MessageCircle,
      color: 'text-green-500',
      bg: 'bg-green-50',
      unread: true,
    },
    {
      id: 4,
      message: 'Your ad is performing great! 🎉',
      time: '8:45 AM',
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-50',
      unread: true,
    },
    {
      id: 5,
      message: 'New template added: Onam Special',
      time: 'Yesterday',
      icon: FileText,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      unread: false,
    },
    {
      id: 6,
      message: 'Weekly report is ready',
      time: 'Yesterday',
      icon: CheckCircle,
      color: 'text-gray-500',
      bg: 'bg-gray-100',
      unread: false,
    }
  ];

  const displayNotifications = activeTab === 'Unread' ? notifications.filter(n => n.unread) : notifications;

  return (
    <div className="flex flex-col h-full bg-background relative">
      <TopBar title="Notifications" showBack onBack={() => navigate(-1)} />
      
      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-200 shrink-0">
        <div className="flex space-x-12 justify-center pt-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-white divide-y divide-gray-50 pb-20">
        {displayNotifications.map((notif) => (
          <div key={notif.id} className="p-4 flex items-start space-x-4">
            <div className={`w-10 h-10 ${notif.bg} rounded-xl flex items-center justify-center shrink-0`}>
              <notif.icon className={notif.color} size={20} />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className={`text-[14px] leading-tight ${notif.unread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                {notif.message}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[12px] text-gray-400">{notif.time}</p>
                {notif.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
