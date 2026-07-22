import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Camera, MousePointer, Users, Megaphone } from 'lucide-react';

export default function MarketingScoreScreen() {
  const navigate = useNavigate();

  const chartData = [
    { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 },
    { value: 60 }, { value: 55 }, { value: 75 }, { value: 70 },
    { value: 85 }
  ];

  const metrics = [
    { label: 'Content Consistency', score: 85, icon: Camera, color: 'text-blue-500', bg: 'bg-blue-50', barColor: 'bg-primary' },
    { label: 'Engagement Rate', score: 72, icon: MousePointer, color: 'text-orange-500', bg: 'bg-orange-50', barColor: 'bg-orange-500' },
    { label: 'Audience Growth', score: 80, icon: Users, color: 'text-green-500', bg: 'bg-green-50', barColor: 'bg-primary' },
    { label: 'Ad Performance', score: 75, icon: Megaphone, color: 'text-yellow-500', bg: 'bg-yellow-50', barColor: 'bg-yellow-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-background relative">
      <TopBar title="Marketing Score" showBack onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-20">
        
        {/* Main Score Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Your Score</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-bold text-primary">78</span>
              <span className="text-sm text-gray-400 font-medium">/100</span>
            </div>
            <p className="text-[13px] font-medium text-gray-900 mt-2">Good Job! 👍</p>
          </div>
          
          <div className="relative w-20 h-20">
            {/* Simple CSS Circle Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary"
                strokeDasharray="78, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        {/* This Week Chart */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-[15px] font-bold text-gray-900">This Week</h3>
            <span className="text-[12px] font-bold text-primary flex items-center">
              ↑ 12%
            </span>
          </div>
          <p className="text-[13px] text-gray-500 mb-4 px-1 max-w-[200px]">
            You're doing better than 72% of businesses.
          </p>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="value" stroke="#064E3B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4 pt-2">
          {metrics.map((metric, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${metric.bg}`}>
                <metric.icon className={metric.color} size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-semibold text-gray-800">{metric.label}</span>
                  <span className="text-[12px] font-bold text-gray-900">{metric.score}/100</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${metric.barColor} rounded-full`} style={{ width: `${metric.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Action Button */}
      <div className="p-4 bg-white border-t border-gray-100 absolute bottom-0 left-0 right-0 z-20 pb-safe">
        <button className="w-full bg-white border border-gray-200 text-primary py-3.5 rounded-lg font-semibold text-[14px] active:bg-gray-50 transition-colors shadow-sm">
          View Detailed Report
        </button>
      </div>
    </div>
  );
}
