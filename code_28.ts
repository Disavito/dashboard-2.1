const addressDataSchema = z.object({
  regionVivienda: z.string().optional().nullable(),
  provinciaVivienda: z.string().optional().nullable(),
  distritoVivienda: z.string().optional().nullable(),
  direccionVivienda: z.string().optional().nullable(),
  referenciaVivienda: z.string().optional().nullable(),
  mz: z.string().optional().nullable(),
  lote: z.string().optional().nullable(),
});
