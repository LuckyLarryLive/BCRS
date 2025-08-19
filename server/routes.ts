import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/connect-wallet", async (req, res) => {
    try {
      const { walletAddress } = req.body;
      
      if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address is required" });
      }

      let user = await storage.getUserByWallet(walletAddress);
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          walletAddress,
          username: `Player_${Math.floor(Math.random() * 10000)}`,
          briksBalance: "15000",
          hasCompletedTutorial: false,
          netWorth: "0",
          rank: "999"
        });
      }

      res.json(user);
    } catch (error) {
      console.error("Connect wallet error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/complete-tutorial", async (req, res) => {
    try {
      const { userId } = req.body;
      
      const user = await storage.updateUser(userId, { hasCompletedTutorial: true });
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Complete tutorial error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Property routes
  app.get("/api/properties", async (req, res) => {
    try {
      const { available } = req.query;
      
      let properties;
      if (available === 'true') {
        properties = await storage.getAvailableProperties();
      } else {
        properties = await storage.getAllProperties();
      }

      res.json(properties);
    } catch (error) {
      console.error("Get properties error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      console.error("Get property error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/users/:id/properties", async (req, res) => {
    try {
      const properties = await storage.getPropertiesByOwner(req.params.id);
      res.json(properties);
    } catch (error) {
      console.error("Get user properties error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/properties/:id/purchase", async (req, res) => {
    try {
      const { userId } = req.body;
      const propertyId = req.params.id;

      // Get property and user
      const property = await storage.getProperty(propertyId);
      const user = await storage.getUser(userId);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (property.ownerId) {
        return res.status(400).json({ message: "Property already owned" });
      }

      const briksPrice = Number(property.briksPrice);
      const currentBalance = Number(user.briksBalance);

      if (currentBalance < briksPrice) {
        return res.status(400).json({ message: "Insufficient $BRIKS balance" });
      }

      // Update property ownership
      await storage.updateProperty(propertyId, { ownerId: userId });

      // Update user balance
      const newBalance = currentBalance - briksPrice;
      await storage.updateUser(userId, { 
        briksBalance: newBalance.toString(),
        netWorth: (Number(user.netWorth) + Number(property.price)).toString()
      });

      // Create transaction
      await storage.createTransaction({
        userId,
        propertyId,
        type: "purchase",
        amount: briksPrice.toString()
      });

      res.json({ success: true, message: "Property purchased successfully" });
    } catch (error) {
      console.error("Purchase property error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/properties/:id/sell", async (req, res) => {
    try {
      const { userId } = req.body;
      const propertyId = req.params.id;

      const property = await storage.getProperty(propertyId);
      const user = await storage.getUser(userId);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (property.ownerId !== userId) {
        return res.status(400).json({ message: "You don't own this property" });
      }

      const salePrice = Number(property.briksPrice) * 0.9; // 10% loss on sale

      // Remove ownership
      await storage.updateProperty(propertyId, { ownerId: null });

      // Update user balance
      const newBalance = Number(user.briksBalance) + salePrice;
      await storage.updateUser(userId, { 
        briksBalance: newBalance.toString(),
        netWorth: (Number(user.netWorth) - Number(property.price)).toString()
      });

      // Create transaction
      await storage.createTransaction({
        userId,
        propertyId,
        type: "sale",
        amount: salePrice.toString()
      });

      res.json({ success: true, message: "Property sold successfully" });
    } catch (error) {
      console.error("Sell property error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
