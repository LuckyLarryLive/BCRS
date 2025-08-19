import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import PlayerProfileCard from "@/components/player-profile-card";
import NavigationMenu from "@/components/navigation-menu";
import TutorialOverlay from "@/components/tutorial-overlay";
import { Card } from "@/components/ui/card";
import { TrendingUpIcon, HomeIcon, HandshakeIcon, UsersIcon, LineChartIcon, HammerIcon, StarIcon } from "lucide-react";

export default function Dashboard() {
  const [location] = useLocation();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if tutorial should be shown from URL params
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    if (urlParams.get('tutorial') === 'true') {
      setShowTutorial(true);
    }
  }, [location]);

  const { data: user } = useQuery({
    queryKey: ['/api/users', localStorage.getItem('currentUserId')],
    enabled: !!localStorage.getItem('currentUserId'),
  });

  const marketStats = [
    {
      icon: TrendingUpIcon,
      value: "+12.3%",
      label: "Market Growth",
      color: "text-green-500",
    },
    {
      icon: HomeIcon,
      value: "1,247",
      label: "Active Listings",
      color: "text-blue-500",
    },
    {
      icon: HandshakeIcon,
      value: "89",
      label: "Today's Sales",
      color: "text-monopoly-gold",
    },
    {
      icon: UsersIcon,
      value: "3,429",
      label: "Active Players",
      color: "text-purple-500",
    },
  ];

  const marketNews = [
    {
      icon: LineChartIcon,
      title: "Downtown District Prices Surge",
      description: "Property values in the downtown core have increased by 15% this week due to new commercial developments.",
      time: "2 hours ago",
      color: "text-green-500",
    },
    {
      icon: HammerIcon,
      title: "New Construction Zone Opened",
      description: "The Industrial Quarter is now available for development with special $BRIKS incentives.",
      time: "4 hours ago",
      color: "text-monopoly-gold",
    },
    {
      icon: StarIcon,
      title: "Player Achievement: First Monopoly",
      description: "@RealEstateKing became the first player to own all properties in Luxury Lane!",
      time: "6 hours ago",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Player Profile & Navigation */}
          <div className="lg:col-span-3">
            <PlayerProfileCard />
            <NavigationMenu />
          </div>

          {/* Center Column: Main Content */}
          <div className="lg:col-span-6">
            {/* Dashboard Summary */}
            <Card className="bg-white p-6 mb-6">
              <h2 className="font-display text-2xl font-bold text-monopoly-dark mb-6">Market Overview</h2>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {marketStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold text-monopoly-dark">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Market News Feed */}
              <div>
                <h3 className="font-semibold text-lg text-monopoly-dark mb-4">Market News</h3>
                <div className="space-y-4">
                  {marketNews.map((news, index) => (
                    <div key={index} className="flex items-start p-4 bg-monopoly-cream rounded-lg">
                      <news.icon className={`w-5 h-5 mr-3 mt-1 ${news.color}`} />
                      <div>
                        <h4 className="font-medium text-monopoly-dark">{news.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{news.description}</p>
                        <span className="text-xs text-gray-500">{news.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: World Map & Alerts */}
          <div className="lg:col-span-3">
            {/* Mini Map */}
            <Card className="bg-white p-6 mb-6">
              <h3 className="font-semibold text-lg text-monopoly-dark mb-4">City Map</h3>
              <div className="relative h-48 bg-monopoly-green rounded-lg overflow-hidden">
                <div className="absolute inset-2 grid grid-cols-4 gap-1">
                  <div className="bg-monopoly-gold rounded-sm flex items-center justify-center">
                    <HomeIcon className="w-3 h-3 text-monopoly-dark" />
                  </div>
                  <div className="bg-monopoly-cream rounded-sm"></div>
                  <div className="bg-monopoly-red rounded-sm flex items-center justify-center">
                    <HomeIcon className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-monopoly-cream rounded-sm"></div>
                  <div className="bg-monopoly-cream rounded-sm"></div>
                  <div className="bg-blue-400 rounded-sm flex items-center justify-center">
                    <HomeIcon className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-monopoly-cream rounded-sm"></div>
                  <div className="bg-monopoly-gold rounded-sm flex items-center justify-center">
                    <HomeIcon className="w-3 h-3 text-monopoly-dark" />
                  </div>
                  <div className="bg-monopoly-red rounded-sm flex items-center justify-center">
                    <HomeIcon className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-monopoly-cream rounded-sm"></div>
                  <div className="bg-monopoly-cream rounded-sm"></div>
                  <div className="bg-green-400 rounded-sm flex items-center justify-center">
                    <HomeIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-monopoly-gold rounded-sm mr-2"></div>
                  <span>Owned</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-monopoly-red rounded-sm mr-2"></div>
                  <span>For Sale</span>
                </div>
              </div>
            </Card>

            {/* Alerts Panel */}
            <Card className="bg-white p-6">
              <h3 className="font-semibold text-lg text-monopoly-dark mb-4">Alerts & Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <TrendingUpIcon className="w-5 h-5 text-monopoly-red mr-3" />
                  <div className="text-sm">
                    <p className="font-medium text-monopoly-dark">Rent Due</p>
                    <p className="text-gray-600">Oak Street Apartment</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingUpIcon className="w-5 h-5 text-monopoly-gold mr-3" />
                  <div className="text-sm">
                    <p className="font-medium text-monopoly-dark">Payment Received</p>
                    <p className="text-gray-600">+B 2,500</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <LineChartIcon className="w-5 h-5 text-blue-500 mr-3" />
                  <div className="text-sm">
                    <p className="font-medium text-monopoly-dark">Price Alert</p>
                    <p className="text-gray-600">Luxury Lane +8%</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
