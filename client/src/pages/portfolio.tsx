import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import PropertyCard from "@/components/property-card";
import { Card } from "@/components/ui/card";
import { HomeIcon, DollarSignIcon, TrendingUpIcon, CoinsIcon, WrenchIcon, TagIcon } from "lucide-react";
import type { Property } from "@shared/schema";

export default function Portfolio() {
  const userId = localStorage.getItem('currentUserId');

  const { data: ownedProperties = [], isLoading } = useQuery({
    queryKey: ['/api/users', userId, 'properties'],
    enabled: !!userId,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['/api/users', userId, 'transactions'],
    enabled: !!userId,
  });

  // Calculate portfolio stats
  const totalProperties = ownedProperties.length;
  const portfolioValue = ownedProperties.reduce((sum: number, property: Property) => 
    sum + Number(property.price), 0
  );
  const monthlyIncome = ownedProperties.reduce((sum: number, property: Property) => 
    sum + Number(property.monthlyIncome || 0), 0
  );
  const monthlyReturn = portfolioValue > 0 ? ((monthlyIncome / portfolioValue) * 100).toFixed(1) : "0";

  const recentActivities = [
    {
      icon: CoinsIcon,
      title: "Rent Payment Received",
      description: "Executive Mansion • B 3,250",
      time: "2 hours ago",
      color: "text-monopoly-gold",
      bgColor: "bg-green-50 border-green-200",
    },
    {
      icon: TrendingUpIcon,
      title: "Property Value Increased",
      description: "Suburban Cottage • +$12,500 (+6.2%)",
      time: "1 day ago",
      color: "text-blue-500",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      icon: WrenchIcon,
      title: "Maintenance Completed",
      description: "Downtown Apartments • HVAC system upgrade",
      time: "3 days ago",
      color: "text-monopoly-gold",
      bgColor: "bg-yellow-50 border-yellow-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Summary */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-monopoly-dark mb-4">My Portfolio</h1>
          
          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white p-6 text-center">
              <HomeIcon className="w-12 h-12 text-monopoly-green mb-3 mx-auto" />
              <p className="text-3xl font-bold text-monopoly-dark">{totalProperties}</p>
              <p className="text-gray-600">Total Properties</p>
            </Card>
            <Card className="bg-white p-6 text-center">
              <DollarSignIcon className="w-12 h-12 text-monopoly-gold mb-3 mx-auto" />
              <p className="text-3xl font-bold text-monopoly-dark">${(portfolioValue / 1000000).toFixed(2)}M</p>
              <p className="text-gray-600">Portfolio Value</p>
            </Card>
            <Card className="bg-white p-6 text-center">
              <TrendingUpIcon className="w-12 h-12 text-green-500 mb-3 mx-auto" />
              <p className="text-3xl font-bold text-monopoly-dark">+{monthlyReturn}%</p>
              <p className="text-gray-600">Monthly Return</p>
            </Card>
            <Card className="bg-white p-6 text-center">
              <CoinsIcon className="w-12 h-12 text-monopoly-gold mb-3 mx-auto" />
              <p className="text-3xl font-bold text-monopoly-dark">B {monthlyIncome.toLocaleString()}</p>
              <p className="text-gray-600">Monthly Income</p>
            </Card>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : ownedProperties.length > 0 ? (
          <>
            {/* Owned Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedProperties.map((property: Property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  showOwned={true}
                  onManage={() => console.log('Manage property:', property.id)}
                  onSell={() => console.log('Sell property:', property.id)}
                />
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="mt-12 bg-white p-6">
              <h2 className="font-display text-2xl font-bold text-monopoly-dark mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${activity.bgColor}`}>
                    <div className="flex items-center">
                      <activity.icon className={`w-6 h-6 mr-4 ${activity.color}`} />
                      <div>
                        <p className="font-medium text-monopoly-dark">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        ) : (
          <div className="text-center py-12">
            <HomeIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Yet</h3>
            <p className="text-gray-500 mb-6">Start building your real estate empire by browsing available properties.</p>
            <a 
              href="/mls" 
              className="bg-monopoly-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Browse Properties
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
