'use strict';
const Service = require('egg').Service;

class BusinessService extends Service {
  async find(name) {
    const result = await this.app.model.Business.findOne({
      where: {
        page: name,
      },
    });
    return result;
  }
  async add(param) {
    const result = await this.app.model.Business.create({
      page: param.page,
      templateJson: JSON.stringify(param.templateJson),
    });
    return result;
  }
  async update(pop, tar) {
    const result = await this.app.model.Business.update({
      templateJson: pop,
    }, {
      where: {
        page: tar,
      },
    });
    return result;
  }
}

module.exports = BusinessService;
