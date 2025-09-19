import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types'; // Import Database types

// Define a type for the actual structure returned by select('roles(id, role_name)')
// The query returns an array of objects, where each object has a 'roles' property,
// and that 'roles' property is an array of role objects.
type SupabaseUserRoleJoinResultItem = {
  roles: Database['public']['Tables']['roles']['Row'][];
};

interface UserContextType {
  user: User | null;
  roles: string[] | null;
  permissions: Set<string> | null; // Nuevo: Set de rutas de recursos a las que el usuario tiene acceso
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null);
  const [permissions, setPermissions] = useState<Set<string> | null>(null); // Inicializar como null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndRolesAndPermissions = async () => {
      setLoading(true);
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);

        if (authUser) {
          // 1. Obtener los roles del usuario, incluyendo el ID del rol
          const { data: userRolesData, error: userRolesError } = await supabase
            .from('user_roles')
            .select('roles(id, role_name)') // Seleccionar id y role_name
            .eq('user_id', authUser.id);

          if (userRolesError) throw userRolesError;

          // Explicitly cast the data to the new, more accurate type
          const typedUserRolesData: SupabaseUserRoleJoinResultItem[] = (userRolesData || []) as SupabaseUserRoleJoinResultItem[];

          // Now, when mapping, we need to iterate over the 'roles' array within each item
          const fetchedRoles = typedUserRolesData
            .flatMap(ur => ur.roles.map(role => role.role_name)) // Use flatMap to handle array of roles
            .filter(Boolean) as string[] || [];
          setRoles(fetchedRoles);

          // 2. Obtener los permisos de recursos basados en los roles del usuario
          if (fetchedRoles.length > 0) {
            const roleIds = typedUserRolesData
              .flatMap(ur => ur.roles.map(role => role.id)) // Use flatMap to get all role IDs
              .filter(Boolean) as number[];
            
            const { data: permissionsData, error: permissionsError } = await supabase
              .from('resource_permissions')
              .select('resource_path')
              .in('role_id', roleIds) // Usar los IDs de los roles para filtrar
              .eq('can_access', true);

            if (permissionsError) throw permissionsError;
            const fetchedPermissions = new Set(permissionsData?.map(p => p.resource_path) || []);
            // Asegurarse de que el dashboard principal siempre sea accesible si hay permisos
            if (fetchedPermissions.size > 0) {
              fetchedPermissions.add('/');
            }
            setPermissions(fetchedPermissions);
          } else {
            setPermissions(new Set()); // Si no hay roles, no hay permisos
          }

        } else {
          setRoles(null);
          setPermissions(null);
        }
      } catch (error) {
        console.error('Error fetching user, roles, or permissions:', error);
        setRoles(null);
        setPermissions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRolesAndPermissions();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserAndRolesAndPermissions(); // Volver a cargar roles y permisos al cambiar el estado de autenticación
      } else {
        setUser(null);
        setRoles(null);
        setPermissions(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, roles, permissions, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
