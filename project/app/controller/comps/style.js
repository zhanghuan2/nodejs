'use strict';
const Controller = require('egg').Controller;
const _utils = require('../../utils/utils');
require('../../utils/helpers');
const path = require('path');

const basepath = path.resolve(process.cwd(),'../zcy-nobita-front/public');

class styleController extends Controller {
  async index() {
    await this.beforeRander();
  }
  async beforeRander() {
    const url = this.ctx.request.url;
    const _path = url.split('/comps/public/')[1];
    const type = _path.split('.')[1];
    type === 'css' && this.ctx.set('content-type', 'text/css');
    type === 'js' && this.ctx.set('content-type', 'application/javascript');
    if(url.indexOf('bootstrap.min.css.map')>0){
      this.ctx.body = '';
    } else {
      this.ctx.body = _utils.getFile(`${basepath}/${_path}`);
    }
    // this.ctx.body = this.ctx;
  }
}

module.exports = styleController;
