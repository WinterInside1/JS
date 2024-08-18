const ActiveDirectory = require('activedirectory2');
const Config = require('./config');

class AdAuth {
  constructor() {
    const config = new Config();
    this.ad = new ActiveDirectory(config.getLdapConfig());
  }

  authenticate(username, password, callback) {
    this.ad.authenticate(username, password, (err, auth) => {
      if (err) {
        return callback(err, false);
      }

      if (auth) {
        // Если аутентификация успешна, ищем группы пользователя
        this.getUserGroups(username, (groupErr, groups) => {
          if (groupErr) {
            return callback(groupErr, false);
          }

          return callback(null, true, groups); // Возвращаем успех и группы
        });
      } else {
        return callback(null, false);
      }
    });
  }

  getUserGroups(username, callback) {
    this.ad.getGroupMembershipForUser(username, (err, groups) => {
      if (err) {
        return callback(err, null);
      }

      if (!groups || groups.length === 0) {
        return callback(null, []);
      }

      // Возвращаем массив с именами групп
      const groupNames = groups.map(group => group.cn);
      return callback(null, groupNames);
    });
  }
}

module.exports = AdAuth;
