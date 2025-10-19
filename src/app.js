import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formsRoutes from './routes/forms.routes.js';
import config from './config.js';
import { pool } from './db/connection.js';
dotenv.config();
const app = express();
async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('✅ Conexión exitosa a la base de datos');
      connection.release();
    } catch (error) {
      console.error('❌ Error al conectar a la base de datos:', error.message);
    }
  }
  testConnection();
app.use(cors({
    credentials: true,
    ControlAllowCredentials:true,
    origin:config.cors_origin
  }));
app.use(express.json());

app.use('/api', formsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));