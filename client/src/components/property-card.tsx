import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon, UsersIcon, StarIcon, CrownIcon, CameraIcon, SettingsIcon, TagIcon } from "lucide-react";
import type { Property } from "@shared/schema";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  showOwned?: boolean;
  onManage?: () => void;
  onSell?: () => void;
}

export default function PropertyCard({ 
  property, 
  onClick, 
  showOwned = false,
  onManage,
  onSell 
}: PropertyCardProps) {
  const price = Number(property.price);
  const briksPrice = Number(property.briksPrice);
  const demand = Number(property.demand);
  const annualROI = Number(property.annualROI || 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'text-gray-500';
      case 'uncommon': return 'text-blue-500';
      case 'rare': return 'text-monopoly-gold';
      case 'epic': return 'text-purple-500';
      case 'legendary': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getROILevel = (roi: number) => {
    if (roi >= 30) return { level: 'Ultra', color: 'text-monopoly-green' };
    if (roi >= 25) return { level: 'Very High', color: 'text-monopoly-green' };
    if (roi >= 20) return { level: 'High', color: 'text-monopoly-green' };
    if (roi >= 15) return { level: 'Med', color: 'text-green-500' };
    return { level: 'Low', color: 'text-yellow-500' };
  };

  const roiData = getROILevel(annualROI);

  return (
    <Card 
      className={cn(
        "property-card bg-monopoly-cream overflow-hidden border-2 border-monopoly-green hover:shadow-xl transition-shadow duration-300",
        showOwned ? "border-monopoly-gold" : "",
        onClick ? "cursor-pointer" : ""
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={property.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop"} 
          alt={property.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          {showOwned ? (
            <Badge className="bg-monopoly-gold text-monopoly-dark font-bold">
              <CrownIcon className="w-3 h-3 mr-1" />
              OWNED
            </Badge>
          ) : (
            <Badge className="bg-monopoly-red text-white font-bold">
              For Sale
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          <CameraIcon className="w-3 h-3 mr-1 inline" />
          12 Photos
        </div>
        {showOwned && annualROI > 0 && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            +{annualROI}%
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-xl font-bold text-monopoly-dark">{property.name}</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-monopoly-green">${(price / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-600">B {briksPrice.toLocaleString()}</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{property.location}</p>
        
        {showOwned ? (
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-600">Purchase Price</p>
              <p className="font-bold text-monopoly-dark">${price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Current Value</p>
              <p className="font-bold text-green-500">${(price * 1.15).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Monthly Income</p>
              <p className="font-bold text-monopoly-gold">B {property.monthlyIncome}</p>
            </div>
            <div>
              <p className="text-gray-600">Condition</p>
              <p className="font-bold text-monopoly-dark">Excellent</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div className="text-center">
              <TrendingUpIcon className="w-5 h-5 mx-auto mb-1 text-monopoly-green" />
              <p className={`font-semibold ${roiData.color}`}>{roiData.level}</p>
              <p className="text-gray-600">ROI</p>
            </div>
            <div className="text-center">
              <UsersIcon className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="font-semibold">{demand}%</p>
              <p className="text-gray-600">Demand</p>
            </div>
            <div className="text-center">
              <StarIcon className={`w-5 h-5 mx-auto mb-1 ${getRarityColor(property.rarity)}`} />
              <p className="font-semibold">{property.rarity}</p>
              <p className="text-gray-600">Rarity</p>
            </div>
          </div>
        )}

        {showOwned ? (
          <div className="flex gap-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onManage?.();
              }}
              className="flex-1 bg-monopoly-green hover:bg-green-700 text-white font-bold py-2 px-4"
            >
              <SettingsIcon className="w-4 h-4 mr-1" />
              Manage
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onSell?.();
              }}
              className="flex-1 bg-monopoly-red hover:bg-red-700 text-white font-bold py-2 px-4"
            >
              <TagIcon className="w-4 h-4 mr-1" />
              Sell
            </Button>
          </div>
        ) : (
          <Button className="w-full bg-monopoly-red hover:bg-red-700 text-white font-bold py-3">
            Buy Property
          </Button>
        )}
      </div>
    </Card>
  );
}
