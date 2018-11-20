'use strict';
const Controller = require('egg').Controller;
const _utils = require('../../utils/utils');
const path = require('path');
const basepath = path.resolve(process.cwd(),'../zcy-nobita-front/public');
require('../../utils/helpers')(basepath);
var markdown = require( "markdown" ).markdown;

class HomeController extends Controller {
  async index() {
    await this.beforeRander();
  }
  async beforeRander() {
    const url = this.ctx.request.url.split('?')[0];
    
    const arr = url.split('comps/');
    const context = {};
    console.log(arr[1])
    if(arr[1] === 'intro' || arr[1] === 'demo'){
      const templates = _utils.getTemplate(`${basepath}/views/${arr[1]}.hbs`);
      this.ctx.body = templates();
      
    }else {
      context.markdown = await this.getmarkdown(arr[1]);
      context.compsPath = `eevee_comps/${arr[1]}`;
      const templates = _utils.getTemplate(`${basepath}/views/index.hbs`);
      this.ctx.body = templates(context);
    }
    
  }
  async getmarkdown(p) {
    console.log(p)
    // var md = "" + env.filesHome + "/components/eevee_comps/" + p + "/README.md"
    const template = _utils.getTemplate(`${basepath}/components/eevee_comps/${p}/README.md`);
    return markdown.toHTML(template())
  }
}

module.exports = HomeController;
