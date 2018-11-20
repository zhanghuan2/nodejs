'use strict';

module.exports = appInfo => {
  const config = exports = {};
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525229962276_9979';
  
  // add your config here
  // config.middleware = [ 'check' ];
  // config.sequelize = { // egg-sequelize 配置
  //   dialect: 'mysql', // db type
  //   database: 'test',
  //   host: 'localhost',
  //   port: '3306',
  //   username: 'root',
  //   password: '',
  // };
  // config.check = {
  //   ignore(ctx) {
  //     const url = ctx.request.url;
  //     return (url.indexOf('login') > -1 || url.indexOf('api') > -1 || url.indexOf('public') > -1);
  //   },
  // };
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '10.201.10.215:8083','http://localhost:8083','localhost:8083','http://localhost:8082' ],
  };
  config.core = {
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST',
    credentials: true,
  };
  return config;
};
