'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');

class HomeController extends Controller {
  async index() {
    this.root = 'admin.test3.cai-inc.com';
    const url = this.ctx.request.url;
    const index = url.indexOf('?') < 0 ? url.length : url.indexOf('?');
    const method = (url.slice(0, index)).split('/').pop();
    console.log(method)
    console.log('===============')
    await this[method]();
  }
  async groupSave() {
    const param = await this.ctx.request.body;
    const result = await this.ctx.service.eevees.groupSave(param);
    this.ctx.body = result;
  }
  async saveChildTemplate() {
    const param = await this.ctx.request.body;
    const result = await this.ctx.service.eevees.saveChildTemplate(param);
    this.ctx.body = result;
  }
  async getOnePages() {
    const query = await this.ctx.query;
    const result = await this.ctx.service.eevees.getPage();
    const arr = JSON.parse(result);
    let data = {};
    arr.forEach((item)=>{
      if(item.link === query.link && item.page === query.page){
        data = item;
        return false;
      }
    });
    this.ctx.body = {
      success: true,
      data: data
    };
  }
  async getChildDominById() {
    const id = this.ctx.request.query.id;
    const result = await this.ctx.service.eevees.getChildDominById(id);
    // const arr = JSON.parse(result);
    // let data = {};
    // arr.forEach((item)=>{
    //   if(item.link === query.link && item.page === query.page){
    //     data = item;
    //     return false;
    //   }
    // });
    this.ctx.body = {
      success: true,
      data: result
    };
  }
  /**
   * api/eevee/submit;
   */
  async saveMainDomin() {
    const data = await this.ctx.request.body;
    const result = await this.ctx.service.eevees.saveMainDomin(data);
    this.ctx.body = {
      success: true,
      data: result
    };
  }
  async saveChildDomin() {
    const data = await this.ctx.request.body;
    const result = await this.ctx.service.eevees.saveChildDomin(data);
    this.ctx.body = {
      success: true,
      data: result
    };
  }
  async saveTemplate() {
    const data = await this.ctx.request.body;
    console.log(this.ctx.request.body);
    const result = await this.ctx.service.eevees.saveTemplate(data.result);
    this.ctx.body = {
      success: result
    };
  }
  async getTemplate() {
    const result = await this.ctx.service.eevees.getTemplate();
    console.log(this.ctx.header.origin);
    // const temp = await this.ctx.curl(`/operating/common/layout/getById`, {
    //   headers:this.ctx.request.header,
    //   method: 'get',
    //   data: {id:25},
    //   dataType: 'json',
    //   contentType: 'json',
    // });
    this.ctx.body = {
      success: true,
      data: result
      // temp
    };
    
  }
  async getDominPages() {
    const temp = await this.ctx.service.eevees.getPage();
    let link = this.ctx.request.query.link;
    let code = this.ctx.request.query.disCode;
    let result = [];
    JSON.parse(temp).forEach((item1)=>{
      if(item1.link === link && item1.disCode === code){
        result.push(item1);
      }
    });
    this.ctx.body = {
      success: true,
      data: result[0]
    };
  }
  async getDominList() {
    const result = await this.ctx.service.eevees.getDominList();
    this.ctx.body = {
      success: true,
      data: result
    };
  }
  async savePage() {
    const data = await this.ctx.request.body;
    
    const result = await this.ctx.service.eevees.savePage(data);
    this.ctx.body = {
      success: true
    };
  }
  async saveRule() {
    const data = await this.ctx.request.body;
    const result = await this.ctx.service.eevees.saveRule(data);
    this.ctx.body = {
      success: true
    };
  }
  async findAllRule() {
    const result = await this.ctx.service.eevees.findAllRule();
    this.ctx.body = {
      success: true,
      data: JSON.parse(result)
    };
  }
  async findOneRule() {
    const data = await this.ctx.query.path;
    const result = await this.ctx.service.eevees.findOneRule(data);
    this.ctx.body = {
      success: true,
      data: result
    };
  }
  async pdftest() {
    const body = this.ctx.request.url;
    const net = body.split('path=')[1];
    const instance = await phantom.create();
    const page = await instance.createPage();
    const status = await page.open(net);
    await page.property('zoomFactor', 0.8);
    const content = await page.property('content');
    await page.render(`${__dirname}/jietu.png`);
    await instance.exit();
    const filepath = `${__dirname}/jietu.png`;
    // this.ctx.attachment('jietu.png');
    this.ctx.set('Content-Type', 'application/octet-stream');
    const buf = fs.readFileSync(filepath);
    this.ctx.body = buf;
  }
}

module.exports = HomeController;
