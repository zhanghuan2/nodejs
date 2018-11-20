'use strict';
const Controller = require('egg').Controller;
const phantom = require('phantom');
const _utils = require('../utils/utils');
const fs = require('fs');
const OSS = require('ali-oss');
let indexs = 1;
const arr = [];
class HomeController extends Controller {
  async index() {
    const url = this.ctx.request.url;
    const index = url.indexOf('?') < 0 ? url.length : url.indexOf('?');
    const method = (url.slice(0, index)).split('/').pop();
    this.root = `https://${this.ctx.request.header.host}`;
    await this[method]();
  }
  async screenShot() {
    const results = await this.https()
    this.ctx.body = results;
    // const filepath = _utils.getPath('app/localFiles/screenshot.png');
    // // this.ctx.attachment('jietu.png');
    // this.ctx.set('Content-Type', 'application/octet-stream');
    // const buf = fs.readFileSync(filepath);
    // this.ctx.status = 500;
    // this.ctx.body = "error";
  }
  async selfScreenShot() {
    const body = this.ctx.request.url;
    const net = decodeURIComponent(this.ctx.request.query.path);
    const instance = await phantom.create();
    const page = await instance.createPage();
    page.setting.UserAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36";
    const status = await page.open(net);
    await page.property('zoomFactor', 0.8);
    await page.property('clipRect', {
      top:this.ctx.request.query.y,
      left:this.ctx.request.query.x,
      width:this.ctx.request.query.w,
      height:this.ctx.request.query.h
    });
    const content = await page.property('content');
    await page.render(_utils.getPath('app/localFiles/screenshot.png'));
    await instance.exit();
    const filename = 'screenshot.png';
    const Disposition = `attachment;filename=${filename};filename*=UTF-8''${filename}`;
    const fileNum = 1;
    const bizCode = Number(this.ctx.request.query.bizCode || 1099);
    const result = await _utils.upload({
      fileNum,
      bizCode
    },this.root,this.ctx,_utils.getPath('app/localFiles/screenshot.png'));
    if(result.res.status === 200){
      const downLink = await _utils.downLoad({
        fileId:result.name,
        bizCode,
      },this.root,this.ctx)
      if (downLink.data.success) {
        this.ctx.body = downLink.data.result;
        return
      }
    }
    this.ctx.status = 500;
    this.ctx.body = "error";
  }
  async sendHttp(){
    const res = arr.shift();
    const that = res.thats;
    const body = that.ctx.request.url;
    const net = decodeURIComponent(that.ctx.request.query.path);
    const instance = await phantom.create();
    const page = await instance.createPage();
    const status = await page.open(net);
    await page.property('zoomFactor', 0.8);
    const content = await page.property('content');
    await page.render(_utils.getPath('app/localFiles/screenshot.png'));
    await instance.exit();
    const filename = 'screenshot.png';
    const Disposition = `attachment;filename=${filename};filename*=UTF-8''${filename}`;
    const fileNum = 1;
    const bizCode = Number(that.ctx.request.query.bizCode || 1099);
    const result = await _utils.upload({
      fileNum,
      bizCode,
      filename
    },that.root,that.ctx,_utils.getPath('app/localFiles/screenshot.png'));
    if(result.res.status === 200){
      res.resolve && res.resolve(result.url);
      arr.length != 0 && that.sendHttp()
      // const downLink = await _utils.downLoad({
      //   fileId:result.name,
      //   bizCode,
      // },that.root,that.ctx)
      // if (downLink.data.success) {
      //   res.resolve && res.resolve(downLink.data.result);
      //   arr.length != 0 && that.sendHttp()
      // }
    }
  }
  async https() {
    const that = this;
    return new Promise(function (resolve, reject){
      arr.push({
        resolve,
        id:indexs++,
        thats:that
      });
      arr.length == 1 && that.sendHttp()
    });
    
  }
  async getOtherHttp(){
    const res = arr.shift();
    setTimeout(function(){
      res && res('page2')
    },10000)
    
    
  }
}

module.exports = HomeController;
