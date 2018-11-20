'use strict';
const Service = require('egg').Service;
const _utils = require('../utils/utils');
let index = 0;
let cindex = 0;
let gid = 0;
let cid = 0;
class indexService extends Service {
  //新增父类组 templateCreate
  async groupSave(param) {
    const host = this.ctx.request.header.host;
    // const temp = await this.ctx.curl(`${host}/operating/common/template/save`, {
    //   headers:this.ctx.request.header,
    //   method: 'POST',
    //   data: param,
    //   dataType: 'json',
    //   contentType: 'json',
    // });
    //start
    const url = _utils.getPath(`app/localFiles/tempSave.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    param.id = gid++;
    json.push(param)
    const params = {
      url: _utils.getPath(`app/localFiles/tempSave.json`),
      buffer: JSON.stringify(json),
    };
    _utils.write(params);
    return {
      code:200,
      data:param.id,
      success:true
    };
  }
  //新增子类组 templateCreate
  async saveChildTemplate(param) {
    const host = this.ctx.request.header.host;
    // const temp = await this.ctx.curl(`${host}/operating/common/templateDetail/save`, {
    //   headers:this.ctx.request.header,
    //   method: 'POST',
    //   data: param,
    //   dataType: 'json',
    //   contentType: 'json',
    // });
    //start
    const url = _utils.getPath(`app/localFiles/tempSave.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    param.id = cid++;
    json.forEach((item)=>{
      console.log(param)
      console.log(item.id)
      if(param.templateId == item.id){
        if(!item.children) {
          item.children = [];
        }
        item.children.push(param)
      }
    });
    const params = {
      url: _utils.getPath(`app/localFiles/tempSave.json`),
      buffer: JSON.stringify(json),
    };
    _utils.write(params);
    return {
      code:200,
      data:param.id,
      success:true
    };
  }
  async getDominPages() {
    const data = _utils.getFile(`${__dirname}/../localFiles/dominPage.json`)
    return JSON.parse(data);
  }
  async saveMainDomin(d) {
    const url = _utils.getPath(`app/localFiles/dominPage.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    let ids = ++index;
    d.id = `domin_${ids}`;
    json.push(d)
    const param = {
      url: _utils.getPath(`app/localFiles/dominPage.json`),
      buffer: JSON.stringify(json),
    };
    _utils.write(param);
    return `domin_${ids}`
  }
  async getChildDominById(d) {
    const url = _utils.getPath(`app/localFiles/dominPage.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    let pdata = '';
    json.forEach((item)=>{
      if(item.id === d){
        pdata = item;
        return false;
      }
    });
    return pdata.children || []
  }
  
  async saveChildDomin(d) {
    const url = _utils.getPath(`app/localFiles/dominPage.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    let pdata = '';
    json.forEach((item)=>{
      if(item.id === d.pid){
        pdata = item;
        return false;
      }
    });
    let ids = ++cindex;
    d.id = `cdomin_${ids}`;
    if(d.type === 'default'){
      d.id = d.pid;
    }
    if(pdata.children){
      pdata.children.push(d)
    } else {
      pdata.children = [];
      pdata.children.push(d);
    }
    // let ids = ++index;
    // d.id = `domin_${ids}`;
    // json.push(d)
    const param = {
      url: _utils.getPath(`app/localFiles/dominPage.json`),
      buffer: JSON.stringify(json),
    };
    _utils.write(param);
    return `cdomin_${ids}`
  }
  async saveTemplate(p) {
    const url = _utils.getPath(`app/localFiles/tempSave.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    json.forEach((item)=>{
      if (p.pid === item.id) {
        item.children.forEach((item2)=>{
          if(item2.id === p.id){
            item2.page = item2.templateId = p.page;
            item2.templateJson = p.templateJson;
            return item2;
          }
        })
      }
    })
    // json[p.page] = p;
    const param = {
        url: _utils.getPath(`app/localFiles/tempSave.json`),
        buffer: JSON.stringify(json),
      };
    _utils.write(param);
    
    return true;
  }
  async getTemplate() {
    const url = _utils.getPath(`app/localFiles/tempSave.json`);
    const data = _utils.getFile(url);
    return JSON.parse(data);
  }
  async getDominList() {
    const url = _utils.getPath(`app/localFiles/dominPage.json`);
    const data = _utils.getFile(url);
    return JSON.parse(data);
  }
  async getPage() {
    const url = _utils.getPath(`app/localFiles/pageSave.json`);
    const data = _utils.getFile(url);
    return data;
  }
  async getPageById(id) {
    const url = _utils.getPath(`app/localFiles/pageSave.json`);
    const data = _utils.getFile(url);
    return data;
  }
  async savePage(p) {
    const url = _utils.getPath(`app/localFiles/pageSave.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    json.push(p)
    const param = {
      url: _utils.getPath(`app/localFiles/pageSave.json`),
      buffer: JSON.stringify(json),
    };
    _utils.write(param);
  
    return true;
  }
  async saveRule(p) {
    const url = _utils.getPath(`app/localFiles/saveRule.json`);
    const temp = _utils.getFile(url);
    const json = JSON.parse(temp);
    json[p.path] = p.rule
    const param = {
      url: _utils.getPath(`app/localFiles/saveRule.json`),
      buffer: JSON.stringify(json),
    };
    _utils.write(param);
  
    return true;
  }
  async findAllRule() {
    const url = _utils.getPath(`app/localFiles/saveRule.json`);
    const data = _utils.getFile(url);
    return data;
  }
  async findOneRule(d) {
    const url = _utils.getPath(`app/localFiles/saveRule.json`);
    const data = _utils.getFile(url);
    const json = JSON.parse(data);
    return json[d] || [];
  }
  async getPageId(link,code,url){
    const data = _utils.getFile(`${__dirname}/../localFiles/dominPage.json`)
    const json = JSON.parse(data);
    let result = false;
    let temp = [];
    if(!isNaN(url)){
      json.forEach((item)=>{
        if(item.domain == link){
          if(item.discode == code){
            result = item.id;
            return false;
          }else {
            temp = item.children || [];
          }
        }
      });
      if(result){
        return result;
      }
      console.log(temp);
      temp.forEach((item)=>{
        console.log(item.discode)
        console.log(code)
        if(item.discode == code){
          result = item.id;
          return false;
        }
      })
      console.log(result);
      return result
    }else{
      json.forEach((item)=>{
        if(item.domain === link){
          result = item.id;
          return false
        }
        item.children && item.children.forEach((item1)=>{
          if(item1.domain === link){
            result = item1.id;
            return false
          }
        })
      });
      
    }
    return result;
  }
}

module.exports = indexService;
