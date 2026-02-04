# Quoota Access Hub - Enterprise Portal

A modern enterprise portal built with Next.js 16, React 19, and shadcn/ui for managing benefits and capital resources.

## Project Info

**Repository**: Gamartinez25/quoota-access-hub

## Technology Stack

This project uses:

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **shadcn/ui** - High-quality UI components
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd quoota-access-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
quoota-access-hub/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   ├── benefits/                 # Benefits module routes
│   │   └── dashboard/page.tsx
│   └── capital/                  # Capital module routes
│       └── employees/page.tsx
├── components/
│   ├── layout/                   # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── AppSidebar.tsx
│   │   └── Header.tsx
│   ├── dashboard/                # Dashboard components
│   │   ├── StatCard.tsx
│   │   ├── WalletCard.tsx
│   │   ├── RecentTransactions.tsx
│   │   └── EmployeeTable.tsx
│   └── ui/                       # shadcn/ui components
├── contexts/
│   └── PermissionsContext.tsx    # Permissions management
├── types/
│   └── permissions.ts            # Type definitions
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

## Features

- **Benefits Module**: Manage corporate wallet, fund allocation, and benefits cards
- **Capital Module**: Employee management, payroll, and reporting
- **Role-based Access**: Permission system for module and submodule access
- **Responsive Design**: Mobile-first responsive interface
- **Dark Mode Ready**: Built with dark mode support

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Variables

Create a `.env.local` file in the root directory for local development:

```
# Add environment variables here
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your application will be deployed automatically on every push to main

## Module Access

The application uses a permission system to control access to different modules:

- **Benefits Module**: Dashboard, Wallet, Cards, Transactions
- **Capital Module**: Employees, Payroll, Reports

User permissions are managed through the `PermissionsContext` and can be updated based on user roles.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is private and confidential.

