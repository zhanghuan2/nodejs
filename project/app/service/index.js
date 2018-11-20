'use strict';
const Service = require('egg').Service;
const _utils = require('../utils/utils');
class indexService extends Service {
  async find(name) {
    const data = _utils.getFile(`${__dirname}/../localFiles/templates.json`)
    // const user = await this.app.model.User.findOne({
    //   where: {
    //     username: name,
    //   },
    // });
    return JSON.parse(data);
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

module.exports = indexService;
