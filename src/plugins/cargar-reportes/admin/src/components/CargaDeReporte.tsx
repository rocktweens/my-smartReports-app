import React, { useState } from 'react';
import { Box, Typography, Button } from '@strapi/design-system';

const CargaDeReporte = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('/api/cargar-reportes/upload-excel', {
        method: 'POST',
        body: formData,
      });
      alert('Archivo cargado correctamente.');
    } catch (err) {
      console.error('Error al subir archivo:', err);
      alert('Hubo un error al subir el archivo.');
    }
  };

  return (
    <Box padding={8} background="neutral100">
      <Typography variant="beta">Cargar reporte en Excel</Typography>

      <Box paddingTop={4}>
        <label htmlFor="excel-upload">
          <Typography variant="pi" fontWeight="bold">Seleccionar archivo Excel</Typography>
        </label>
        <input
          id="excel-upload"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginTop: '10px' }}
        />
      </Box>

      <Box paddingTop={4}>
        <Button onClick={handleSubmit} disabled={!file}>
          Subir archivo
        </Button>
      </Box>
    </Box>
  );
};

export default CargaDeReporte;
