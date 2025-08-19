import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { BuildingIcon, ChartBarIcon, WalletIcon, TrophyIcon, PlayIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWalletMutation = useMutation({
    mutationFn: async () => {
      // Simulate wallet connection
      const walletAddress = "0x" + Math.random().toString(16).substr(2, 40);
      const response = await apiRequest("POST", "/api/auth/connect-wallet", { walletAddress });
      return response.json();
    },
    onSuccess: (user) => {
      // Store user ID for future API calls
      localStorage.setItem('currentUserId', user.id);
      
      toast({
        title: "Wallet Connected!",
        description: `Welcome to Brick City, ${user.username}!`,
      });
      
      // Redirect to dashboard, with tutorial if new user
      const redirectPath = user.hasCompletedTutorial ? "/dashboard" : "/dashboard?tutorial=true";
      setLocation(redirectPath);
    },
    onError: (error) => {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePlayNow = () => {
    setIsConnecting(true);
    connectWalletMutation.mutate();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with cityscape gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-monopoly-green to-green-800">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <rect x="100" y="400" width="60" height="300" fill="#2D5016"/>
            <rect x="200" y="350" width="80" height="350" fill="#1F3A11"/>
            <rect x="320" y="300" width="70" height="400" fill="#2D5016"/>
            <rect x="450" y="250" width="90" height="450" fill="#1F3A11"/>
            <rect x="600" y="320" width="65" height="380" fill="#2D5016"/>
            <rect x="720" y="280" width="75" height="420" fill="#1F3A11"/>
            <rect x="850" y="350" width="85" height="350" fill="#2D5016"/>
            <rect x="980" y="300" width="70" height="400" fill="#1F3A11"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo and Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BuildingIcon className="w-16 h-16 text-monopoly-gold mr-4" />
            <div>
              <h1 className="font-display text-6xl font-bold text-white mb-2">Brick City</h1>
              <h2 className="font-display text-3xl text-monopoly-cream">Realty Sim</h2>
            </div>
          </div>
          <p className="text-xl text-monopoly-cream max-w-2xl mx-auto leading-relaxed">
            Master the art of virtual real estate in this immersive Web3 simulation. 
            Buy, sell, and manage properties in a dynamic marketplace powered by blockchain technology.
          </p>
        </div>

        {/* Play Now Button */}
        <Button
          id="play-now-button"
          onClick={handlePlayNow}
          disabled={isConnecting}
          className="group relative px-12 py-6 bg-monopoly-red hover:bg-red-700 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          <span className="flex items-center">
            <PlayIcon className="w-6 h-6 mr-3" />
            {isConnecting ? "Connecting..." : "Play Now"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-opacity duration-500"></div>
        </Button>

        {/* Features Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-monopoly-cream rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-8 h-8 text-monopoly-green" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Real-Time Trading</h3>
            <p className="text-monopoly-cream text-sm">Dynamic property values with live market data</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-monopoly-cream rounded-full flex items-center justify-center mx-auto mb-4">
              <WalletIcon className="w-8 h-8 text-monopoly-green" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Web3 Integration</h3>
            <p className="text-monopoly-cream text-sm">Connect your wallet and earn $BRIKS tokens</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-monopoly-cream rounded-full flex items-center justify-center mx-auto mb-4">
              <TrophyIcon className="w-8 h-8 text-monopoly-green" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Competitive Play</h3>
            <p className="text-monopoly-cream text-sm">Climb leaderboards and build your empire</p>
          </div>
        </div>
      </div>
    </div>
  );
}
