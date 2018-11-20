'use strict';
const Controller = require('egg').Controller;
const _utils = require('../utils/utils');
require('../utils/helpers');
class styleController extends Controller {
  async index() {
    await this.beforeRander();
  }
  async beforeRander() {
    const url = this.ctx.request.url;
    const path = _utils.getPath(`public${url}`);
    const type = path.split('.')[1];
    type === 'css' && this.ctx.set('content-type', 'text/css');
    type === 'js' && this.ctx.set('content-type', 'application/javascript');
    if(url.indexOf('bootstrap.min.css.map')>0){
      this.ctx.body = '';
    } else {
      this.ctx.body = _utils.getFile(path);
    }
    // this.ctx.body = this.ctx;
  }
}

module.exports = styleController;
