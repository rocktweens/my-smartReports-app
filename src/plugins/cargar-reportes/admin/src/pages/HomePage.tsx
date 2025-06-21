import React from 'react';
import {
  Box,
  Typography,
  Stack,
  ContentLayout,
  HeaderLayout,
  Main,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import CargaDeReporte from '../components/CargaDeReporte';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <HeaderLayout
        title={formatMessage({
          id: getTranslation('plugin.name'),
          defaultMessage: 'Nombre del plugin',
        })}
      />

      <Main>
        <ContentLayout>
          <Stack spacing={4}>
            <Box background="neutral0" padding={6} hasRadius shadow="tableShadow">
              <Typography variant="beta" as="h2">
                Carga de Reportes
              </Typography>

              <Typography variant="pi" textColor="neutral600" marginTop={2} marginBottom={4}>
                Subí tus reportes en Excel para analizarlos
              </Typography>

              <CargaDeReporte />
            </Box>
          </Stack>
        </ContentLayout>
      </Main>
    </>
  );
};

export { HomePage };
