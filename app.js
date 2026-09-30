const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de productos
app.use('/api/productos', productosRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/smartbuy')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.log('Error al conectar MongoDB:', error));

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API SmartBuy funcionando correctamente');
});

// Iniciar servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor SmartBuy ejecutándose en puerto ${PORT}`);
});