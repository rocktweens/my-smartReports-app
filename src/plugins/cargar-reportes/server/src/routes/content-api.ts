export default [
  {
    method: 'GET',
    path: '/',
    // name of the controller file & the method.
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/upload-excel',
    handler: 'upload.uploadExcel',
    config: {
      policies: [],
      auth: false, // ⚠️ Habilita auth si es necesario
    },
  }
];
