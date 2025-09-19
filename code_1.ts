celular: z.string()
    .max(15, { message: 'El celular es demasiado largo.' })
    .optional()
    .nullable()
    .refine((val) => {
      if (val === null || val === undefined || val === '') {
        return true; // Permite null, undefined o cadena vacía
      }
      return /^\d+$/.test(val); // Aplica regex solo si hay un valor
    }, {
      message: 'El celular debe contener solo números si está presente.',
    }),
