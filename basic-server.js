// Using nodemon with NodeJS

const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Gracias por este requerimiento http');
})
  .listen(1234, () => {
    console.log('Im listening. Yuo betch,. Ya');
  });
