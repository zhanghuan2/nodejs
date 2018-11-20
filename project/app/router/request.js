'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.post('/node/eevees/**', controller.postLink.index);
  router.get('/node/eevees/**', controller.postLink.index);
  // router.resources('login', '/api/**', controller.postLink.index);
  
};
