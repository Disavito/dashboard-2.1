CREATE TABLE public.resource_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  role_id integer NOT NULL,
  resource_path text NOT NULL,
  can_access boolean DEFAULT true NOT NULL,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES public.roles (id)
    ON DELETE CASCADE
);

ALTER TABLE public.resource_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.resource_permissions
  FOR SELECT USING (true);

-- Opcional: Si quieres que solo los administradores puedan insertar/actualizar permisos
CREATE POLICY "Allow admin to insert resource permissions" ON public.resource_permissions
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Allow admin to update resource permissions" ON public.resource_permissions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Asegúrate de que la tabla 'roles' ya existe y tiene una columna 'id' que es la clave primaria.
-- Si tu tabla 'roles' usa 'role_name' como PK, necesitarás ajustar la FK.
-- Asumo que 'roles.id' es la PK.
