import { MainLayout } from '@/components/layout/MainLayout';
import { usePermissions } from '@/contexts/PermissionsContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Gift, 
  Building2, 
  Wallet, 
  ArrowRight, 
  TrendingUp,
  CreditCard,
  Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { checkModuleAccess } = usePermissions();

  const hasBenefits = checkModuleAccess('benefits');
  const hasCapital = checkModuleAccess('capital');

  return (
    <MainLayout title="Portal Empresarial" subtitle="">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Bienvenido a Quoota
            </h2>
            <p className="text-muted-foreground mt-1">
              Gestiona los beneficios y recursos de tu empresa desde un solo lugar
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Último acceso:</span>
            <span className="font-medium text-foreground">Hoy, 10:30 AM</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Empleados Activos"
            value="1,234"
            icon={Users}
            trend={{ value: '+12%', positive: true }}
          />
          <StatCard
            title="Tarjetas Activas"
            value="1,198"
            icon={CreditCard}
          />
          <StatCard
            title="Saldo Total"
            value="$847,230"
            icon={Wallet}
            variant="primary"
          />
          <StatCard
            title="Transacciones Mes"
            value="3,456"
            icon={TrendingUp}
          />
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Benefits Module */}
          {hasBenefits && (
            <div className="stat-card group hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <Link to="/benefits/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2 group-hover:text-primary">
                    Ver módulo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Benefits</h3>
              <p className="text-muted-foreground mb-4">
                Gestiona el wallet empresarial, asigna fondos y administra las tarjetas de beneficios de tu equipo.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">Wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">Tarjetas</span>
                </div>
              </div>
            </div>
          )}

          {/* Capital Module */}
          {hasCapital && (
            <div className="stat-card group hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-secondary">
                  <Building2 className="w-6 h-6 text-secondary-foreground" />
                </div>
                <Link to="/capital/employees">
                  <Button variant="ghost" size="sm" className="gap-2 group-hover:text-primary">
                    Ver módulo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Capital</h3>
              <p className="text-muted-foreground mb-4">
                Administra la información de empleados, nómina y genera reportes de tu organización.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary-foreground"></div>
                  <span className="text-muted-foreground">Empleados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary-foreground"></div>
                  <span className="text-muted-foreground">Nómina</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary-foreground"></div>
                  <span className="text-muted-foreground">Reportes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="stat-card">
          <h3 className="font-semibold text-foreground mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/benefits/dashboard" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <Wallet className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Recargar Wallet</span>
            </Link>
            <Link 
              to="/capital/employees" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <Users className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Nuevo Empleado</span>
            </Link>
            <Link 
              to="/benefits/cards" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <CreditCard className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Solicitar Tarjeta</span>
            </Link>
            <Link 
              to="/capital/reports" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <Receipt className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Generar Reporte</span>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
