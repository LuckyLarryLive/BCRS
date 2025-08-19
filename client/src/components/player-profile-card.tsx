import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { UserIcon, CoinsIcon } from "lucide-react";

export default function PlayerProfileCard() {
  const userId = localStorage.getItem('currentUserId');
  
  const { data: user } = useQuery({
    queryKey: ['/api/users', userId],
    enabled: !!userId,
  });

  const { data: ownedProperties = [] } = useQuery({
    queryKey: ['/api/users', userId, 'properties'],
    enabled: !!userId,
  });

  if (!user) return null;

  const netWorth = Number(user.netWorth || 0);
  const rank = Number(user.rank || 999);

  return (
    <Card id="player-profile-card" className="bg-monopoly-cream border-2 border-monopoly-green p-6 mb-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-monopoly-green rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="w-12 h-12 text-white" />
        </div>
        <h3 className="font-display text-xl font-bold text-monopoly-dark mb-2">
          {user.username || "Property Mogul"}
        </h3>
        <div className="bg-white rounded-lg p-3 mb-4">
          <div className="flex items-center justify-center">
            <CoinsIcon className="w-5 h-5 text-monopoly-gold mr-2" />
            <span id="briks-balance" className="font-bold text-lg text-monopoly-dark">
              B {Number(user.briksBalance || 0).toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Current Balance</p>
        </div>
        <div className="text-sm text-monopoly-dark space-y-1">
          <p><span className="font-semibold">Net Worth:</span> ${netWorth.toLocaleString()}</p>
          <p><span className="font-semibold">Properties:</span> {ownedProperties.length}</p>
          <p><span className="font-semibold">Rank:</span> #{rank}</p>
        </div>
      </div>
    </Card>
  );
}
