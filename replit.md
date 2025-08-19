# Brick City - Virtual Real Estate Simulator

## Overview

Brick City is a Web3 virtual real estate simulation game that combines the classic charm of Monopoly with modern blockchain technology. Players can buy, sell, and manage virtual properties using $BRIKS tokens while building their real estate empire. The game features a comprehensive property marketplace (MLS), portfolio management, and social features like leaderboards and player rankings.

The application is built as a full-stack TypeScript project with a React frontend and Express backend, featuring real-time property transactions, wallet connectivity, and an engaging tutorial system for new players.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **State Management**: TanStack Query for server state management and API caching
- **Web3 Integration**: RainbowKit library for wallet connectivity and authentication
- **Tutorial System**: React Joyride for interactive product tours and onboarding

### Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API endpoints
- **Session Management**: Express sessions with PostgreSQL session storage
- **Development Server**: Custom Vite middleware integration for hot reloading
- **Error Handling**: Centralized error handling middleware with structured logging

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Three main entities - users, properties, and transactions
- **Connection**: Neon Database serverless PostgreSQL instance
- **Migrations**: Drizzle Kit for database schema migrations

### Authentication and Authorization
- **Web3 Authentication**: Wallet-based authentication using crypto wallet addresses
- **User Management**: Automatic user creation on first wallet connection
- **Session Handling**: Server-side session management with PostgreSQL store
- **Tutorial Tracking**: User progress tracking for onboarding completion

### Game Features and Components
- **Property System**: Virtual real estate with rarity levels, income generation, and market dynamics
- **Currency System**: $BRIKS tokens as the primary in-game currency
- **Portfolio Management**: Property ownership tracking, income calculation, and performance metrics
- **Market Dynamics**: Property listings, demand simulation, and price fluctuations
- **Player Progression**: Rankings, net worth calculation, and achievement tracking

### User Interface Design
- **Theme**: "Monopoly meets Bloomberg Terminal" aesthetic
- **Color Palette**: Deep green primary (#0B6623), cream cards (#F7F5E6), alert red (#C41E3A)
- **Typography**: Inter for UI text, Playfair Display for headings and branding
- **Layout**: Three-column dashboard design with responsive mobile support
- **Component Library**: Radix UI primitives with custom styling via Tailwind

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL for production data storage
- **Drizzle ORM**: Type-safe database operations and schema management
- **Connect-pg-simple**: PostgreSQL session store for Express sessions

### Frontend Libraries
- **TanStack Query**: Server state management and API caching
- **Wouter**: Lightweight routing solution
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date manipulation and formatting utilities
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

### Web3 Integration
- **RainbowKit**: Wallet connection and Web3 authentication interface
- **Wagmi**: React hooks for Ethereum interactions

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking across the stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations

### UI Components and Styling
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for component variant handling
- **Tailwind Merge**: Intelligent Tailwind class merging