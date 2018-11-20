# 政采云pampas脚手架

支持3个模板的下载（通用后台pampas 、单页面pampas、装修前台pampas）。

## 安装依赖
* 切换源至http://172.16.101.38:4873/
```
npm i -g zcy-pampas-cli
```
* nrm (可选)
```
sudo npm i -g nrm
```


## 使用方法

### 查看列表

```blash
zcy-pampas-cli list
```
1. pampas_back
> pampas管理端通用模板,后端渲染，业务实例地址/test
2. pampas_onePage
> pampas单页面模板，rest请求，异步渲染页面，业务实例地址/test
3. pampas_eevee
> pampas前台大厅页面模板，包含装修组件。
###下载
```
zcy-pampas-cli init
//Template name : 选择模板名称
//Project name : 项目名称
//Where to init the project : 下载路径
//Where to push the project : 远端git项目地址
```

### 下载依赖资源
```
cd xxxx   //切换到项目路径
gulp bundles
gulp dev
```