const express    = require('express');
const path       = require('path');
const indexRouter= require('./routes/index');
const dateParser = require('./routes/dateParser');  // 👈 importe aqui

const app  = express();
const PORT = process.env.PORT || 3000;

// 1) Middleware para ler JSON no body
app.use(express.json());

// 2) Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 3) Rotas de página
app.use('/', indexRouter);

// 4) Rotas de API — monte o parser de datas ANTES do catch-all
//    Se o dateParser faz router.post('/parse-date', …), então:
app.use('/api', dateParser);

// 5) Catch-all para 404 de páginas (isso não vai interferir na /api)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
