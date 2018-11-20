'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.login.index);
  router.get('/eevees/**', controller.pages.index);
  
  //组件库 comps开头
  router.get('/comps/**', controller.comps.pages.index);
};
