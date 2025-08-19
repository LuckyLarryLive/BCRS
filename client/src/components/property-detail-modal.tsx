import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  XIcon, 
  BedIcon, 
  CarIcon, 
  RulerIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  HeartIcon
} from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetailModal({ property, onClose }: PropertyDetailModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const purchasePropertyMutation = useMutation({
    mutationFn: async () => {
      const userId = localStorage.getItem('currentUserId');
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      const response = await apiRequest("POST", `/api/properties/${property.id}/purchase`, { userId });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Property Purchased!",
        description: `You now own ${property.name}!`,
      });
      
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Purchase Failed",
        description: error.message || "Failed to purchase property",
        variant: "destructive",
      });
    },
  });

  const price = Number(property.price);
  const briksPrice = Number(property.briksPrice);
  const monthlyIncome = Number(property.monthlyIncome || 0);
  const annualROI = Number(property.annualROI || 0);
  const demand = Number(property.demand);

  const features = property.features || [
    "Panoramic City Views",
    "Private Elevator Access", 
    "Premium Appliances",
    "Rooftop Terrace",
    "24/7 Concierge",
    "Gym & Pool Access"
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent id="property-detail-modal" className="max-w-4xl max-h-[90vh] overflow-auto p-0">
        <div className="relative">
          <img 
            src={property.imageUrl} 
            alt={property.name}
            className="w-full h-64 object-cover" 
          />
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 h-auto"
            variant="ghost"
          >
            <XIcon className="w-6 h-6 text-gray-700" />
          </Button>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-monopoly-dark mb-4">{property.name}</h2>
              <p className="text-gray-600 text-lg mb-6">
                Experience luxury living in this premium property featuring top-tier amenities and prime location.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {property.bedrooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <BedIcon className="w-8 h-8 text-monopoly-green mb-2 mx-auto" />
                    <p className="font-bold text-monopoly-dark">{property.bedrooms}</p>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CarIcon className="w-8 h-8 text-blue-500 mb-2 mx-auto" />
                    <p className="font-bold text-monopoly-dark">{property.bathrooms}</p>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                  </div>
                )}
                {property.sqft && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <RulerIcon className="w-8 h-8 text-purple-500 mb-2 mx-auto" />
                    <p className="font-bold text-monopoly-dark">{Number(property.sqft).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Sq Ft</p>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CalendarIcon className="w-8 h-8 text-monopoly-gold mb-2 mx-auto" />
                    <p className="font-bold text-monopoly-dark">{property.yearBuilt}</p>
                    <p className="text-sm text-gray-600">Built</p>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-xl text-monopoly-dark mb-4">Property Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-monopoly-cream p-6 mb-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-monopoly-green mb-2">${price.toLocaleString()}</p>
                  <p className="text-lg text-gray-600">B {briksPrice.toLocaleString()}</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Income:</span>
                    <span className="font-bold">B {monthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual ROI:</span>
                    <span className="font-bold text-green-500">{annualROI}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Demand Level:</span>
                    <span className="font-bold">
                      {demand > 90 ? 'Very High' : demand > 75 ? 'High' : demand > 50 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rarity:</span>
                    <Badge variant="secondary" className="font-bold text-monopoly-gold">
                      {property.rarity}
                    </Badge>
                  </div>
                </div>

                <Button 
                  onClick={() => purchasePropertyMutation.mutate()}
                  disabled={purchasePropertyMutation.isPending}
                  className="w-full bg-monopoly-red hover:bg-red-700 text-white font-bold py-4 mb-4"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  {purchasePropertyMutation.isPending ? 'Purchasing...' : 'Buy Property'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Add to Watchlist
                </Button>
              </Card>

              <Card className="border border-gray-200 p-4">
                <h4 className="font-bold text-monopoly-dark mb-3">Market Analytics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Avg. District Price:</span>
                    <span>${((price * 0.85) / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price vs. Market:</span>
                    <span className="text-red-500">+17.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30-Day Change:</span>
                    <span className="text-green-500">+8.3%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
