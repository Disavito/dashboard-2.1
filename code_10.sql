INSERT INTO public.resource_permissions (role_id, resource_path, can_access)
VALUES
  -- Permisos para el rol 'admin' (Acceso completo a todas las rutas del dashboard)
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/colaboradores', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/cuentas', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/gastos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/ingresos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/perfiles', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/socios/documentos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/socios', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/roles', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/dashboard/user-roles', TRUE),

  -- Permisos para el rol 'admin_visual' (Solo lectura en tablas específicas)
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/dashboard/colaboradores', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/dashboard/cuentas', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/dashboard/gastos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/dashboard/ingresos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/dashboard/socios/documentos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/dashboard/socios', TRUE),

  -- Permisos para el rol 'finanzas_junior' (Acceso a cuentas, gastos, ingresos)
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/dashboard/cuentas', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/dashboard/gastos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/dashboard/ingresos', TRUE),

  -- Permisos para el rol 'finanzas_senior' (Acceso completo a finanzas, solo lectura en socios)
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/dashboard/cuentas', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/dashboard/gastos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/dashboard/ingresos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/dashboard/socios', TRUE),

  -- Permisos para el rol 'engineer' (Acceso completo a socios y documentos)
  ((SELECT id FROM public.roles WHERE role_name = 'engineer'), '/dashboard/socios/documentos', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'engineer'), '/dashboard/socios', TRUE),

  -- Permisos para el rol 'files' (Acceso completo a documentos de socios)
  ((SELECT id FROM public.roles WHERE role_name = 'files'), '/dashboard/socios/documentos', TRUE),

  -- Permisos para el rol 'sales' (Acceso completo a titulares de socios)
  ((SELECT id FROM public.roles WHERE role_name = 'sales'), '/dashboard/socios', TRUE);
