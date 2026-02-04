import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'assignment' | 'recharge' | 'payment';
  description: string;
  user?: string;
  amount: number;
  date: string;
  time: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  className,
}) => {
  const formatMoney = (amount: number) => {
    const formatted = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'assignment':
        return 'Asignación';
      case 'recharge':
        return 'Recarga';
      case 'payment':
        return 'Pago';
      default:
        return type;
    }
  };

  return (
    <div className={cn('stat-card', className)}>
      <h3 className="font-semibold text-foreground mb-4">Movimientos Recientes</h3>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{getTypeLabel(transaction.type)}</p>
              <p className="text-sm text-muted-foreground">
                {transaction.user || transaction.description}
              </p>
            </div>
            <div className="text-right">
              <p className={cn(
                'font-semibold',
                transaction.amount >= 0 ? 'money-positive' : 'money-negative'
              )}>
                {formatMoney(transaction.amount)}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.date}, {transaction.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
