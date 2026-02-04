// Permission system types for Quoota

export type ModuleType = 'benefits' | 'capital';

export type BenefitsSubmodule = 'dashboard' | 'wallet' | 'cards' | 'transactions';
export type CapitalSubmodule = 'employees' | 'payroll' | 'reports';

export type SubmoduleType = BenefitsSubmodule | CapitalSubmodule;

export interface ModulePermission {
  module: ModuleType;
  submodules: SubmoduleType[];
}

export interface UserPermissions {
  userId: string;
  department: string;
  modules: ModulePermission[];
}

// Navigation item structure
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  children?: NavItem[];
}

// Module configuration
export const MODULE_CONFIG: Record<ModuleType, { label: string; icon: string; submodules: Record<string, { label: string; icon: string; path: string }> }> = {
  benefits: {
    label: 'Benefits',
    icon: 'Gift',
    submodules: {
      dashboard: { label: 'Dashboard', icon: 'LayoutDashboard', path: '/benefits/dashboard' },
      wallet: { label: 'Wallet Empresarial', icon: 'Wallet', path: '/benefits/wallet' },
      cards: { label: 'Tarjetas', icon: 'CreditCard', path: '/benefits/cards' },
      transactions: { label: 'Movimientos', icon: 'ArrowLeftRight', path: '/benefits/transactions' },
    },
  },
  capital: {
    label: 'Capital',
    icon: 'Building2',
    submodules: {
      employees: { label: 'Gestión Empleados', icon: 'Users', path: '/capital/employees' },
      payroll: { label: 'Nómina', icon: 'Receipt', path: '/capital/payroll' },
      reports: { label: 'Reportes', icon: 'BarChart3', path: '/capital/reports' },
    },
  },
};

// Mock user permissions - This would come from backend
export const MOCK_USER_PERMISSIONS: UserPermissions = {
  userId: 'user-001',
  department: 'Recursos Humanos',
  modules: [
    {
      module: 'benefits',
      submodules: ['dashboard', 'wallet', 'cards', 'transactions'],
    },
    {
      module: 'capital',
      submodules: ['employees', 'payroll', 'reports'],
    },
  ],
};

// Helper function to check module access
export const hasModuleAccess = (permissions: UserPermissions, module: ModuleType): boolean => {
  return permissions.modules.some((m) => m.module === module);
};

// Helper function to check submodule access
export const hasSubmoduleAccess = (permissions: UserPermissions, module: ModuleType, submodule: SubmoduleType): boolean => {
  const modulePermission = permissions.modules.find((m) => m.module === module);
  return modulePermission?.submodules.includes(submodule) ?? false;
};
