-- Este script inserta los permisos iniciales en la tabla resource_permissions,
-- mapeando tus políticas de RLS de backend a las rutas de frontend existentes.

INSERT INTO public.resource_permissions (role_id, resource_path, can_access)
VALUES
  -- Permisos para el rol 'admin' (Acceso completo a todas las rutas del dashboard)
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/', TRUE), -- Dashboard index
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/income', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/expenses', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/people', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/partner-documents', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/accounts', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin'), '/settings', TRUE), -- Admin puede acceder/gestionar la configuración

  -- Permisos para el rol 'admin_visual' (Solo lectura en tablas específicas)
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/', TRUE), -- Puede ver el dashboard
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/income', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/expenses', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/people', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/partner-documents', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/accounts', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'admin_visual'), '/settings', TRUE), -- Puede ver la configuración

  -- Permisos para el rol 'finanzas_junior'
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/', TRUE), -- Puede ver el dashboard
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/accounts', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/expenses', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/income', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_junior'), '/settings', TRUE), -- Puede ver la configuración

  -- Permisos para el rol 'finanzas_senior'
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/', TRUE), -- Puede ver el dashboard
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/accounts', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/expenses', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/income', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/people', TRUE), -- Solo lectura en socio_titulares
  ((SELECT id FROM public.roles WHERE role_name = 'finanzas_senior'), '/settings', TRUE), -- Puede ver la configuración

  -- Permisos para el rol 'engineer'
  ((SELECT id FROM public.roles WHERE role_name = 'engineer'), '/', TRUE), -- Puede ver el dashboard
  ((SELECT id FROM public.roles WHERE role_name = 'engineer'), '/partner-documents', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'engineer'), '/people', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'engineer'), '/settings', TRUE), -- Puede ver la configuración

  -- Permisos para el rol 'files'
  ((SELECT id FROM public.roles WHERE role_name = 'files'), '/', TRUE), -- Puede ver el dashboard
  ((SELECT id FROM public.roles WHERE role_name = 'files'), '/partner-documents', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'files'), '/settings', TRUE), -- Puede ver la configuración

  -- Permisos para el rol 'sales'
  ((SELECT id FROM public.roles WHERE role_name = 'sales'), '/', TRUE), -- Puede ver el dashboard
  ((SELECT id FROM public.roles WHERE role_name = 'sales'), '/people', TRUE),
  ((SELECT id FROM public.roles WHERE role_name = 'sales'), '/settings', TRUE); -- Puede ver la configuración
