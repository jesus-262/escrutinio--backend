// config.js
const config = {
    db_host: process.env.DB_HOST || 'localhost',
    db_user: process.env.DB_USER || 'root',
    db_password: process.env.DB_PASSWORD || '',
    db_database: process.env.DB_DATABASE || 'ocr_forms',
    db_port: process.env.DB_PORT || 3306,
    port: process.env.PORT || 4000,
    cors_origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  };
  
  export default config;


