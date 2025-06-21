import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import CargaDeReporte from '../components/CargaDeReporte';

const HomePage2 = () => {
  const { formatMessage } = useIntl();

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack align="start" spaceX={6}>
        <Heading as="h1" size="lg">
          {formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Nombre del plugin' })}
        </Heading>

        <Box bg="white" p={6} rounded="md" shadow="md" w="100%">
          <Heading as="h2" size="md" mb={2}>
            Carga de Reportes
          </Heading>
          <Text mb={4}>Subí tus reportes en Excel para analizarlos</Text>
          <CargaDeReporte />
        </Box>
      </VStack>
    </Box>
  );
};

export { HomePage2 };
