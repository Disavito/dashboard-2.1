CREATE TABLE public.resource_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  role_id bigint NOT NULL, -- Cambiado a bigint para coincidir con public.roles.id
  resource_path text NOT NULL,
  can_access boolean DEFAULT true NOT NULL,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES public.roles (id)
    ON DELETE CASCADE
);

ALTER TABLE public.resource_permissions ENABLE ROW LEVEL SECURITY;

-- Permite a todos los usuarios autenticados leer los permisos de recursos.
-- Esto es seguro porque el frontend solo usará estos permisos para decidir qué mostrar/acceder.
CREATE POLICY "Enable read access for all users" ON public.resource_permissions
  FOR SELECT USING (true);

-- Permite solo a los usuarios con el rol 'admin' insertar nuevos permisos de recursos.
CREATE POLICY "Allow admin to insert resource permissions" ON public.resource_permissions
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_roles ur JOIN public.roles r ON ur.role_id = r.id WHERE ur.user_id = auth.uid() AND r.role_name = 'admin')
  );

-- Permite solo a los usuarios con el rol 'admin' actualizar permisos de recursos existentes.
CREATE POLICY "Allow admin to update resource permissions" ON public.resource_permissions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.user_roles ur JOIN public.roles r ON ur.role_id = r.id WHERE ur.user_id = auth.uid() AND r.role_name = 'admin')
  );

-- Asegúrate de que la tabla 'roles' ya existe y tiene una columna 'id' que es la clave primaria de tipo bigint.
