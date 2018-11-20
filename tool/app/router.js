'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/node/nodeTool/*', controller.nodeTool.index);
  router.get('/node/nodeTool/*', controller.nodeTool.index);
};
