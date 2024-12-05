const cors_ = {
    origin: 'https://aes-frontend-five.vercel.app', // URL de tu frontend
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
    credentials: true, // Permite el uso de cookies o encabezados de autorización
};

module.exports = cors_;
