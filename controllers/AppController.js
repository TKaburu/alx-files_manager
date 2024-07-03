const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

// define AppController class
class AppController {
    static getStatus(req, res) {
        const status = {
            redis: redisClient.isAlive(),
            db: dbClient.isAlive()
        };
        return res.status(200).json(status);
    }

    static async getStats(req, res) {
        const users = await dbClient.nbUsers();
        const files = await dbClient.nbFiles();
        const stats = { users, files };
        return res.status(200).json(stats);
    }
}

module.exports = AppController;
