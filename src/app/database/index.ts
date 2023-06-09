import mongoose from 'mongoose'
import * as redis from 'redis'
import logger from '../utils/logger.util'

let redisClient: redis.RedisClientType

export function connectMongoDB(MONGO_URL: string): void {
  mongoose.connect(MONGO_URL)

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connected!')
  })

  mongoose.connection.on('error', () => {
    logger.error("An error occured! Couldn't connect to mongodb")
  })
}

export async function connectRedis(
  REDIS_URL: string | undefined
): Promise<redis.RedisClientType> {
  // redis connects to default host and password if url is undefined
  redisClient = redis.createClient({ url: REDIS_URL })

  redisClient.on('error', (error: Error) => logger.error(`Redis: ${error}`))

  await redisClient.connect()
  logger.info('Redis connected!')
  return redisClient
}

export async function disconnectRedis() {
  await redisClient.disconnect()
}

export { redisClient }
