'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async find(name) {
    const user = await this.app.model.User.findOne({
      where: {
        username: name,
      },
    });
    return user;
  }
  async add(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }
  async update(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }
}

module.exports = UserService;
