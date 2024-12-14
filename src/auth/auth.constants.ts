export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'default-secret-key', // Clave secreta (asegúrate de que esté definida en el .env)
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Duración del token (opcional, con valor por defecto)
  };
  