# 政采云node端框架项目
前端装修架构 + nodeJS(后端，eggJS架构） + mysql
## 安装依赖
### nodeJS
```
sudo npm i -g n   //安装node版本库控制工具n
n 8.11.1         //安装node版本，需要 > 7.6版本
```
* n API
```
1、n latest   //安装最新版本
2、n stable    //安装稳定版本
3、n  ||  n use 8.11.1         //选择版本
```

### mysql (macOS)

```bash
$ sudo brew install mysql
$ unset TMPDIR          //设置权限
$ mysql_install_db --verbose --user=root--basedir="$(brew --prefix mysql)"--datadir=/usr/local/var/mysql --tmpdir=/tmp
$ mysql.server start    //启动mysql
$ mysql -uroot -p       //进入mysql
```

### npm i
```bash
$ npm i       //下载依赖包
$ npm run dev   //启动项目
```