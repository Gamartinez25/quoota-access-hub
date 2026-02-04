import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: 'default' | 'primary';
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  variant = 'default',
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        variant === 'primary' ? 'stat-card-primary' : 'stat-card',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn(
            'text-sm font-medium mb-1',
            variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn(
            'text-2xl font-bold',
            variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
          )}>
            {value}
          </p>
          {trend && (
            <p className={cn(
              'text-sm mt-2',
              trend.positive ? 'text-success' : 'text-destructive'
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            'p-2 rounded-lg',
            variant === 'primary' ? 'bg-primary-foreground/10' : 'bg-muted'
          )}>
            <Icon className={cn(
              'w-5 h-5',
              variant === 'primary' ? 'text-primary-foreground' : 'text-muted-foreground'
            )} />
          </div>
        )}
      </div>
    </div>
  );
};
