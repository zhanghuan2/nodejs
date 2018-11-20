'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // app.beforeStart(async function() {
  //   await app.model.sync({ force: true });
  // });
  const { router, controller } = app;
  require('./router/request')(app);
  require('./router/style')(app);
  require('./router/pages')(app);
  router.get('/**', controller.error.contro.index);
  // router.get('/api/**', controller.getLink.index);
};
