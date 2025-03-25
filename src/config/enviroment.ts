import 'dotenv/config'

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'nguyenvu',
  DB_NAME: process.env.DB_NAME || 'review_product_system',
  DB_SYNC: process.env.DB_SYNCHRONIZE || true,
  DB_LOGGING: process.env.DB_LOGGING || true,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}
