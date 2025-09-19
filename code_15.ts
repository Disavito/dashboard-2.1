// src/components/custom/SocioTitularRegistrationForm.tsx
// ... (imports y otros códigos)

  const handleReniecSearch = useCallback(async () => {
    console.log('handleReniecSearch called');

    if (!watchedDni || watchedDni.length !== 8) {
      console.log('DNI invalid or not 8 digits:', watchedDni);
      toast.error('DNI inválido', { description: 'Por favor, ingresa un DNI de 8 dígitos.' });
      return;
    }

    setIsReniecSearching(true);
    console.log('setIsReniecSearching(true)');

    try {
      const token = import.meta.env.VITE_CONSULTAS_PERU_API_TOKEN;
      console.log('Reniec API Token:', token ? 'Loaded' : 'NOT LOADED');
      if (!token) {
        throw new Error('VITE_CONSULTAS_PERU_API_TOKEN no está configurado en el archivo .env');
      }

      const apiUrl = `https://api.consultasperu.com/api/v1/query?dni=${watchedDni}&token=${token}`;
      console.log('Reniec API URL:', apiUrl);

      const response = await axios.get(apiUrl);
      console.log('Reniec API Raw Response:', response);
      const data = response.data.data;
      console.log('Reniec API Parsed Data (response.data.data):', data);


      if (response.data && response.data.success && data) {
        console.log('Reniec API Success. Populating fields.');
        setValue('nombres', data.name || '');
        const surnames = data.surname ? data.surname.split(' ') : [];
        setValue('apellidoPaterno', surnames[0] || '');
        setValue('apellidoMaterno', surnames[1] || '');
        setValue('fechaNacimiento', data.date_of_birth || '');
        setValue('celular', '');
        setValue('direccionDNI', data.address || '');
        setValue('regionDNI', data.department || '');
        setValue('provinciaDNI', data.province || '');
        setValue('distritoDNI', data.district || '');
        setValue('localidad', data.district || ''); // Mapped to new 'localidad' field

        toast.success('Datos Reniec encontrados', { description: `Nombre: ${data.name} ${data.surname}` });
      } else {
        console.log('Reniec API No data found or unsuccessful response.');
        toast.warning('DNI no encontrado en Reniec', { description: response.data.message || 'No se encontraron datos para el DNI proporcionado.' });
        setValue('nombres', '');
        setValue('apellidoPaterno', '');
        setValue('apellidoMaterno', '');
        setValue('fechaNacimiento', '');
        setValue('edad', null);
        setValue('celular', '');
        setValue('direccionDNI', '');
        setValue('regionDNI', '');
        setValue('provinciaDNI', '');
        setValue('distritoDNI', '');
        setValue('localidad', ''); // Clear new 'localidad' field
      }
    } catch (error: any) {
      console.error('Error al consultar Reniec:', error);
      // Añadir log para la respuesta de error de Axios si está disponible
      if (axios.isAxiosError(error) && error.response) {
        console.error('Axios Error Response Data:', error.response.data);
        console.error('Axios Error Response Status:', error.response.status);
        console.error('Axios Error Response Headers:', error.response.headers);
      }
      toast.error('Error al consultar Reniec', { description: error.message || 'Hubo un problema al conectar con el servicio Reniec.' });
      setValue('nombres', '');
      setValue('apellidoPaterno', '');
      setValue('apellidoMaterno', '');
      setValue('fechaNacimiento', '');
      setValue('edad', null);
      setValue('celular', '');
      setValue('direccionDNI', '');
      setValue('regionDNI', '');
      setValue('provinciaDNI', '');
      setValue('distritoDNI', '');
      setValue('localidad', ''); // Clear new 'localidad' field
    } finally {
      setIsReniecSearching(false);
      console.log('setIsReniecSearching(false)');
    }
  }, [watchedDni, setValue]);

// ... (resto del código)
