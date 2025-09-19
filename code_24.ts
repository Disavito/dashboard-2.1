// ... dentro de la celda de 'acciones'
const missingDocs = requiredDocumentTypes.filter(docType => {
  const doc = socio.socio_documentos.find(d => d.tipo_documento === docType);
  // Un documento falta si no existe el registro O si existe pero no tiene link.
  return !doc || !doc.link_documento;
});
