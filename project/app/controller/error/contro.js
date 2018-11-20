'use strict';
const Controller = require('egg').Controller;
const _utils = require('../../utils/utils');
const path = require('path');

require('../../utils/helpers');
class HomeController extends Controller {
  async index() {
    await this.beforeRander();
  }
  async beforeRander() {
    
    this.ctx.body = 'page not find';
  }
}

module.exports = HomeController;
