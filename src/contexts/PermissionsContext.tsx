import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  UserPermissions, 
  ModuleType, 
  SubmoduleType, 
  MOCK_USER_PERMISSIONS,
  hasModuleAccess,
  hasSubmoduleAccess 
} from '@/types/permissions';

interface PermissionsContextType {
  permissions: UserPermissions;
  checkModuleAccess: (module: ModuleType) => boolean;
  checkSubmoduleAccess: (module: ModuleType, submodule: SubmoduleType) => boolean;
  updatePermissions: (newPermissions: UserPermissions) => void;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<UserPermissions>(MOCK_USER_PERMISSIONS);

  const checkModuleAccess = (module: ModuleType): boolean => {
    return hasModuleAccess(permissions, module);
  };

  const checkSubmoduleAccess = (module: ModuleType, submodule: SubmoduleType): boolean => {
    return hasSubmoduleAccess(permissions, module, submodule);
  };

  const updatePermissions = (newPermissions: UserPermissions) => {
    setPermissions(newPermissions);
  };

  return (
    <PermissionsContext.Provider 
      value={{ 
        permissions, 
        checkModuleAccess, 
        checkSubmoduleAccess, 
        updatePermissions 
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
