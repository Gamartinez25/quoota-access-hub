import { Wallet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WalletCardProps {
  totalBalance: number;
  assigned: number;
  reserved: number;
  available: number;
  onRecharge?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  totalBalance,
  assigned,
  reserved,
  available,
  onRecharge,
}) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="stat-card">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">Wallet Empresarial</h3>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Saldo Total</p>
            <p className="text-3xl font-bold text-primary">{formatMoney(totalBalance)}</p>
          </div>
          <Button onClick={onRecharge} className="gap-2">
            <Plus className="w-4 h-4" />
            Recargar
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Asignado</span>
          <span className="font-medium text-foreground">{formatMoney(assigned)}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Reservado</span>
          <span className="font-medium text-foreground">{formatMoney(reserved)}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-foreground">Disponible</span>
          <span className="font-semibold text-primary">{formatMoney(available)}</span>
        </div>
      </div>
    </div>
  );
};
