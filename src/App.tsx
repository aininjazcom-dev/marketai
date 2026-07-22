import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MobileLayout from './components/MobileLayout';
import HomeDashboard from './screens/HomeDashboard';
import MarketingKitScreen from './screens/MarketingKitScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import RecentProjectsScreen from './screens/RecentProjectsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import MarketingScoreScreen from './screens/MarketingScoreScreen';

// Placeholder components for other screens for now
const PlaceholderScreen = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full bg-white text-gray-500">
    <h1 className="text-xl font-medium">{title} Screen</h1>
  </div>
);

function App() {
  return (
    <Router>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/kit" element={<MarketingKitScreen />} />
          <Route path="/poster" element={<PlaceholderScreen title="Create Poster" />} />
          <Route path="/ad" element={<PlaceholderScreen title="Run Meta Ad" />} />
          <Route path="/assistant" element={<AIAssistantScreen />} />
          <Route path="/score" element={<MarketingScoreScreen />} />
          <Route path="/projects" element={<RecentProjectsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/profile" element={<PlaceholderScreen title="Profile" />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
}

export default App;
