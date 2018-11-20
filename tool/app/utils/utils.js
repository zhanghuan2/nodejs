'use strict';
const fs = require('fs');
const path = require('path');
const configFilePath = 'config.js';
const configFile = path.join(process.cwd(), configFilePath);
const basePath = path.dirname(configFile);
const OSS = require('ali-oss');


module.exports = {
  writeFile: param => {
    const { url, buffer } = param;
    fs.writeFile(url, buffer, function(err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  },
  getFile: _path => {
    const buffer = fs.readFileSync(_path, {
      encoding: 'utf-8',
    });
    return buffer;
  },
  getPath: _path => {
    return `${basePath}/${_path}`;
  },
  getBasePath: () => {
    return basePath;
  },
  getUrl: ctx => {
    return ctx.request.url.split('?')[0];
  },
  query: url => {
    const theRequest = {};
    if (url.indexOf("?") !== -1) {
      let str = url.substr(url.indexOf("?")+1);
      let strs = str.split("&");
      for(let i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
      theRequest.url = url.split('?')[0];
    } else {
      theRequest.url = url;
    }
    return theRequest;
  },
  upload: async (obj, root, ctx, filePath) => {
    // const Disposition = `attachment;filename=${obj.filename};filename*=UTF-8''${obj.filename}`;
    // obj.fileRealName = Disposition;
    // const temp = await ctx.curl(`https://middle.zcy.gov.cn/api/zoss/getSTSToken`, {
    //     headers:ctx.request.header,
    //     method: 'get',
    //     data: obj,
    //     dataType: 'json',
    //     contentType: 'json',
    // });
    const client = new OSS({
      endpoint: "http://oss-cn-hangzhou.aliyuncs.com",
      accessKeyId: "LTAIKSv5u1gL57Mt",
      accessKeySecret: "BhNTiRilZPofhloeCd4n55Q9SlMSCF",
      bucket: "zcy-spider",
      region: "oss-cn-hangzhou"
    });
    // client.useBucket(temp.data.result.bucket);
    let result = await client.put(`zcy-spider/${new Date().getTime()}.png`, filePath);
    return result
  },
  downLoad: async (obj,root,ctx) => {
    const downLink = await ctx.curl(`https://middle.zcy.gov.cn/api/zoss/getDownLoadUrl`, {
      headers:ctx.request.header,
      method: 'get',
      data: obj,
      dataType: 'json',
      contentType: 'json',
    });
    return downLink;
  }
};
