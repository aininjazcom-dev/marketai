import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { Lightbulb, Edit3, Tag, Hash, TrendingUp, MessageSquare, Send, Mic } from 'lucide-react';

export default function AIAssistantScreen() {
  const navigate = useNavigate();

  const suggestions = [
    { text: 'Give me a post idea', icon: Lightbulb, color: 'text-orange-400' },
    { text: 'Write a caption', icon: Edit3, color: 'text-purple-500' },
    { text: 'Create an offer', icon: Tag, color: 'text-red-500' },
    { text: 'Suggest hashtags', icon: Hash, color: 'text-blue-400' },
    { text: 'Improve my content', icon: TrendingUp, color: 'text-green-500' },
    { text: 'Reply to a customer', icon: MessageSquare, color: 'text-green-600' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAF9F6]">
      <TopBar title="AI Assistant" showBack onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-6 pb-24">
        
        {/* Chat Message */}
        <div className="flex flex-col items-start max-w-[85%]">
          <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 text-[15px] text-gray-800 leading-relaxed">
            <p>Hi Rahim! 👋</p>
            <p className="mt-1">I'm your AI Marketing Assistant.</p>
            <p className="mt-1">How can I help you today?</p>
          </div>
          <span className="text-[11px] text-gray-400 mt-2 ml-1">9:41 AM</span>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col space-y-2.5 w-full max-w-[85%] ml-auto">
          {suggestions.map((s, i) => (
            <button key={i} className="bg-white px-4 py-3.5 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-3 active:scale-[0.98] transition-transform w-full">
              <s.icon className={s.color} size={18} />
              <span className="text-[14px] font-medium text-gray-700">{s.text}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Input Area */}
      <div className="bg-[#FAF9F6] p-4 pb-safe absolute bottom-0 left-0 right-0">
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-white border border-gray-200 rounded-full flex items-center px-4 py-2.5 shadow-sm">
            <button className="text-gray-400 mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 outline-none text-[15px] bg-transparent text-gray-800 placeholder-gray-400"
            />
          </div>
          <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-sm shrink-0 active:scale-95 transition-transform">
            <Mic size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
