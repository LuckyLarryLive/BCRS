# Brick City Realty Sim 🏠

A Monopoly-inspired Web3 virtual real estate simulation game built with React, TypeScript, and Express. Players can buy, sell, and manage virtual properties using $BRIKS tokens while building their real estate empire.

![Brick City Screenshot](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&crop=entropy&auto=format&fm=webp)

## Features

### 🎮 Core Gameplay
- **Virtual Real Estate Trading** - Buy and sell properties in a dynamic marketplace
- **$BRIKS Token Economy** - In-game currency for all transactions
- **Property Portfolio Management** - Track your investments and income
- **Player Rankings & Leaderboard** - Compete with other players
- **Interactive Tutorial System** - Guided onboarding with React Joyride

### 🎨 Monopoly-Inspired Design
- Classic green, cream, and gold color scheme
- Property cards with detailed information
- Professional "Bloomberg Terminal meets Monopoly" aesthetic
- Responsive design for desktop and mobile

### 🛠 Technical Features
- **Full-Stack TypeScript** - Type-safe development across frontend and backend
- **Real-time Updates** - Hot reloading during development
- **Simulated Wallet Integration** - Ready for Web3 wallet integration
- **In-Memory Storage** - Fast development with easy database migration path

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for lightweight routing
- **TanStack Query** for server state management
- **Tailwind CSS** + **shadcn/ui** for styling
- **React Joyride** for interactive tutorials
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Zod** for schema validation
- **Session management** with Express sessions

### Development
- **Hot Module Replacement** (HMR)
- **TypeScript** strict mode
- **ESLint** for code quality
- **Replit** optimized development environment

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd brick-city-realty-sim
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## Project Structure

```
brick-city-realty-sim/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Landing, Dashboard, MLS, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory storage implementation
│   └── vite.ts            # Vite middleware integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schemas with Drizzle and Zod
└── package.json
```

## Game Flow

1. **Landing Page** - Connect your wallet to enter Brick City
2. **Tutorial** - Interactive guide for new players (skippable)
3. **Dashboard** - Overview of your portfolio and market stats
4. **MLS (Marketplace)** - Browse and purchase available properties
5. **Portfolio** - Manage your owned properties and track income
6. **Leaderboard** - See top players and your ranking

## Migration to Production

This prototype is designed for easy migration to a production environment:

### Recommended Production Stack
- **Frontend Hosting**: Vercel
- **Database**: Supabase (PostgreSQL)
- **Web3 Integration**: RainbowKit + Wagmi
- **Authentication**: Wallet-based auth

### Migration Steps

1. **Database Migration**
   - Replace in-memory storage with Supabase
   - Use existing Drizzle schemas
   - Run migrations with `drizzle-kit`

2. **Web3 Integration**
   - Replace simulated wallet with RainbowKit
   - Implement real token transactions
   - Add smart contract integration

3. **Deployment**
   - Deploy frontend to Vercel
   - Configure environment variables
   - Set up CI/CD pipeline

## Environment Variables

Create a `.env` file for production:

```env
# Database
DATABASE_URL=your_supabase_connection_string

# Web3 (for production)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_key

# Session Secret
SESSION_SECRET=your_session_secret
```

## API Endpoints

### Authentication
- `POST /api/auth/connect-wallet` - Connect wallet and create/login user
- `POST /api/auth/complete-tutorial` - Mark tutorial as completed

### Properties
- `GET /api/properties` - Get all available properties
- `POST /api/properties/:id/purchase` - Purchase a property

### Users
- `GET /api/users/:id` - Get user information
- `GET /api/users/:id/properties` - Get user's owned properties
- `GET /api/users/:id/transactions` - Get user's transaction history
- `POST /api/users/:id/add-briks` - Add $BRIKS to user's balance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Monopoly board game
- Built with modern Web3 and React technologies
- Designed for easy migration to production environments