function redisConfig() {
  if (process.env.NODE_ENV === 'development') {
    return {
      host: 'localhost',
      port: 6379,
    };
  }
  return { url: process.env.REDIS_URL };
}
export default redisConfig;
