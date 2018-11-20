'use strict';
const Controller = require('egg').Controller;
const _utils = require('../utils/utils');
require('../utils/helpers');
const _ = require('lodash');
class HomeController extends Controller {
  async index() {
    await this.beforeRander();
  }
  async beforeRander() {
    const header = this.ctx.request.header;
    let tpurl = this.ctx.request.url;
    const code = _utils.getCookie(this.ctx, 'disCode');
    const hbsPath = _utils.getPath(`public/views/eevees/page.hbs`);
    const pageid = await this.ctx.service.eevees.getPageId(header.host,code,tpurl.slice(1));
    if(!pageid){
      this.ctx.body = "暂时未开通区划。"
      return;
    }
    const pagetemp = await this.ctx.service.eevees.getPage();
    const template = await this.ctx.service.eevees.getTemplate();
    this.disCode = code;
    this.link = header.host;
    const rule = await this.ctx.service.eevees.findAllRule();
    this.rule = JSON.parse(rule);
    let purl = isNaN(tpurl.slice(1)) ? this.ctx.request.url : '/index';
    let result = {};
    JSON.parse(pagetemp).forEach((item1)=>{
      if (item1.pageId === pageid && ('/'+item1.page) === purl) {
        if(item1.tid){
          let temp = this.getTemplates(item1.tid,template);
          result = item1;
          result.templateJson = temp ? temp.templateJson : result.templateJson;
        }else {
          result = item1;
        }
      }
    });
    if(!result.templateJson){
      this.ctx.body = "暂时未开通区划。"
      return;
    }
    this.soveData(result);
    
    const templates = _utils.getTemplate(hbsPath);
    this.ctx.body = templates(result.templateJson||[]);
  }
  getTemplates (key,obj) {
    let result = false;
    let arr = key.split('|')
    obj.forEach((item)=>{
      if(item.groupID === arr[0]){
        item.children.forEach((item2)=>{
          if(item2.page == key){
            result = item2;
          }
        })
      }
    });
    return result;
  }
  soveData(d){
    d.templateJson.forEach((item)=>{
      item.comps.forEach((item2)=>{
        item2.insert.forEach((item3)=>{
          item3.data = this.checkRull(item3,d.page) || item3.data;
        })
      })
    })
  }
  checkRull(item,pages){
    let p = item.path;
    let page = pages;
    let disc = this.disCode;
    let link = this.link;
    let result = false;
    if(this.rule[p]){
      this.rule[p].forEach((pop)=>{
        let rule = pop.rule;
        let parr = rule.doPage.split(',');
        if(_.indexOf(parr,page) > -1){
          let docode = rule.doCode || 'all';
          let dohall = rule.doHall || 'all';
          if(this.checkOneRule(docode,rule.unlessCode,disc) && this.checkOneRule(dohall,rule.unlessHall,link)){
            result = pop.data;
            return false;
          }
        }
      });
    }
    return result;
  }
  checkOneRule(rule,unrule,code){
    let result = false;
    let _unrule = unrule || '';
    let rarr = _unrule.split(',');
    if(rule === 'all'){
      result = _.indexOf(rarr,code) === -1
    }else{
      let ruleA = rule.split(',');
      result = (_.indexOf(ruleA,code)>-1) && _.indexOf(rarr,code) === -1;
    }
    return result;
  }
}

module.exports = HomeController;
