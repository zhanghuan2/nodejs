'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/assets/**', controller.style.index);
  // router.resources('login', '/api/**', controller.postLink.index);
  
  router.get('/comps/public/assets/**', controller.comps.style.index);
};
