const http = require('http');
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'index.html');
http.createServer((req, res) => {
  fs.createReadStream(file).pipe(res);
}).listen(3000, () => console.log('Servidor en http://localhost:3000'));
