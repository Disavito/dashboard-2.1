import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Wallet,
  ChevronLeft,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  UserCheck,
  Settings as SettingsIcon,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui-custom/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabaseClient';

const navItems = [
  { name: 'Resumen', path: '/', icon: LayoutDashboard },
  { name: 'Ingresos', path: '/income', icon: ArrowUpCircle },
  { name: 'Gastos', path: '/expenses', icon: ArrowDownCircle },
  { name: 'Titulares', path: '/people', icon: UserCheck },
  { name: 'Documentos', path: '/partner-documents', icon: FolderOpen },
  { name: 'Cuentas', path: '/accounts', icon: Wallet },
  { name: 'Configuración', path: '/settings', icon: SettingsIcon },
];

function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, roles, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        Cargando...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full rounded-lg border-none">
          <ResizablePanel
            defaultSize={isCollapsed ? 5 : 20}
            minSize={isCollapsed ? 5 : 15}
            maxSize={isCollapsed ? 5 : 25}
            collapsible={true}
            onCollapse={() => setIsCollapsed(true)}
            onExpand={() => setIsCollapsed(false)}
            className={cn(
              'flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out',
              isCollapsed && 'min-w-[50px] md:min-w-[70px]'
            )}
          >
            <div className="flex items-center justify-center h-16 border-b border-border px-4">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary animate-fade-in">
                <Wallet className="h-7 w-7 text-accent" />
                {!isCollapsed && <span className="transition-opacity duration-300">FinDash</span>}
              </Link>
            </div>
            <ScrollArea className="flex-1 py-4">
              <nav className="grid items-start gap-2 px-4">
                {navItems.map((item) => (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-textSecondary transition-all hover:bg-primary/20 hover:text-primary',
                          location.pathname === item.path && 'bg-primary/30 text-primary font-medium',
                          isCollapsed && 'justify-center'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span className="transition-opacity duration-300">{item.name}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right" className="bg-card text-foreground border-border shadow-lg">{item.name}</TooltipContent>}
                  </Tooltip>
                ))}
              </nav>
            </ScrollArea>
            <div className="p-4 border-t border-border flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="rounded-full hover:bg-accent/20 transition-all duration-300"
              >
                {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                <span className="sr-only">{isCollapsed ? 'Expandir' : 'Colapsar'} sidebar</span>
              </Button>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-border hover:bg-primary transition-colors duration-300" />
          <ResizablePanel defaultSize={80} className="flex flex-col">
            <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-sm">
              <h1 className="text-2xl font-bold text-foreground animate-fade-in-up">
                {navItems.find(item => location.pathname.startsWith(item.path) && item.path !== '/')?.name || navItems.find(item => item.path === '/')?.name || 'Dashboard'}
              </h1>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent/20 transition-all duration-300">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="User Avatar" />
                        <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-card border-border rounded-lg shadow-lg" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.email || 'Usuario'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          Roles: {roles?.join(', ') || 'N/A'}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem className="hover:bg-muted/50 cursor-pointer">
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-muted/50 cursor-pointer">
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem
                      className="hover:bg-destructive/20 text-destructive cursor-pointer"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        navigate('/auth');
                      }}
                    >
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6 bg-background">
              <Outlet />
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
}

export default DashboardLayout;
