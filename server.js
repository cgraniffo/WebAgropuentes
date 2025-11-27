const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // 1) Determinar qué archivo pidió el navegador
  let filePath = req.url === '/' ? 'index.html' : req.url.substring(1); // quita el "/"

  // Ignorar parámetros tipo ?v=123
  filePath = filePath.split('?')[0];

  const ext = path.extname(filePath).toLowerCase();

  // 2) Asignar el Content-Type según la extensión
  let contentType = 'text/html';

  switch (ext) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      break;
    default:
      contentType = 'text/html';
  }

  const fullPath = path.join(__dirname, filePath);

  // 3) Leer el archivo y devolverlo
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Archivo no encontrado
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        // Otro error del servidor
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
