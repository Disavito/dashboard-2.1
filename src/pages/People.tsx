import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ColumnDef,
  Row,
} from '@tanstack/react-table';
import { ArrowUpDown, PlusCircle, Loader2, Edit, Trash2, Search, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { SocioTitular } from '@/lib/types';
import SocioTitularRegistrationForm from '@/components/custom/SocioTitularRegistrationForm';
import ConfirmationDialog from '@/components/ui-custom/ConfirmationDialog';
import { DataTable } from '@/components/ui-custom/DataTable';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';


function People() {
  const [socios, setSocios] = useState<SocioTitular[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [socioToDelete, setSocioToDelete] = useState<SocioTitular | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  // New state for locality filter
  const [uniqueLocalities, setUniqueLocalities] = useState<string[]>([]);
  const [selectedLocalidadFilter, setSelectedLocalidadFilter] = useState<string>('all'); // 'all' for no filter
  const [openLocalitiesFilterPopover, setOpenLocalitiesFilterPopover] = useState(false);

  // State for editing socio in a dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [socioToEdit, setSocioToEdit] = useState<SocioTitular | null>(null);

  // State for data displayed in the table, pre-filtered by locality
  const [displaySocios, setDisplaySocios] = useState<SocioTitular[]>([]);


  const fetchSocios = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('socio_titulares')
      .select('*')
      .order('apellidoPaterno', { ascending: true });

    if (error) {
      console.error('Error fetching socios:', error.message);
      setError('Error al cargar los socios. Por favor, inténtalo de nuevo.');
      setSocios([]);
      toast.error('Error al cargar socios', { description: error.message });
    } else {
      setSocios(data || []);
      setError(null);
    }
    setLoading(false);
  }, []);

  // Fetch unique localities for the filter dropdown
  const fetchUniqueLocalities = useCallback(async () => {
    const { data, error } = await supabase
      .from('socio_titulares')
      .select('localidad')
      .neq('localidad', '') // Exclude empty strings
      .order('localidad', { ascending: true });

    if (error) {
      console.error('Error fetching unique localities for filter:', error.message);
      toast.error('Error al cargar localidades para el filtro', { description: error.message });
    } else if (data) {
      const unique = Array.from(new Set(data.map(item => item.localidad))).filter(Boolean) as string[];
      setUniqueLocalities(['Todas las Comunidades', ...unique]); // Add 'All' option
    }
  }, []);

  useEffect(() => {
    const initFetch = async () => {
      try {
        await fetchSocios();
        await fetchUniqueLocalities();
      } catch (e: any) {
        console.error("Unhandled error during initial data fetch in People component:", e);
        setError(`Error crítico al cargar datos: ${e.message || 'Desconocido'}. Por favor, revisa tu conexión a Supabase y las variables de entorno.`);
        setLoading(false);
      }
    };
    initFetch();
  }, [fetchSocios, fetchUniqueLocalities]);

  // Effect to filter socios based on selectedLocalidadFilter before passing to DataTable
  useEffect(() => {
    let filtered = socios;
    if (selectedLocalidadFilter !== 'all') {
      filtered = socios.filter(socio => socio.localidad?.toLowerCase() === selectedLocalidadFilter.toLowerCase());
    }
    setDisplaySocios(filtered);
  }, [socios, selectedLocalidadFilter]);


  const handleDeleteSocio = async () => {
    if (!socioToDelete) return;

    setIsDeleting(true);
    const { error } = await supabase
      .from('socio_titulares')
      .delete()
      .eq('id', socioToDelete.id);

    if (error) {
      console.error('Error deleting socio:', error.message);
      toast.error('Error al eliminar socio', { description: error.message });
    } else {
      toast.success('Socio eliminado', { description: `El socio ${socioToDelete.nombres} ${socioToDelete.apellidoPaterno} ha sido eliminado.` });
      fetchSocios();
      setIsDeleteDialogOpen(false);
      setSocioToDelete(null);
    }
    setIsDeleting(false);
  };

  const columns: ColumnDef<SocioTitular>[] = useMemo(
    () => [
      {
        accessorKey: 'dni',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-text hover:text-primary"
          >
            DNI
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue('dni')}</div>,
      },
      {
        accessorKey: 'nombres',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-text hover:text-primary"
          >
            Nombres
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('nombres')}</div>,
      },
      {
        accessorKey: 'apellidoPaterno',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-text hover:text-primary"
          >
            Apellido Paterno
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('apellidoPaterno')}</div>,
      },
      {
        accessorKey: 'apellidoMaterno',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-text hover:text-primary"
          >
            Apellido Materno
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue('apellidoMaterno')}</div>,
      },
      {
        accessorKey: 'celular',
        header: 'Celular',
        cell: ({ row }) => <div>{row.getValue('celular') || 'N/A'}</div>,
      },
      {
        accessorKey: 'localidad',
        header: 'Localidad',
        cell: ({ row }) => <div>{row.getValue('localidad') || 'N/A'}</div>,
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const socio = row.original;
          return (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:bg-accent/10"
                onClick={() => {
                  setSocioToEdit(socio);
                  setIsEditDialogOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setSocioToDelete(socio);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  // Custom global filter function for DataTable (now only handles text search)
  const customGlobalFilterFn = useCallback((row: Row<SocioTitular>, _columnId: string, filterValue: any) => {
    const search = String(filterValue).toLowerCase();
    const socio = row.original;

    const dni = socio.dni?.toLowerCase() || '';
    const nombres = socio.nombres?.toLowerCase() || '';
    const apellidoPaterno = socio.apellidoPaterno?.toLowerCase() || '';
    const apellidoMaterno = socio.apellidoMaterno?.toLowerCase() || '';
    const celular = socio.celular?.toLowerCase() || '';
    const localidad = socio.localidad?.toLowerCase() || ''; // Keep locality in search for global text search

    return (
      dni.includes(search) ||
      nombres.includes(search) ||
      apellidoPaterno.includes(search) ||
      apellidoMaterno.includes(search) ||
      celular.includes(search) ||
      localidad.includes(search)
    );
  }, []); // No dependency on selectedLocalidadFilter anymore, as it's handled upstream

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text font-sans flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Cargando socios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-text font-sans flex items-center justify-center">
        <p className="text-destructive text-lg text-center p-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text font-sans p-6">
      <header className="relative h-48 md:h-64 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mb-8">
        <img
          src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Community building"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
            Gestión de Socios Titulares
          </h1>
          <p className="mt-2 text-lg md:text-xl text-white text-opacity-90 max-w-2xl mx-auto">
            Administra la información de todos los socios registrados.
          </p>
        </div>
      </header>

      <div className="container mx-auto py-10 bg-surface rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="relative flex items-center w-full max-w-md">
            <Search className="absolute left-3 h-5 w-5 text-textSecondary" />
            <Input
              placeholder="Buscar por DNI, nombre, apellido o celular..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border-border bg-background text-foreground focus:ring-primary focus:border-primary transition-all duration-300 w-full"
            />
          </div>

          {/* Locality Filter */}
          <Popover open={openLocalitiesFilterPopover} onOpenChange={setOpenLocalitiesFilterPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openLocalitiesFilterPopover}
                className="w-full md:w-[200px] justify-between rounded-lg border-border bg-background text-foreground hover:bg-muted/50 transition-all duration-300"
              >
                {selectedLocalidadFilter === 'all'
                  ? "Todas las Comunidades"
                  : uniqueLocalities.find(loc => loc.toLowerCase() === selectedLocalidadFilter.toLowerCase()) || selectedLocalidadFilter}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-card border-border rounded-xl shadow-lg">
              <Command>
                <CommandInput placeholder="Buscar comunidad..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No se encontró comunidad.</CommandEmpty>
                  <CommandGroup>
                    {uniqueLocalities.map((loc) => (
                      <CommandItem
                        value={loc}
                        key={loc}
                        onSelect={(currentValue) => {
                          setSelectedLocalidadFilter(currentValue === 'Todas las Comunidades' ? 'all' : currentValue);
                          setOpenLocalitiesFilterPopover(false);
                        }}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedLocalidadFilter === (loc === 'Todas las Comunidades' ? 'all' : loc) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {loc}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Dialog for New Socio Registration */}
          <Dialog open={isRegistrationDialogOpen} onOpenChange={setIsRegistrationDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 w-full md:w-auto">
                <PlusCircle className="h-5 w-5" />
                Registrar Nuevo Socio
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-card text-text border-border rounded-xl shadow-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-primary">Registrar Socio Titular</DialogTitle>
                <DialogDescription className="text-textSecondary">
                  Completa los datos para registrar un nuevo socio.
                </DialogDescription>
              </DialogHeader>
              <SocioTitularRegistrationForm
                onClose={() => setIsRegistrationDialogOpen(false)}
                onSuccess={() => {
                  setIsRegistrationDialogOpen(false);
                  fetchSocios();
                  fetchUniqueLocalities(); // Re-fetch localities after new registration
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          columns={columns}
          data={displaySocios} // Pass the pre-filtered data
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          customGlobalFilterFn={customGlobalFilterFn} // This now only handles text search
        />
      </div>

      {/* Dialog for Editing Socio */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] bg-card text-text border-border rounded-xl shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary">Editar Socio Titular</DialogTitle>
            <DialogDescription className="text-textSecondary">
              Actualiza los datos del socio existente.
            </DialogDescription>
          </DialogHeader>
          {socioToEdit && ( // Only render form if socioToEdit is available
            <SocioTitularRegistrationForm
              socioId={socioToEdit.id}
              onClose={() => {
                setIsEditDialogOpen(false);
                setSocioToEdit(null); // Clear socioToEdit when dialog closes
              }}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                setSocioToEdit(null); // Clear socioToEdit on success
                fetchSocios();
                fetchUniqueLocalities(); // Re-fetch localities after update
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteSocio}
        title="Confirmar Eliminación"
        description={`¿Estás seguro de que deseas eliminar al socio ${socioToDelete?.nombres} ${socioToDelete?.apellidoPaterno}? Esta acción no se puede deshacer.`}
        confirmButtonText="Eliminar"
        isConfirming={isDeleting}
        data={socioToDelete || {}}
      />
    </div>
  );
}

export default People;
