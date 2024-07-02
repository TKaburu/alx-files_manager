const redis = require('redis');
// define DedisClient class
class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: '127.0.0.1',
      port: 6379,
    });
    this.client.on('error', (error) => {
      console.log(`Your Redis client is not connected due to this error: ${error.message}`);
    });
    this.connect = false;
    this.client.on('connect', () => {
      // console.log('Redis client connected to the server');
      this.connected = true;
    });
  }

  // isAlive returns true if client i connected otherwise false
  isAlive() {
    return this.client.connected;
  }

  // get the value associated with the given key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
