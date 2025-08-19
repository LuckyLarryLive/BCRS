import { type User, type InsertUser, type Property, type InsertProperty, type Transaction, type InsertTransaction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Property operations
  getAllProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  getPropertiesByOwner(ownerId: string): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, updates: Partial<Property>): Promise<Property | undefined>;
  getAvailableProperties(): Promise<Property[]>;

  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getUserTransactions(userId: string): Promise<Transaction[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Map<string, Property>;
  private transactions: Map<string, Transaction>;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.transactions = new Map();
    this.seedData();
  }

  private seedData() {
    // Create sample properties
    const sampleProperties: InsertProperty[] = [
      {
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
        annualROI: "21.2"
      },
      {
        name: "Suburban Family Home",
        price: "175000",
        briksPrice: "11700",
        location: "Suburban Heights",
        propertyType: "Residential",
        income: "1450",
        demand: "72",
        rarity: "Common",
        imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&h=400&fit=crop",
        features: ["Family Friendly", "Large Yard", "Modern Kitchen", "2-Car Garage"],
        bedrooms: "4",
        bathrooms: "3",
        sqft: "1800",
        yearBuilt: "2015",
        monthlyIncome: "1450",
        annualROI: "15.8"
      },
      {
        name: "Industrial Warehouse",
        price: "750000",
        briksPrice: "50000",
        location: "Industrial Quarter",
        propertyType: "Industrial",
        income: "5200",
        demand: "95",
        rarity: "Epic",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
        features: ["High Ceiling", "Loading Docks", "Office Space", "Parking Lot"],
        sqft: "15000",
        yearBuilt: "2020",
        monthlyIncome: "5200",
        annualROI: "28.5"
      },
      {
        name: "Luxury Resort Property",
        price: "1200000",
        briksPrice: "80000",
        location: "Luxury Lane",
        propertyType: "Commercial",
        income: "8500",
        demand: "99",
        rarity: "Legendary",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
        features: ["Waterfront", "Spa Facilities", "Conference Rooms", "Restaurant", "Pool Complex"],
        sqft: "25000",
        yearBuilt: "2021",
        monthlyIncome: "8500",
        annualROI: "35.2"
      },
      {
        name: "Office Complex",
        price: "320000",
        briksPrice: "21300",
        location: "Downtown Core",
        propertyType: "Commercial",
        income: "2100",
        demand: "78",
        rarity: "Uncommon",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
        features: ["Modern Design", "Conference Rooms", "Parking Garage", "Security System"],
        sqft: "8500",
        yearBuilt: "2018",
        monthlyIncome: "2100",
        annualROI: "18.7"
      },
      {
        name: "Retail Shopping Center",
        price: "215000",
        briksPrice: "14300",
        location: "Suburban Heights",
        propertyType: "Commercial",
        income: "1850",
        demand: "88",
        rarity: "Common",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
        features: ["High Foot Traffic", "Anchor Stores", "Food Court", "Ample Parking"],
        sqft: "12000",
        yearBuilt: "2016",
        monthlyIncome: "1850",
        annualROI: "16.3"
      }
    ];

    sampleProperties.forEach(prop => {
      this.createProperty(prop);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id,
      walletAddress: insertUser.walletAddress || null,
      briksBalance: insertUser.briksBalance || "15000",
      hasCompletedTutorial: insertUser.hasCompletedTutorial || false,
      username: insertUser.username || null,
      netWorth: insertUser.netWorth || "0",
      rank: insertUser.rank || "999",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => property.ownerId === ownerId
    );
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = { 
      id,
      name: insertProperty.name,
      price: insertProperty.price,
      briksPrice: insertProperty.briksPrice,
      location: insertProperty.location,
      propertyType: insertProperty.propertyType,
      income: insertProperty.income,
      demand: insertProperty.demand,
      rarity: insertProperty.rarity,
      condition: insertProperty.condition || "100",
      imageUrl: insertProperty.imageUrl || null,
      features: insertProperty.features || null,
      bedrooms: insertProperty.bedrooms || null,
      bathrooms: insertProperty.bathrooms || null,
      sqft: insertProperty.sqft || null,
      yearBuilt: insertProperty.yearBuilt || null,
      monthlyIncome: insertProperty.monthlyIncome || null,
      annualROI: insertProperty.annualROI || null,
      ownerId: insertProperty.ownerId || null,
      listingDate: new Date()
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;
    
    const updatedProperty = { ...property, ...updates };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async getAvailableProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      property => !property.ownerId
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      id,
      userId: insertTransaction.userId,
      propertyId: insertTransaction.propertyId || null,
      type: insertTransaction.type,
      amount: insertTransaction.amount,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.userId === userId
    );
  }
}

export const storage = new MemStorage();
