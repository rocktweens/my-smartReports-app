import React from 'react';
import {
  Box,
  Typography,
  Main,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import CargaDeReporte from '../components/CargaDeReporte';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Box
        title={formatMessage({
          id: getTranslation('plugin.name'),
          defaultMessage: 'Nombre del plugin',
        })}
      />

      <Main>
        <Box padding={6}>
          <Box spacing={4}>
            <Box background="neutral0" padding={6} hasRadius shadow="tableShadow">
              <Typography variant="beta" as="h2">
                Carga de Reportes
              </Typography>

              <Typography variant="pi" textColor="neutral600" marginTop={2} marginBottom={4}>
                Subí tus reportes en Excel para analizarlos
              </Typography>

              <CargaDeReporte />
            </Box>
          </Box>
        </Box>
      </Main>
    </>
  );
};

export { HomePage };
