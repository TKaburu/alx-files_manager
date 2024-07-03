const mongoClient = require('mongodb');
const dotenv = require('dotenv'); // used to hide the environment variables

dotenv.config();

// DBClient client
class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new mongoClient.MongoClient(url, {
      tls: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.connect = false;

    this.client.connect((error) => {
      if (error) {
        console.error('MongoDB did not connect because of this error:', error.message);
      } else {
        console.log('MongoDB connected successfully');
        this.connect = true;
        this.db = this.client.db(database);
      }
    });
  }

  // isAlive returns true if client i connected otherwise false
  isAlive() {
    return this.client.connected;
  }

  // returns the number of documents in the collection users
  async nbUsers() {
    if (this.connect) {
      return this.db.collection('users').countDocuments();
    }
    return 0;
  }

  // returns the number of documents in the collection files
  async nbFiles() {
    if (this.connect) {
      return this.db.collection('files').countDocuments();
    }
    return 0;
  }
}
// export DBClient instance
const dbClient = new DBClient();
module.exports = dbClient;
