export default {
    routes: [
      {
        method: 'POST',
        path: '/excel/upload',
        handler: 'excel.uploadExcel',
        config: {
          auth: false, // o true si requiere autenticación
        },
      },
    ],
  };
  