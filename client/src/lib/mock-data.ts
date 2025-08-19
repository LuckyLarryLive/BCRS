// This file contains mock data for the application
// In a real implementation, this would be replaced by API calls

export const mockUser = {
  id: "user-1",
  username: "Property Mogul",
  walletAddress: "0x1234...5678",
  briksBalance: "15000",
  netWorth: "2350000",
  rank: "47",
  hasCompletedTutorial: false,
};

export const mockProperties = [
  {
    id: "prop-1",
    name: "Luxury Downtown Penthouse",
    price: "485000",
    briksPrice: "32300",
    location: "Downtown Core",
    propertyType: "Residential",
    income: "2850",
    demand: "85",
    rarity: "Rare",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop",
    features: ["Panoramic City Views", "Private Elevator Access", "Premium Appliances", "Rooftop Terrace", "24/7 Concierge", "Gym & Pool Access"],
    bedrooms: "3",
    bathrooms: "2.5",
    sqft: "2100",
    yearBuilt: "2019",
    monthlyIncome: "2850",
    annualROI: "21.2",
    condition: "100",
    ownerId: null,
  },
  // Add more mock properties as needed
];

export const mockTransactions = [
  {
    id: "tx-1",
    userId: "user-1",
    propertyId: "prop-1",
    type: "rent_payment",
    amount: "2850",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
];
