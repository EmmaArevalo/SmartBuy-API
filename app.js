const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productosRoutes = require('./routes/productos');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Reutilizar la conexion entre peticiones y esperar antes de consultar datos.
let conexionPendiente;
async function conectarMongoDB() {
    if (mongoose.connection.readyState === 1) return;
    if (!conexionPendiente) {
        const uri = process.env.MONGODB_URI ||
            (!process.env.VERCEL ? 'mongodb://127.0.0.1:27017/smartbuy' : '');
        if (!uri) throw new Error('Falta configurar MONGODB_URI');
        conexionPendiente = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 5
        }).catch(error => {
            conexionPendiente = undefined;
            throw error;
        });
    }
    await conexionPendiente;
}

app.get('/', (req, res) => {
    res.send('API SmartBuy funcionando correctamente');
});

app.use('/api/productos', async (req, res, next) => {
    try {
        await conectarMongoDB();
        next();
    } catch (error) {
        // No registrar la URI ni credenciales en mensajes publicos.
        console.error('No se pudo conectar a MongoDB:', error.name);
        res.status(503).json({
            mensaje: 'Base de datos no disponible. Revisa la configuracion de conexion.'
        });
    }
}, productosRoutes);

// Vercel usa la aplicacion exportada; npm start sigue funcionando en local.
module.exports = app;
if (require.main === module && !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor SmartBuy ejecutandose en puerto ${PORT}`);
    });
}
