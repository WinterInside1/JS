// config.js

require('dotenv').config(); // Загружаем переменные из .env

class Config {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/defaultdb';
    this.ldapUrl = process.env.LDAP_URL || 'ldap://your-ldap-server.com';
    this.ldapBaseDN = process.env.LDAP_BASE_DN || 'dc=yourdomain,dc=com';
    this.ldapUsername = process.env.LDAP_USERNAME || 'admin@yourdomain.com';
    this.ldapPassword = process.env.LDAP_PASSWORD || 'yourpassword';
  }

  getPort() {
    return this.port;
  }

  getDatabaseUrl() {
    return this.databaseUrl;
  }

  getLdapConfig() {
    return {
      url: this.ldapUrl,
      baseDN: this.ldapBaseDN,
      username: this.ldapUsername,
      password: this.ldapPassword,
    };
  }
}

module.exports = Config;
