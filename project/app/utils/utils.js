'use strict';
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const configFilePath = 'config.js';
const configFile = path.join(process.cwd(), configFilePath);
const basePath = path.dirname(configFile);
const OSS = require('ali-oss');


module.exports = {
  getTemplate: _path => {
    const template = fs.readFileSync(_path, {
      encoding: 'utf-8',
    });
    return handlebars.compile(template);
  },
  writeFile: param => {
    const { url, buffer } = param;
    fs.writeFile(url, buffer, 'utf-8', function(err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  },
  write: param => {
    const { url, buffer } = param;
    fs.writeFileSync(url, buffer, 'utf-8');
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
  renderComponent: (p, context,base) => {
    let err;
    context = context || {};
    context.COMP_PATH = p;
    try {
      const eve = path.resolve(base, 'components');
      const realPath = `${eve}/${p}/view.hbs`;
      const template = fs.readFileSync(realPath, {
        encoding: 'utf-8',
      });
      const result = handlebars.compile(template);
      return result(context);
    } catch (_error) {
      err = _error;
      console.log('[Component Not Found] ' + err);
    }
  },
  getBasePath: () => {
    return basePath;
  },
  getUrl: ctx => {
    return ctx.request.url.split('?')[0];
  },
  upload: async (obj, root, ctx, filePath) => {
    const Disposition = `attachment;filename=${obj.filename};filename*=UTF-8''${obj.filename}`;
    obj.fileRealName = Disposition;
    const temp = await ctx.curl(`${root}/api/zoss/getSTSToken`, {
      headers:ctx.request.header,
      method: 'get',
      data: obj,
      dataType: 'json',
      contentType: 'json',
    });
    const client = new OSS({
      endpoint: temp.data.result.endPoint,
      accessKeyId: temp.data.result.accessKeyId,
      accessKeySecret: temp.data.result.accessKeySecret,
      stsToken: temp.data.result.securityToken
    });
    client.useBucket(temp.data.result.bucket);
    let result = await client.put(temp.data.result.data[0], filePath);
    return result
  },
  downLoad: async (obj,root,ctx) => {
    const downLink = await ctx.curl(`${root}/api/zoss/getDownLoadUrl`, {
      headers:ctx.request.header,
      method: 'get',
      data: obj,
      dataType: 'json',
      contentType: 'json',
    });
    return downLink;
  },
  getCookie: (ctx, keys) => {
    const cookies = ctx.request.header.cookie;
    const obj = {};
    const arr = cookies.split('=');
    obj[arr[0]] = arr[1];
    return obj[keys];
  }
};
