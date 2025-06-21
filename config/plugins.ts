export default ({ env }) => ({
  "cargar-reportes": {
    enabled: true,
    resolve: "./src/plugins/cargar-reportes",
  },
  upload: {
    config: {
      provider: "local", // o 'aws-s3', etc.
      providerOptions: {},
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      // 👇 Aquí se permite subir .xlsx y .xls
      breakpoints: {},
      mimeTypes: [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
      ],
    },
  },
});
