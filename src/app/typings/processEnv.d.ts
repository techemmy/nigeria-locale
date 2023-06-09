declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    NODE_ENV: string
    MONGO_URI: string
    JWT_SECRET: string
    REDIS_URL: string
    REDIS_DEV_URL: string
    REDIS_PROD_URL: string
  }
}
