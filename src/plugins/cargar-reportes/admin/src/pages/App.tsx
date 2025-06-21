import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { ChakraProvider, defaultSystem  } from '@chakra-ui/react';

import { HomePage } from './HomePage';


const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ChakraProvider>
  );
};

export { App };
