import React from 'react';
import { Box, Typography } from '@strapi/design-system';

const ErrorPage = () => {
  return (
    <Box padding={8} background="neutral100">
      <Typography variant="alpha">404 - Página no encontrada</Typography>
      <Typography variant="omega">La ruta que intentaste acceder no existe.</Typography>
    </Box>
  );
};

export default ErrorPage;
