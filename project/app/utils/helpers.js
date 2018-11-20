'use strict';
const fn = function(t) {
  const _ = require('lodash');
  const handlebars = require('handlebars');
  const _utils = require('../utils/utils');
  const fs = require('fs');
  const blocks = {};
  const path = require('path');
  const viewsHome = `${t}/views`;
  handlebars.registerHelper('partial', function(name, options) {
    let block;
    if (!(block = blocks[name])) {
      block = blocks[name] = [];
    }
    block.push(options.fn(this));
    return void 0;
  });
  handlebars.registerHelper('block', function(name, options) {
    const block = blocks[name] || [];
    if (block.length === 0) {
      if (options.fn) {
        return options.fn(this);
      }
      return '';
    }
    const content = block.join('\n');
    blocks[name] = [];
    return content;
  });
  handlebars.registerHelper('helperMissing', function() {
    return 'missing helper';
  });
  handlebars.registerHelper('equals', function(a, b, options) {
    if ((a != null ? a.toString() : void 0) === (b != null ? b.toString() : void 0)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  handlebars.registerHelper('json', function() {
    return JSON.stringify(this);
  });
  handlebars.registerHelper('eevee', function(a, option) {
    const template = `<div class="${a}" data-compath="${this._path}" data-key="${this.key}">${option.fn(this)}</div>`;
    return template;
  });
  handlebars.registerHelper('insert', function() {
    const data = this;
    const path = arguments[0];
    const _data = arguments.length === 2 ? (arguments[1].hash || {}) : data;
    const template = handlebars.templates[`${path}/view`];
    return template(_data);
  });
  handlebars.registerHelper('inject', function(path, options) {
    let compData;
    const tempContext = _.clone(this);
    _.assign(tempContext, options.hash);
    if (options.fn) {
      compData = JSON.parse(options.fn());
      _.assign(tempContext, compData);
    }
    return new handlebars.SafeString(_utils.renderComponent(path, tempContext,t));
  });
  handlebars.registerHelper('component', function(className, options) {
    return new handlebars.SafeString(`<div class="${className}" data-comp-path="${this.COMP_PATH}">${options.fn(this)}</div>`);
  });
  handlebars.registerHelper("toHTML", function(html, options) {
    return new handlebars.SafeString("<div>" + html + "</div>");
  });
  const registerLayout = function(filePath) {
    if (!/\.hbs$/.test(filePath)) {
      return;
    }
    const t = fs.readFileSync(filePath);
    const name = filePath.slice(viewsHome.length + 1).split('.')[0];
    return handlebars.registerPartial(name, handlebars.compile(t.toString()));
  };
  const layouts = [];
  const findLayouts = function(dir) {
    const files = fs.readdirSync(dir);
    return files.forEach(function(file) {
      const filePath = '' + dir + '/' + file;
      if (fs.statSync(filePath).isDirectory()) {
        return findLayouts(filePath);
      }
      return layouts.push(filePath);
    });
  };
  findLayouts(viewsHome);
  layouts.forEach(function(file) {
    return registerLayout(file);
  });
  console.log(t)
};
module.exports = fn;