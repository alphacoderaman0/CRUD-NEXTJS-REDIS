import Redis from 'ioredis';
const redis = new Redis({
  host:'122.180.244.93',
  port:'3000',
});
redis.on('error', (err) => console.log('Redis Client Error', err));
export default redis;