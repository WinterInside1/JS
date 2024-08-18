const express = require('express');
const Config = require('./config');
const AdAuth = require('./adAuth');

class Server {
  constructor() {
    this.app = express();
    this.config = new Config();
    this.adAuth = new AdAuth();
    this.configure();
    this.routes();
  }

  configure() {
    this.port = this.config.getPort();
    this.app.use(express.json());
  }

  routes() {
  this.app.post('/login', (req, res) => {
  const { username, password } = req.body;

  this.adAuth.authenticate(username, password, (err, success, groups) => {
    if (err || !success) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    return res.json({ message: 'Authentication successful', groups: groups });
  });
});

  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
