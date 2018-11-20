module.exports = [{
  url: '/maskManage/create',
  view: 'createMask',
  models: ['create'],
}, {
  url: '/maskManage/result/:taskId',
  view: 'createResult',
  models: ['viewResult'],
}, {
  url: '/maskManage/list',
  view: 'list',
  models: ['maskList'],
}];
