import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrophyIcon, CrownIcon, MedalIcon, CoinsIcon } from "lucide-react";

export default function Leaderboard() {
  // Mock leaderboard data since we don't have a real leaderboard API yet
  const mockLeaderboard = [
    {
      id: "1",
      username: "RealEstateKing",
      netWorth: "5250000",
      properties: 12,
      rank: 1,
      briksBalance: "25000",
      avatar: "👑"
    },
    {
      id: "2", 
      username: "PropertyMogul",
      netWorth: "4180000",
      properties: 9,
      rank: 2,
      briksBalance: "18500",
      avatar: "🏆"
    },
    {
      id: "3",
      username: "UrbanInvestor",
      netWorth: "3750000", 
      properties: 8,
      rank: 3,
      briksBalance: "22000",
      avatar: "🥉"
    },
    {
      id: "4",
      username: "CityBuilder",
      netWorth: "3200000",
      properties: 7,
      rank: 4,
      briksBalance: "15200",
      avatar: "🏙️"
    },
    {
      id: "5",
      username: "LandlordLegend",
      netWorth: "2950000",
      properties: 6,
      rank: 5,
      briksBalance: "19800",
      avatar: "🏠"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <CrownIcon className="w-6 h-6 text-yellow-500" />;
      case 2: return <TrophyIcon className="w-6 h-6 text-gray-400" />;
      case 3: return <MedalIcon className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-gray-500 font-bold">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-yellow-500 text-white";
      case 2: return "bg-gray-400 text-white";
      case 3: return "bg-amber-600 text-white";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-monopoly-dark mb-4">
            Brick City Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            See how you stack up against the top real estate moguls
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mockLeaderboard.slice(0, 3).map((player, index) => (
            <Card 
              key={player.id} 
              className={`text-center p-8 ${
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white transform scale-105' :
                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                'bg-gradient-to-br from-amber-500 to-amber-700 text-white'
              }`}
            >
              <div className="text-6xl mb-4">{player.avatar}</div>
              <h3 className="font-display text-2xl font-bold mb-2">{player.username}</h3>
              <div className="flex justify-center mb-4">
                {getRankIcon(player.rank)}
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  Net Worth: ${(Number(player.netWorth) / 1000000).toFixed(1)}M
                </p>
                <p>Properties: {player.properties}</p>
                <p>$BRIKS: B {Number(player.briksBalance).toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <Card className="bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-monopoly-cream">
            <h2 className="font-display text-2xl font-bold text-monopoly-dark">
              Top Players
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Net Worth
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    $BRIKS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockLeaderboard.map((player) => (
                  <tr 
                    key={player.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Badge className={`mr-3 ${getRankBadgeColor(player.rank)}`}>
                          {player.rank}
                        </Badge>
                        {player.rank <= 3 && getRankIcon(player.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{player.avatar}</span>
                        <span className="font-semibold text-monopoly-dark">
                          {player.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="font-bold text-monopoly-green text-lg">
                        ${(Number(player.netWorth) / 1000000).toFixed(1)}M
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="font-medium text-gray-900">
                        {player.properties}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end">
                        <CoinsIcon className="w-4 h-4 text-monopoly-gold mr-1" />
                        <span className="font-medium text-monopoly-gold">
                          B {Number(player.briksBalance).toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white p-6 text-center">
            <TrophyIcon className="w-12 h-12 text-monopoly-gold mb-3 mx-auto" />
            <p className="text-3xl font-bold text-monopoly-dark">$52.3M</p>
            <p className="text-gray-600">Total Market Value</p>
          </Card>
          <Card className="bg-white p-6 text-center">
            <CoinsIcon className="w-12 h-12 text-monopoly-green mb-3 mx-auto" />
            <p className="text-3xl font-bold text-monopoly-dark">42</p>
            <p className="text-gray-600">Total Properties</p>
          </Card>
          <Card className="bg-white p-6 text-center">
            <CrownIcon className="w-12 h-12 text-purple-500 mb-3 mx-auto" />
            <p className="text-3xl font-bold text-monopoly-dark">5</p>
            <p className="text-gray-600">Active Players</p>
          </Card>
        </div>
      </div>
    </div>
  );
}