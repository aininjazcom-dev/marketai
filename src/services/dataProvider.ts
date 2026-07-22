import { supabase } from './supabaseClient';

// Mock Data Definitions
const mockProfile = {
  id: 'mock-uuid',
  name: 'Rahim',
  restaurant_name: 'Rahim Restaurant',
  location: 'Trivandrum, Kerala',
  plan_type: 'Pro Plan'
};

const mockMarketingKits = [
  { id: '1', title: 'Facebook Post', subtitle: 'Post to engage your audience', icon_type: 'facebook', status: 'Ready' },
  { id: '2', title: 'Instagram Post', subtitle: 'With hashtags', icon_type: 'instagram', status: 'Ready' },
  { id: '3', title: 'WhatsApp Status', subtitle: 'Share with your contacts', icon_type: 'whatsapp', status: 'Ready' },
  { id: '4', title: 'Poster Design', subtitle: '1080 x 1080 px', icon_type: 'poster', status: 'Ready' },
  { id: '5', title: 'Reel Script', subtitle: '30 sec video idea', icon_type: 'reel', status: 'Ready' },
  { id: '6', title: 'Meta Ad Suggestion', subtitle: 'Targeted ad for you', icon_type: 'ad', status: 'Ready' }
];

export const dataProvider = {
  getProfile: async () => {
    if (supabase) {
      const { data } = await supabase.from('profiles').select('*').single();
      if (data) return data;
    }
    return mockProfile;
  },
  
  getMarketingKits: async () => {
    if (supabase) {
      const { data } = await supabase.from('marketing_kits').select('*');
      if (data) return data;
    }
    return mockMarketingKits;
  },

  // Add more getters as needed for Notifications, Projects, etc.
};
