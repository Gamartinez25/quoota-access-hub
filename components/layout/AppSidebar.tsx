'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gift, 
  Building2, 
  Users, 
  Receipt, 
  BarChart3, 
  Wallet, 
  CreditCard, 
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  Settings,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { usePermissions } from '@/contexts/PermissionsContext';
import { MODULE_CONFIG, ModuleType } from '@/types/permissions';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Gift,
  Building2,
  Users,
  Receipt,
  BarChart3,
  Wallet,
  CreditCard,
  ArrowLeftRight,
};

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname();
  const { permissions, checkModuleAccess } = usePermissions();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    benefits: true,
    capital: true,
  });

  const toggleModule = (module: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const isActive = (path: string) => pathname === path;
  const isModuleActive = (module: ModuleType) => pathname.startsWith(`/${module}`);

  const accessibleModules = Object.entries(MODULE_CONFIG).filter(
    ([key]) => checkModuleAccess(key as ModuleType)
  );

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50',
        collapsed ? 'w-16' : 'w-64'
      )}
      style={{ boxShadow: 'var(--shadow-sidebar)' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Q</span>
          </div>
          {!collapsed && (
            <span className="text-xl font-semibold text-sidebar-primary">Quoota</span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Label */}
      {!collapsed && (
        <div className="px-4 py-3">
          <span className="text-xs font-medium text-sidebar-muted uppercase tracking-wider">
            Navegación
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Dashboard Link */}
        <Link
          href="/"
          className={cn(
            'sidebar-nav-item mb-1',
            isActive('/') && 'active'
          )}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        {/* Dynamic Modules */}
        {accessibleModules.map(([moduleKey, config]) => {
          const modulePermission = permissions.modules.find(m => m.module === moduleKey);
          const accessibleSubmodules = modulePermission?.submodules || [];
          const ModuleIcon = iconMap[config.icon];
          const isExpanded = expandedModules[moduleKey];

          return (
            <div key={moduleKey} className="mb-1">
              {/* Module Header */}
              <button
                onClick={() => !collapsed && toggleModule(moduleKey)}
                className={cn(
                  'sidebar-nav-item w-full justify-between',
                  isModuleActive(moduleKey as ModuleType) && 'active'
                )}
              >
                <div className="flex items-center gap-3">
                  {ModuleIcon && <ModuleIcon className="w-5 h-5 flex-shrink-0" />}
                  {!collapsed && <span>{config.label}</span>}
                </div>
                {!collapsed && (
                  <span className="text-sidebar-muted">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                )}
              </button>

              {/* Submodules */}
              {!collapsed && isExpanded && (
                <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                  {accessibleSubmodules.map((subKey) => {
                    const subConfig = config.submodules[subKey];
                    if (!subConfig) return null;
                    const SubIcon = iconMap[subConfig.icon];

                    return (
                      <Link
                        key={subKey}
                        href={subConfig.path}
                        className={cn(
                          'sidebar-nav-item text-sm pl-6',
                          isActive(subConfig.path) && 'active'
                        )}
                      >
                        {SubIcon && <SubIcon className="w-4 h-4 flex-shrink-0" />}
                        <span>{subConfig.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <Link
          href="/settings"
          className="sidebar-nav-item"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Configuración</span>}
        </Link>
        <Link
          href="/profile"
          className="sidebar-nav-item"
        >
          <User className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Mi Perfil</span>}
        </Link>
        <button className="sidebar-nav-item w-full text-left hover:text-destructive">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};
