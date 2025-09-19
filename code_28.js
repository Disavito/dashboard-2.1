await supabase.functions.invoke('subir_documento_drive', {
          body: formData,
          headers: {
            'x-socio-id': String(socioId),
            'x-document-type': documentType,
          },
        });
        ```

3.  **Procesamiento en el Backend (La Magia):**
    *   La Edge Function `subir_documento_drive` se ejecuta de forma segura en los servidores de Supabase. Esta función contiene la lógica y las credenciales seguras para conectarse a la API de Google Drive.
    *   Recibe el archivo, el `socioId` y el `documentType`.
    *   Utiliza la API de Google Drive para subir el archivo a una carpeta específica (probablemente organizada por socio o DNI para mantener el orden).

4.  **Obtención del Enlace y Actualización de la Base de Datos:**
    *   Una vez que Google Drive confirma que el archivo se ha subido correctamente, devuelve un enlace para compartir o visualizar ese archivo.
    *   La Edge Function toma ese enlace.
    *   Finalmente, la función actualiza la tabla `socio_documentos` en tu base de datos de Supabase. Busca el registro que coincida con el `socio_id` y el `tipo_documento` y guarda el nuevo enlace de Google Drive en la columna `link_documento`.

5.  **Respuesta al Frontend:**
    *   La función devuelve un mensaje de éxito a tu aplicación React, que es cuando ves el toast de "Documento subido con éxito" y la tabla se actualiza.

### En Resumen (Diagrama Simplificado):
