import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import PropertyCard from "@/components/property-card";
import PropertyDetailModal from "@/components/property-detail-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import type { Property } from "@shared/schema";

export default function MLS() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    location: "all",
    priceRange: "all",
    propertyType: "all",
  });

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties', { available: true }],
  });

  const filteredProperties = properties.filter((property: Property) => {
    if (filters.location !== "all" && property.location !== filters.location) {
      return false;
    }
    if (filters.propertyType !== "all" && property.propertyType !== filters.propertyType) {
      return false;
    }
    if (filters.priceRange !== "all") {
      const price = Number(property.price);
      switch (filters.priceRange) {
        case "50-100":
          return price >= 50000 && price <= 100000;
        case "100-250":
          return price >= 100000 && price <= 250000;
        case "250-500":
          return price >= 250000 && price <= 500000;
        case "500+":
          return price >= 500000;
        default:
          return true;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-monopoly-dark mb-2">Multiple Listing Service</h1>
          <p className="text-gray-600">Discover and invest in premium virtual real estate</p>
        </div>

        {/* Filters */}
        <Card id="mls-filters" className="bg-white p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="Downtown Core">Downtown Core</SelectItem>
                  <SelectItem value="Luxury Lane">Luxury Lane</SelectItem>
                  <SelectItem value="Industrial Quarter">Industrial Quarter</SelectItem>
                  <SelectItem value="Suburban Heights">Suburban Heights</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="50-100">$50K - $100K</SelectItem>
                  <SelectItem value="100-250">$100K - $250K</SelectItem>
                  <SelectItem value="250-500">$250K - $500K</SelectItem>
                  <SelectItem value="500+">$500K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                  <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-monopoly-green hover:bg-green-700 text-white">
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </Card>

        {/* Property Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property: Property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => setSelectedProperty(property)}
                  showOwned={false}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties match your current filters.</p>
                <Button 
                  onClick={() => setFilters({ location: "all", priceRange: "all", propertyType: "all" })}
                  variant="outline" 
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Load More Button */}
            {filteredProperties.length > 0 && (
              <div className="text-center mt-12">
                <Button className="bg-monopoly-green hover:bg-green-700 text-white px-8 py-3">
                  Load More Properties
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
