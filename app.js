const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
const mascotaRoutes = require('./routes/mascotaRoutes');
app.use('/api/mascotas', mascotaRoutes);

// Rutas vistas
const mascotasViews = require('./routes/mascotasViews');
app.use('/mascotas', mascotasViews);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
