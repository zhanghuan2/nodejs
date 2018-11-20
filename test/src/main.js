/** *
 * 'babel-polyfill' 修复IE9的问题
 * 'raf/polyfill' 修复IE9的动画问题
 * 'event-source-polyfill' dev下热加载问题
 */
import 'babel-polyfill';
import 'raf/polyfill';
import dva from 'dva';
import onError from 'src/common/error';
import 'doraemon/lib/style/v2-compatible-reset';

if (__DEV__) {
  require('event-source-polyfill');
}

const app = dva({
  onError,
});
/**
 * 页面内部权限model
 */
app.model(require('src/common/models/privileges').default);

app.router(require('./router').default);

app.start('#root');
