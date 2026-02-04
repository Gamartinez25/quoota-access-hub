import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WalletCard } from '@/components/dashboard/WalletCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { EmployeeTable } from '@/components/dashboard/EmployeeTable';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowUpRight, CreditCard, Plus } from 'lucide-react';

// Mock data
const mockTransactions = [
  {
    id: '1',
    type: 'assignment' as const,
    description: 'Asignación',
    user: 'Ana García',
    amount: 500,
    date: 'Hoy',
    time: '10:30',
  },
  {
    id: '2',
    type: 'assignment' as const,
    description: 'Asignación',
    user: 'Carlos Ruiz',
    amount: 300,
    date: 'Hoy',
    time: '09:15',
  },
  {
    id: '3',
    type: 'recharge' as const,
    description: 'Cuenta Principal',
    amount: 50000,
    date: 'Ayer',
    time: '16:45',
  },
];

const mockEmployees = [
  {
    id: '1',
    code: 'E001',
    name: 'Ana García',
    benefitsCard: 'active' as const,
    benefitsStatus: 'active' as const,
    proCard: 'inactive' as const,
    proStatus: 'inactive' as const,
    balance: 1250,
  },
  {
    id: '2',
    code: 'E002',
    name: 'Carlos Ruiz',
    benefitsCard: 'active' as const,
    benefitsStatus: 'active' as const,
    proCard: 'active' as const,
    proStatus: 'requested' as const,
    balance: 890,
  },
  {
    id: '3',
    code: 'E003',
    name: 'María López',
    benefitsCard: 'active' as const,
    benefitsStatus: 'active' as const,
    proCard: 'pending' as const,
    proStatus: 'requested' as const,
    balance: 2100,
  },
  {
    id: '4',
    code: 'E004',
    name: 'Pedro Sánchez',
    benefitsCard: 'inactive' as const,
    benefitsStatus: 'inactive' as const,
    proCard: 'inactive' as const,
    proStatus: 'inactive' as const,
    balance: 0,
  },
];

const BenefitsDashboard = () => {
  return (
    <MainLayout title="Portal Empresarial" subtitle="">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Benefits</h2>
            <p className="text-muted-foreground">Gestión de wallet empresarial y asignaciones</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Asignar Fondos
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Saldo Cuenta Principal"
            value="$847,230"
            icon={Wallet}
            variant="primary"
          />
          <StatCard
            title="Disponible para Asignar"
            value="$623,100"
            icon={ArrowUpRight}
          />
          <StatCard
            title="Tarjetas Activas"
            value="1,198"
            icon={CreditCard}
          />
        </div>

        {/* Wallet and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WalletCard
            totalBalance={847230}
            assigned={224130}
            reserved={0}
            available={623100}
          />
          <RecentTransactions transactions={mockTransactions} />
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={mockEmployees}
          onNewCard={(id) => console.log('New card for:', id)}
          onViewDetails={(id) => console.log('View details:', id)}
        />
      </div>
    </MainLayout>
  );
};

export default BenefitsDashboard;
