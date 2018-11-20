'use strict';
const Controller = require('egg').Controller;
const _utils = require('../utils/utils');
require('../utils/helpers');
class HomeController extends Controller {
  async index() {
    await this.beforeRander();
  }
  async beforeRander() {
    const hbsPath = _utils.getPath('public/views/login.hbs');
    const templates = _utils.getTemplate(hbsPath);
    // const param = {
    //   url: _utils.getPath('app/localFiles/login.html'),
    //   buffer: templates(),
    // };
    // _utils.writeFile(param);
    // await this.app.model.User.create({
    //   username: 'testlast1',
    //   key: 'dsaf',
    // });
    // // await this.app.model.User.create({
    // //   username: 'test33',
    // // });
    // const d = await this.app.model.User.findOne({ where: { username: 'testlast1' } })
    // const result = await this.app.model.User.findAll();
    // await client1.query(sql, values);
    this.ctx.body = templates();
  }
}

module.exports = HomeController;
