import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye,
  Filter,
  Download
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

// Mock employee data
const mockEmployeesData = [
  {
    id: '1',
    code: 'EMP001',
    name: 'Ana María García',
    email: 'ana.garcia@empresa.com',
    department: 'Recursos Humanos',
    position: 'Gerente RRHH',
    status: 'active',
    startDate: '2022-03-15',
  },
  {
    id: '2',
    code: 'EMP002',
    name: 'Carlos Eduardo Ruiz',
    email: 'carlos.ruiz@empresa.com',
    department: 'Tecnología',
    position: 'Desarrollador Senior',
    status: 'active',
    startDate: '2021-08-01',
  },
  {
    id: '3',
    code: 'EMP003',
    name: 'María Fernanda López',
    email: 'maria.lopez@empresa.com',
    department: 'Finanzas',
    position: 'Analista Financiero',
    status: 'active',
    startDate: '2023-01-10',
  },
  {
    id: '4',
    code: 'EMP004',
    name: 'Pedro José Sánchez',
    email: 'pedro.sanchez@empresa.com',
    department: 'Ventas',
    position: 'Ejecutivo de Ventas',
    status: 'inactive',
    startDate: '2020-06-20',
  },
  {
    id: '5',
    code: 'EMP005',
    name: 'Laura Beatriz Martínez',
    email: 'laura.martinez@empresa.com',
    department: 'Marketing',
    position: 'Coordinadora Marketing',
    status: 'pending',
    startDate: '2024-01-15',
  },
];

const CapitalEmployees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees] = useState(mockEmployeesData);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = employees.filter((e) => e.status === 'active').length;
  const inactiveCount = employees.filter((e) => e.status === 'inactive').length;
  const pendingCount = employees.filter((e) => e.status === 'pending').length;

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getClass = () => {
      switch (status) {
        case 'active':
          return 'badge-active';
        case 'inactive':
          return 'badge-inactive';
        case 'pending':
          return 'badge-pending';
        default:
          return 'badge-inactive';
      }
    };

    const getLabel = () => {
      switch (status) {
        case 'active':
          return 'Activo';
        case 'inactive':
          return 'Inactivo';
        case 'pending':
          return 'Pendiente';
        default:
          return status;
      }
    };

    return <span className={getClass()}>{getLabel()}</span>;
  };

  return (
    <MainLayout title="Portal Empresarial" subtitle="">
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gestión de Empleados</h2>
            <p className="text-muted-foreground">Administra la información de tu equipo</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Empleado
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Empleados"
            value={employees.length}
            icon={Users}
          />
          <StatCard
            title="Activos"
            value={activeCount}
            icon={UserCheck}
          />
          <StatCard
            title="Inactivos"
            value={inactiveCount}
            icon={UserX}
          />
          <StatCard
            title="Pendientes"
            value={pendingCount}
            icon={Clock}
          />
        </div>

        {/* Table Card */}
        <div className="stat-card">
          {/* Table Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, código, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Ingreso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.code}</TableCell>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <StatusBadge status={employee.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(employee.startDate).toLocaleDateString('es-MX')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" />
                            Ver Detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="w-4 h-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron empleados con los criterios de búsqueda.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CapitalEmployees;
