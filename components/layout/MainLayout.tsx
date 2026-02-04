'use client';

import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title, subtitle }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <PermissionsProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <div 
          className={cn(
            'transition-all duration-300',
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          )}
        >
          <Header title={title} subtitle={subtitle} />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </PermissionsProvider>
  );
};
