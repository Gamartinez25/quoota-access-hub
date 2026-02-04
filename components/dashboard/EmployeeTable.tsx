'use client';

import { useState } from 'react';
import { Search, Plus, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Employee {
  id: string;
  code: string;
  name: string;
  benefitsCard: 'active' | 'inactive' | 'pending';
  benefitsStatus: 'active' | 'inactive' | 'pending';
  proCard: 'active' | 'inactive' | 'pending';
  proStatus: 'active' | 'inactive' | 'requested';
  balance: number;
}

interface EmployeeTableProps {
  employees: Employee[];
  onNewCard?: (employeeId: string) => void;
  onViewDetails?: (employeeId: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onNewCard,
  onViewDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getClass = () => {
      switch (status) {
        case 'active':
          return 'badge-active';
        case 'inactive':
          return 'badge-inactive';
        case 'pending':
        case 'requested':
          return 'badge-pending';
        default:
          return 'badge-inactive';
      }
    };

    const getLabel = () => {
      switch (status) {
        case 'active':
          return 'Activa';
        case 'inactive':
          return 'Inactiva';
        case 'pending':
          return 'Pendiente';
        case 'requested':
          return 'Solicitada';
        default:
          return status;
      }
    };

    return <span className={getClass()}>{getLabel()}</span>;
  };

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground text-lg">Cuentas de Empleados</h3>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar empleado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tarjeta Benefits</TableHead>
              <TableHead>Estado Benefits</TableHead>
              <TableHead>Tarjeta Pro</TableHead>
              <TableHead>Estado Pro</TableHead>
              <TableHead>Saldo Disponible</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.code}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>
                  <StatusBadge status={employee.benefitsCard} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={employee.benefitsStatus} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={employee.proCard} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={employee.proStatus} />
                </TableCell>
                <TableCell className="money-positive">
                  {formatMoney(employee.balance)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNewCard?.(employee.id)}
                      className="gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Nueva Tarjeta
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails?.(employee.id)}
                    >
                      Ver Detalle
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
