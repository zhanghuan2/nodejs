'use strict';
async function test(ctx, next) {
  const username = ctx.cookies.get('username');
  if (username) {
    await next();
  } else {
    ctx.redirect(`/login?target=${ctx.request.url}`);
  }
  // ctx.body = ctx.query.name;
}
module.exports = () => {
  return test;
};
