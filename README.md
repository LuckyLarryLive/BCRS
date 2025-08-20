# Brick City Realty Sim (BCRS) 🏗️
## The Future of Virtual Real Estate Economics

**Brick City Realty Sim** is not just a game—it's a sophisticated, player-owned virtual economy designed for long-term sustainability and deep strategic play. Built on the "Play-and-Own" philosophy, BCRS prioritizes a robust economic simulation over simple, inflationary "Play-to-Earn" mechanics.

![Brick City Realty Sim](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&crop=entropy&auto=format&fm=webp)

## 🎯 The Vision: Three Core Pillars

### 1. Real-World Economic Anchor
The game's economy is psychologically anchored to a **1000:1 ratio** (e.g., a "100,000" in-game property corresponds to $100 USD in value). This makes the simulation intuitive and the value of assets tangible.

### 2. Deep Strategic Gameplay
Success in BRIKS requires active management, risk assessment, and market analysis. Players are not just collecting rent; they are building and managing a business empire.

### 3. Sustainable Player-Owned Economy
Built on a dual-token system with robust economic sinks to ensure long-term stability, prevent hyperinflation, and allow genuine career paths to emerge for dedicated players.

## 🎮 Core Mechanics & Player Progression

Success in Brick City Realty Sim requires active management, risk assessment, and market analysis. Players progress through three distinct tiers:

### Tier 1: The Safe Zone (Onboarding)
- **Mechanics**: Immune to catastrophic events ("Storms")
- **Properties**: Stable but low ROI
- **Goal**: Learn maintenance, MLS navigation, accumulate 3+ properties
- **Unlock**: Access to higher risk tiers

### Tier 2: The Risk Zones (Mid-Game)
- **Unlock Requirement**: 3+ properties owned
- **Mechanics**: Subject to "Pending Storms" with warning systems
- **Properties**: Higher potential ROI requiring active risk management
- **Features**: Multi-tiered insurance system, countdown timers

### Tier 3: The High-Stakes Zone (End-Game)
- **Unlock Requirement**: Veteran player status
- **Mechanics**: Extreme risk/reward with complex challenges
- **Events**: "Zoning Laws," "Union Strikes," advanced economic sinks
- **Features**: Unique property attributes and event systems

## 💰 The Economic Engine

### The Faucet (Currency Creation)
- **Rental Income**: Properties generate daily yield of $BRIKS tokens

### The Sinks (Currency Destruction)
1. **Property Depreciation**: Daily condition decay requiring $BRIKS maintenance
2. **Property Management**: Manager salaries for portfolio expansion beyond soft caps
3. **Insurance System**: Weekly premiums for storm protection (risk-based)
4. **Financed Properties**: Automatic mortgage payments from rental income
5. **Competitions & Events**: Tournament entry fees with partial token burns

### Dual-Token System
- **$BRIKS (Utility Token)**: In-game currency for all transactions and economic activity
- **$MOGUL (Governance Token)**: Fixed-supply governance token with staking functionality

## 🔗 Web3 Integration

### Wallet Onboarding
- **Primary Path**: Embedded wallet solution (Web3Auth/Magic.link) for seamless email/social login
- **Secondary Path**: Native Web3 wallet connection (MetaMask, Phantom)
- **Non-custodial**: Automatic wallet creation and management behind the scenes

### Blockchain Assets
- **Property NFTs**: ERC-721 tokens with dynamic metadata reflecting in-game changes
- **Token Contracts**: Standard ERC-20 implementation for both $BRIKS and $MOGUL
- **Fiat On-Ramp**: Integrated MoonPay/Ramp Network for credit card-to-$BRIKS conversion

## 🛠 Tech Stack

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
- **Economic Dashboard**: Real-time token tracking and economic monitoring
- **Event Engine**: Robust system for scheduling global events and storms

### Web3 Infrastructure
- **Smart Contracts**: ERC-20 tokens and ERC-721 NFTs
- **Wallet Integration**: Web3Auth, Magic.link, MetaMask support
- **DEX Integration**: Liquidity pools for $BRIKS trading
- **Fiat On-Ramp**: MoonPay/Ramp Network integration

## 🎨 Design Philosophy

### UI/UX Approach
- **Fintech Aesthetic**: Clean, professional interface resembling modern fintech apps (Robinhood, Wealthfront)
- **Data-Rich**: Clarity of information is paramount over gamification
- **Professional Tone**: Players are "investors," "moguls," and "business owners"

### Core Features
- **Economic Dashboard**: Real-time monitoring of token creation vs. destruction rates
- **MLS & Agent Logic**: Sophisticated marketplace with AI-driven seller agents
- **Data Visualization**: Leaderboards, ROI calculators, portfolio performance charts
- **Adjustable Economic Levers**: Configurable parameters via admin panel (not hard-coded)

## 🚀 The Genesis Launch Plan

### Phase 1: The Snapshot
- Capture existing player "Cash" balances and property inventories
- Establish fixed Genesis Exchange Rate (e.g., 50 "Cash" = 1 $BRIKS)

### Phase 2: The Airdrop & Free Mint
- Existing players mint properties as "Genesis" NFTs for free
- Cash balances converted to $BRIKS and airdropped to connected wallets

### Phase 3: The IDO (CreatorBid Launch)
- Initial public sale of $BRIKS to new investors and players
- Establish initial liquidity pools on DEX

### Phase 4: Go-Live
- Full game launch with all economic activity in $BRIKS
- Public access to the complete virtual economy

## 🛠 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LuckyLarryLive/BCRS.git
   cd BCRS
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

## 📁 Project Structure

```
BCRS/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Landing, Dashboard, MLS, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Economic engine and storage
│   └── vite.ts            # Vite middleware integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schemas with Drizzle and Zod
├── contracts/             # Smart contracts (future)
│   ├── BRIKS.sol         # $BRIKS utility token
│   ├── MOGUL.sol         # $MOGUL governance token
│   └── PropertyNFT.sol   # Property NFT contract
└── package.json
```

## 🎯 Player Journey

### Tier 1: Safe Zone Onboarding
1. **Wallet Connection** - Seamless onboarding via embedded wallet or Web3 wallet
2. **Tutorial System** - Learn maintenance, MLS navigation, and basic economics
3. **First Properties** - Acquire 3+ properties in storm-immune safe zones
4. **Economic Education** - Understand depreciation, maintenance, and rental income

### Tier 2: Risk Zone Progression
5. **Risk Management** - Navigate "Pending Storms" with insurance strategies
6. **Portfolio Expansion** - Scale beyond soft caps with manager hiring
7. **Market Analysis** - Develop skills in property valuation and timing
8. **Strategic Planning** - Balance risk/reward across property portfolio

### Tier 3: High-Stakes Mastery
9. **Advanced Challenges** - Handle complex events like zoning laws and strikes
10. **Economic Leadership** - Influence market dynamics and mentor new players
11. **Governance Participation** - Use $MOGUL tokens for platform governance
12. **Career Development** - Establish sustainable income streams and business empire

## 🔧 Critical Systems Requirements

### Economic Dashboard (Internal Tool)
Real-time monitoring and control system for Brick City Realty Sim tracking:
- **Faucet vs. Sink Rates**: Tokens created vs. tokens destroyed
- **Circulating Supply**: Total $BRIKS in circulation
- **Wealth Distribution**: Player asset distribution and Gini coefficient
- **Economic Health**: Key performance indicators and alerts

### Adjustable Economic Levers
Configurable parameters via admin panel (never hard-coded):
- Depreciation rates and maintenance costs
- Manager salaries and hiring thresholds
- Insurance premiums and payout rates
- Primary sale prices for new properties
- Event frequency and impact severity

### Event Engine
Robust system for scheduling and executing:
- **Pending Storms**: Tier 2+ property threats with warning systems
- **Market Events**: Economic cycles, crashes, and booms
- **Tournaments**: Weekly competitions with entry fees and prizes
- **Special Events**: Zoning laws, union strikes, regulatory changes

## 🚀 Production Migration Path

### Phase 1: Infrastructure Setup
- **Frontend Hosting**: Vercel deployment
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
- **Web3 Infrastructure**: Smart contract deployment
- **Wallet Integration**: Web3Auth + RainbowKit implementation

### Phase 2: Economic Engine
- **Token Contracts**: Deploy $BRIKS and $MOGUL contracts
- **NFT System**: Property NFT contract with dynamic metadata
- **DEX Integration**: Establish liquidity pools
- **Fiat On-Ramp**: MoonPay/Ramp Network integration

### Phase 3: Genesis Launch
- **Snapshot System**: Capture existing player data
- **Migration Tools**: Convert legacy assets to blockchain
- **Airdrop Mechanism**: Distribute $BRIKS to existing players
- **IDO Platform**: CreatorBid launch integration

## 🔐 Environment Variables

```env
# Database
DATABASE_URL=your_supabase_connection_string

# Web3 Infrastructure
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_key
NEXT_PUBLIC_BRIKS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MOGUL_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_PROPERTY_NFT_CONTRACT_ADDRESS=0x...

# Fiat On-Ramp
MOONPAY_API_KEY=your_moonpay_key
RAMP_API_KEY=your_ramp_key

# Economic Dashboard
ADMIN_DASHBOARD_SECRET=your_admin_secret
ECONOMIC_ALERTS_WEBHOOK=your_webhook_url

# Session & Security
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
```

## 📡 API Endpoints

### Authentication & Wallet
- `POST /api/auth/connect-wallet` - Connect wallet and create/login user
- `POST /api/auth/complete-tutorial` - Mark tutorial as completed
- `GET /api/auth/wallet-balance` - Get user's $BRIKS and $MOGUL balance

### Properties & NFTs
- `GET /api/properties` - Get all available properties with tier filtering
- `POST /api/properties/:id/purchase` - Purchase a property (with financing options)
- `PUT /api/properties/:id/maintain` - Spend $BRIKS on property maintenance
- `POST /api/properties/:id/insure` - Purchase insurance for property
- `GET /api/properties/:id/condition` - Get current property condition and depreciation

### Economic Engine
- `GET /api/economy/dashboard` - Real-time economic metrics (admin only)
- `POST /api/economy/adjust-levers` - Modify economic parameters (admin only)
- `GET /api/economy/token-stats` - Public token circulation and burn statistics
- `POST /api/events/trigger-storm` - Manually trigger storm event (admin only)

### Users & Portfolio
- `GET /api/users/:id` - Get user information and tier status
- `GET /api/users/:id/properties` - Get user's owned properties with performance data
- `GET /api/users/:id/transactions` - Get user's transaction history
- `POST /api/users/:id/hire-manager` - Hire property manager for portfolio expansion
- `GET /api/leaderboard` - Get player rankings and wealth distribution

### MLS & Marketplace
- `GET /api/mls/listings` - Get available properties with AI agent pricing
- `POST /api/mls/offer` - Submit offer on property through agent system
- `GET /api/mls/market-data` - Get market trends and property valuations

## 🎯 Development Roadmap

### Phase 1: Core Economic Engine ✅
- [x] Basic property system with depreciation
- [x] $BRIKS token economy foundation
- [x] Simple maintenance mechanics
- [ ] Multi-tier property system (Safe/Risk/High-Stakes zones)
- [ ] Insurance system implementation
- [ ] Manager hiring system

### Phase 2: Web3 Integration 🚧
- [ ] Smart contract development ($BRIKS, $MOGUL, PropertyNFT)
- [ ] Wallet integration (Web3Auth + MetaMask)
- [ ] Fiat on-ramp integration
- [ ] NFT minting and dynamic metadata

### Phase 3: Advanced Features 📋
- [ ] Storm event system with warnings
- [ ] Economic dashboard and admin tools
- [ ] Tournament and competition system
- [ ] Advanced property challenges (zoning, strikes)

### Phase 4: Genesis Launch 🚀
- [ ] Legacy data migration tools
- [ ] Airdrop and free mint system
- [ ] IDO integration (CreatorBid)
- [ ] Public launch and marketing

## 🤝 Contributing

We welcome contributions to the Brick City Realty Sim ecosystem! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Follow the economic principles** outlined in this README
3. **Test thoroughly** - economic changes can have far-reaching effects
4. **Document your changes** - especially any modifications to economic parameters
5. **Submit a Pull Request** with detailed description of changes

### Development Guidelines
- Maintain the 1000:1 real-world economic anchor
- Ensure all economic changes are configurable, not hard-coded
- Prioritize player-owned economy sustainability
- Follow the fintech-inspired UI/UX principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vision**: Building the most realistic virtual real estate market in the world
- **Philosophy**: Player-owned economy with sustainable tokenomics
- **Technology**: Modern Web3 stack with emphasis on user experience
- **Community**: Dedicated to creating genuine career paths for players

---

**Welcome to Brick City Realty Sim - Where Virtual Real Estate Meets Real Economics** 🏗️