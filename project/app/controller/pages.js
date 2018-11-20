'use strict';
const Controller = require('egg').Controller;
const _utils = require('../utils/utils');
const path = require('path');

require('../utils/helpers');
class HomeController extends Controller {
  async index() {
    await this.beforeRander();
  }
  async beforeRander() {
    // console.log(path.resolve(process.cwd(),'../aa'));
    const url = this.ctx.request.url.split('?')[0];
    const hbsPath = _utils.getPath(`public/views${url}.hbs`);
    const templates = _utils.getTemplate(hbsPath);
    // const param = {
    //   url: _utils.getPath('app/localFiles/main.html'),
    //   buffer: templates(),
    // };
    // _utils.writeFile(param);
    // await this.app.model.User.create({
    //   username: 'zhanghuan',
    //   key: '123456789',
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
