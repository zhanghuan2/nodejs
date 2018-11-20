const Mock = require('mockjs');

module.exports = {
  "/user/privileges/isResourcePermit": function () {
    return {
      "success": true,
      "result": {
        "isPermit": true,
        "accessType": 2,
        "error": "user not authorization",
        "errorType": 403
      },
      "error": null
    }
  },
  "/user/apps/getAppsBasicInfo": function () {
    return {"success":true,"result":{"getMyDistrict":{"id":"3310","parentId":null,"code":"000000","name":"全国","type":"0","hierarchy":"3310","fullName":"全国","nameBone":"全国","shortPinyin":null,"shortPy":null,"tsPublish":1451606400000,"tsDeprecated":253402214400000,"tsPublishInternal":1451606400000,"tsDeprecatedInternal":253402214400000,"isLeaf":false,"version":null,"tsUpdated":1516188214000,"postcode":null,"areaCode":null,"characters":null,"dotCode":null,"region":null,"status":"启用","tier":"中央","remark":null},"getUserIdentity":[{"userId":1,"empId":1,"userDisplayName":null,"displayName":"运营机构管理员","categoryName":"0401","categoryDisplayName":"临时专家","districtDisplayName":null,"orgName":null,"orgId":null,"departmentName":"企划部","departmentId":302,"userType":null,"currentFlag":null},{"userId":1,"empId":1,"userDisplayName":null,"displayName":"运营机构管理员","categoryName":"99","categoryDisplayName":"平台运营","districtDisplayName":null,"orgName":"运营机构","orgId":1,"departmentName":"企划部","departmentId":302,"userType":"Org","currentFlag":true}],"getEnvHref":{"login":"http://member.test.cai-inc.com/login","logout":"http://member.test.cai-inc.com/logout","category":"http://member.test.cai-inc.com/api/user/category","userCenter":"http://member.test.cai-inc.com/user-center","front":"http://www.test.cai-inc.com","middle":"http://middle.test.cai-inc.com","member":"http://member.test.cai-inc.com","protocol":"http://protocol.test.cai-inc.com","agreement":"http://agreement.test.cai-inc.com","inquiry":"http://inquiry.test.cai-inc.com","inquiryhall":"http://inquiryhall.test.cai-inc.com","reverse":"http://reverse.test.cai-inc.com","reversehall":"http://reversehall.test.cai-inc.com","hall":"http://hall.test.cai-inc.com","bidding":"http://bidding.test.cai-inc.com","zjzfcg":"http://122.224.213.60:7002/cssframework/loginWin1.jsp","tradeAdmin":"http://admin.test.cai-inc.com","vaccine":"http://vaccine.test.cai-inc.com","projectmanager":"http://project-manage.test.cai-inc.com","supplier":"http://supplier.test.cai-inc.com","commission":"http://commission.test.cai-inc.com","settlement":"http://pay.test.cai-inc.com","customer":"http://customer.test.cai-inc.com","salesarea":"http://salesarea.test.cai-inc.com","experts":"http://experts.test.cai-inc.com","athena":"http://test.cai-inc.com/athena","vienna":"http://test.cai-inc.com/vienna","lasvegas":"http://test.cai-inc.com/lasvegas","ctaxccgp":"http://ctaxccgp.test.cai-inc.com","ctaxccgphall":"http://ctaxccgp-hall.test.cai-inc.com","health":"http://test.cai-inc.com/health","health-hall":"http://medical.test.cai-inc.com","bidding-open":"http://test.cai-inc.com/bidding-open","pageoffice":"http://pageoffice.test.cai-inc.com"},"getAppsByDimForFront":{"currentName":"应用中心","appList":[{"app":{"id":null,"name":"网上超市","description":null,"code":null,"parentCode":null,"level":0,"status":null,"statusUpdatedAt":null,"createdAt":null,"updatedAt":null,"isOpen":false,"icon":"","url":"http://www.test.cai-inc.com/","type":1},"appCode":null,"backLogApp":null,"backLogCount":null,"appSubName":null},{"app":{"id":null,"name":"在线询价","description":null,"code":null,"parentCode":null,"level":0,"status":null,"statusUpdatedAt":null,"createdAt":null,"updatedAt":null,"isOpen":false,"icon":"","url":"http://inquiryhall.test.cai-inc.com/","type":1},"appCode":null,"backLogApp":null,"backLogCount":null,"appSubName":null},{"app":{"id":null,"name":"协议供货","description":null,"code":null,"parentCode":null,"level":0,"status":null,"statusUpdatedAt":null,"createdAt":null,"updatedAt":null,"isOpen":false,"icon":"","url":"http://hall.test.cai-inc.com/","type":1},"appCode":null,"backLogApp":null,"backLogCount":null,"appSubName":null}]}},"error":null}
  },
  "/backlog/item/obtainBacklogHeadInfo": function () {
    return {"code":0,"message":"完成","data":{"messageCount":109,"backlogCount":557,"backlogs":[{"id":"93cc8103-d3b3-4416-82dc-3443987ef5a6","creatorId":-1,"creatorType":"NORMAL","level":"NORMAL","startupAt":1525858998000,"invalidateAt":null,"serialNumber":"1000000000000112165","title":"【审核处理】采购目录 \"adsfadfa\" (审核编号:1001000000000012812)修改待审核","app":"gpcatalog","appTag":null,"appSection":null,"appData":null,"appName":"采购目录","callbackUrl":"http://middle.test.cai-inc.com/gpcatalog/check/checkDetail?auditId=1001000000000012812","callbackType":null,"callbackTitle":"处理","autoFinish":false,"version":null,"createdAt":null,"updatedAt":null,"serialType":null,"needEffectWarning":null,"serialNumberUrl":null},{"id":"1a380a7b-b3b1-4015-b97e-10163af2cfd4","creatorId":-1,"creatorType":"NORMAL","level":"NORMAL","startupAt":1525858867000,"invalidateAt":null,"serialNumber":"1000000000000112174","title":"【审核处理】采购目录 \"adsfadfa\" (审核编号:1001000000000012811)修改待审核","app":"gpcatalog","appTag":null,"appSection":null,"appData":null,"appName":"采购目录","callbackUrl":"http://middle.test.cai-inc.com/gpcatalog/check/checkDetail?auditId=1001000000000012811","callbackType":null,"callbackTitle":"处理","autoFinish":false,"version":null,"createdAt":null,"updatedAt":null,"serialType":null,"needEffectWarning":null,"serialNumberUrl":null},{"id":"6eb5e5bc-f33f-41f0-9641-076b8c4c0081","creatorId":-1,"creatorType":"NORMAL","level":"NORMAL","startupAt":1525858772000,"invalidateAt":null,"serialNumber":"1000000000000112173","title":"【审核处理】采购目录 \"adsfadfa\" (审核编号:1001000000000012821)修改待审核","app":"gpcatalog","appTag":null,"appSection":null,"appData":null,"appName":"采购目录","callbackUrl":"http://middle.test.cai-inc.com/gpcatalog/check/checkDetail?auditId=1001000000000012821","callbackType":null,"callbackTitle":"处理","autoFinish":false,"version":null,"createdAt":null,"updatedAt":null,"serialType":null,"needEffectWarning":null,"serialNumberUrl":null},{"id":"b42fddd1-7845-4b42-8cca-40b121047833","creatorId":-1,"creatorType":"NORMAL","level":"NORMAL","startupAt":1525858560000,"invalidateAt":null,"serialNumber":"1000000000000112163","title":"【审核处理】采购目录 \"adsfadfa\" (审核编号:1001000000000012820)修改待审核","app":"gpcatalog","appTag":null,"appSection":null,"appData":null,"appName":"采购目录","callbackUrl":"http://middle.test.cai-inc.com/gpcatalog/check/checkDetail?auditId=1001000000000012820","callbackType":null,"callbackTitle":"处理","autoFinish":false,"version":null,"createdAt":null,"updatedAt":null,"serialType":null,"needEffectWarning":null,"serialNumberUrl":null},{"id":"96519fc1-6aaf-491d-9fe6-33129a8ee27e","creatorId":-1,"creatorType":"NORMAL","level":"NORMAL","startupAt":1523601767000,"invalidateAt":null,"serialNumber":"1000000000000106025","title":"【审核处理】采购目录 \"test\" (审核编号:1001000000000012741)修改待审核","app":"gpcatalog","appTag":null,"appSection":null,"appData":null,"appName":"采购目录","callbackUrl":"http://middle.test.cai-inc.com/gpcatalog/check/checkDetail?auditId=1001000000000012741","callbackType":null,"callbackTitle":"处理","autoFinish":false,"version":null,"createdAt":null,"updatedAt":null,"serialType":null,"needEffectWarning":null,"serialNumberUrl":null}],"messages":[{"id":"51ca6365-a03f-492e-a577-2adefb192eb9","creatorId":null,"creatorType":"NORMAL","level":"NORMAL","title":"行政区划审核结果通知","content":"行政区划\"测试ccc\"(编号:900000)变更已审核通过，审核人【运营机构管理员】，变更将于【2017-07-01】正式生效！","imageUrl":null,"app":"district","appId":382650684413050880,"appTag":null,"appName":null,"appData":"district","isRead":false,"isCollection":false,"createdAt":1503282491000,"updatedAt":1503282491000},{"id":"51ca6365-a03f-492e-a577-2adefb192eb9","creatorId":null,"creatorType":"NORMAL","level":"NORMAL","title":"行政区划审核结果通知","content":"行政区划\"测试ccc\"(编号:900000)变更已审核通过，审核人【运营机构管理员】，变更将于【2017-07-01】正式生效！","imageUrl":null,"app":"district","appId":382650684413050880,"appTag":null,"appName":null,"appData":"district","isRead":false,"isCollection":false,"createdAt":1500533645000,"updatedAt":1500533645000},{"id":"29d99c24-87b9-4ab3-90e4-944dd852c6b6","creatorId":null,"creatorType":"NORMAL","level":"NORMAL","title":"行政区划审核结果通知","content":"行政区划\"南京市本级\"(编号:320199)变更已审核通过，审核人【运营机构管理员】，变更将于【2017-05-11】正式生效！","imageUrl":null,"app":"district","appId":382650684413050880,"appTag":null,"appName":null,"appData":"district","isRead":false,"isCollection":false,"createdAt":1494485767000,"updatedAt":1494485767000},{"id":"db8e7aa8-9261-4a6d-b316-34563df0bb0f","creatorId":null,"creatorType":"NORMAL","level":"NORMAL","title":"行政区划审核结果通知","content":"行政区划\"31313123\"(编号:323141)变更已审核通过，审核人【运营机构管理员】，变更将于【2017-05-23】正式生效！","imageUrl":null,"app":"district","appId":382650684413050880,"appTag":null,"appName":null,"appData":"district","isRead":false,"isCollection":false,"createdAt":1494313305000,"updatedAt":1494313305000},{"id":"59fa841e-8c4f-4f46-9f02-d83fc040a8a8","creatorId":null,"creatorType":"NORMAL","level":"NORMAL","title":"行政区划审核结果通知","content":"行政区划\"宁波市本级\"(编号:330299)变更已审核通过，审核人【运营机构管理员】，变更将于【2016-12-18】正式生效！","imageUrl":null,"app":"district","appId":382650684413050880,"appTag":null,"appName":null,"appData":"district","isRead":false,"isCollection":false,"createdAt":1482149956000,"updatedAt":1482149956000}]}}
  },
  "/user/privileges/getAppMenuTree": function () {
    return {"success":true,"result":[{"name":"工作台","icon":"icon-gongzuotai","href":"http://middle.test.cai-inc.com/dashboard/panel","path":null,"privileges":[],"child":[],"alias":null},{"name":"行政区划","icon":"icon-xingzhengquhuaguanli","href":"","path":null,"privileges":[],"child":[{"name":"行政区划管理","icon":"","href":"http://middle.test.cai-inc.com/district/manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"机构列表","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/org-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"机构初始化","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/init","path":null,"privileges":[],"child":[],"alias":null},{"name":"配置初始化","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/init-set","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"属性管理","icon":"icon-shangpinleimuguanli","href":"","path":null,"privileges":[],"child":[{"name":"属性业务类别","icon":"","href":"http://admin.test.cai-inc.com/categoryMange/business","path":null,"privileges":[],"child":[],"alias":null},{"name":"属性管理","icon":"","href":"http://admin.test.cai-inc.com/categoryMange/attribute","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"类目管理","icon":"icon-shangpinleimuguanli","href":"","path":null,"privileges":[],"child":[{"name":"后台类目","icon":"","href":"http://admin.test.cai-inc.com/categories/backend","path":null,"privileges":[],"child":[],"alias":null},{"name":"前台类目","icon":"","href":"http://admin.test.cai-inc.com/categories/frontend","path":null,"privileges":[],"child":[],"alias":null},{"name":"SPU审核","icon":"","href":"http://admin.test.cai-inc.com/categories/spu-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"SPU管理","icon":"","href":"http://admin.test.cai-inc.com/categories/spu-list-operate","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"采购目录","icon":"icon-shangpinleimuguanli","href":"","path":null,"privileges":[],"child":[{"name":"采购目录管理","icon":"","href":"http://middle.test.cai-inc.com/gpcatalog/manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"采购目录关联","icon":"","href":"http://middle.test.cai-inc.com/gpcatalog/associate","path":null,"privileges":[],"child":[],"alias":null},{"name":"采购目录审核","icon":"","href":"http://middle.test.cai-inc.com/gpcatalog/check","path":null,"privileges":[],"child":[],"alias":null},{"name":"采购目录配置","icon":"","href":"http://middle.test.cai-inc.com/gpcatalog/config","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"协议入围管理","icon":"icon-yusuanguanli","href":"","path":null,"privileges":[],"child":[{"name":"配件列表","icon":"","href":"http://protocol.test.cai-inc.com/Goodsmanage/parts-manage-operation/list","path":null,"privileges":[],"child":[],"alias":null},{"name":"协供货商列表","icon":"","href":"http://protocol.test.cai-inc.com/protocolSupplier/operation/list","path":null,"privileges":[],"child":[],"alias":null},{"name":"协议商品管理","icon":"","href":"http://protocol.test.cai-inc.com/agreement/operation-manage-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"商品变更历史","icon":"","href":"http://protocol.test.cai-inc.com/agreement/operation-history-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"招标式项目","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/list/bidModeList","path":null,"privileges":[],"child":[],"alias":null},{"name":"承诺式项目","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/list/promiseModeList","path":null,"privileges":[],"child":[],"alias":null},{"name":"完结项目录入","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/list/offLineModeList","path":null,"privileges":[],"child":[],"alias":null},{"name":"招标式入围","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/protocolList/supplierBidList","path":null,"privileges":[],"child":[],"alias":null},{"name":"承诺式入围","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/protocolList/supplierPromiseList","path":null,"privileges":[],"child":[],"alias":null},{"name":"协议录入","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/protocolList/supplierFillList","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"商品管理","icon":"icon-shangpinguanli","href":"","path":null,"privileges":[],"child":[{"name":"品牌管理","icon":"","href":"http://admin.test.cai-inc.com/items/brands","path":null,"privileges":[],"child":[],"alias":null},{"name":"品牌审核","icon":"","href":"http://admin.test.cai-inc.com/items/brand-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"商品管理","icon":"","href":"http://admin.test.cai-inc.com/items/items","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"迁移管理","icon":"icon-shangpinguanli","href":"","path":null,"privileges":[],"child":[{"name":"任务列表","icon":"","href":"http://admin.test.cai-inc.com/mission/center","path":null,"privileges":[],"child":[],"alias":null},{"name":"商品迁移","icon":"","href":"http://admin.test.cai-inc.com/items/items_transfer/create","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"站点管理","icon":"icon-zhandianguanli","href":"","path":null,"privileges":[],"child":[{"name":"站点管理","icon":"","href":"http://www.test.cai-inc.com/system/sites","path":null,"privileges":[],"child":[],"alias":null},{"name":"店铺模板管理","icon":"","href":"http://www.test.cai-inc.com/system/templates","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"供应商管理","icon":"icon-gongyingshangguanli","href":"","path":null,"privileges":[],"child":[{"name":"供应商查询","icon":"","href":"http://supplier.test.cai-inc.com/supplier/query","path":null,"privileges":[],"child":[],"alias":null},{"name":"服务信息配置","icon":"","href":"http://supplier.test.cai-inc.com/supplier/customerServiceBackSet","path":null,"privileges":[],"child":[],"alias":null},{"name":"供应商网超协议","icon":"","href":"http://salesarea.test.cai-inc.com/supplier/supplier-agreement?pageSize=10","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"代理机构管理","icon":"icon-dailijigouguanli","href":"","path":null,"privileges":[],"child":[{"name":"机构查询管理","icon":"","href":"http://agency.test.cai-inc.com/#/agencyQuery/list","path":null,"privileges":[],"child":[],"alias":null},{"name":"公示管理配置","icon":"","href":"http://agency.test.cai-inc.com/#/manageConfig/notice","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"评价管理","icon":"icon-pingjiaguanli","href":"","path":null,"privileges":[],"child":[{"name":"评价指标配置","icon":"","href":"http://middle.test.cai-inc.com/ruleConfig/evaluateRules","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"申诉管理","icon":"icon-jubaoshensuguanli","href":"","path":null,"privileges":[],"child":[{"name":"申诉列表","icon":"","href":"http://middle.test.cai-inc.com/appeal/appeal-order","path":null,"privileges":[],"child":[],"alias":null},{"name":"申诉指标配置","icon":"","href":"http://middle.test.cai-inc.com/ruleConfig/typeDefineRules","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"举报管理","icon":"icon-jubaoshensuguanli","href":"","path":null,"privileges":[],"child":[{"name":"举报列表","icon":"","href":"http://middle.test.cai-inc.com/report/report-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"举报指标配置","icon":"","href":"http://middle.test.cai-inc.com/ruleConfig/reportRules","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"诚信管理","icon":"icon-chengxinguanli","href":"","path":null,"privileges":[],"child":[{"name":"诚信类型配置","icon":"","href":"http://middle.test.cai-inc.com/ruleConfig/rewardPunishRules","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"预警管理","icon":"icon-cebianlanyujing","href":"http://middle.test.cai-inc.com/warning/message","path":null,"privileges":[],"child":[],"alias":null},{"name":"公告管理","icon":"icon-cjgg","href":"","path":null,"privileges":[],"child":[{"name":"公告列表","icon":"","href":"http://middle.test.cai-inc.com/announcement/list/list-table","path":null,"privileges":[],"child":[],"alias":null},{"name":"公告类型","icon":"","href":"http://middle.test.cai-inc.com/announcement/type/main","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"组织管理","icon":"icon-jigouguanli","href":"","path":null,"privileges":[],"child":[{"name":"用户查询","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/user-query","path":null,"privileges":[],"child":[],"alias":null},{"name":"用户管理","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/user-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"部门管理","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/dep-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"部门信息","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/dep-info","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"系统权限管理","icon":"icon-quanxianguanli","href":"","path":null,"privileges":[],"child":[{"name":"用户类别管理","icon":"","href":"http://middle.test.cai-inc.com/privilege/categoryManage","path":null,"privileges":[],"child":[],"alias":null},{"name":"功能管理","icon":"","href":"http://middle.test.cai-inc.com/privilege/privilegeManage","path":null,"privileges":[],"child":[],"alias":null},{"name":"角色管理","icon":"","href":"http://middle.test.cai-inc.com/privilege/roleManage","path":null,"privileges":[],"child":[],"alias":null},{"name":"岗位管理","icon":"","href":"http://middle.test.cai-inc.com/privilege/positionManage","path":null,"privileges":[],"child":[],"alias":null},{"name":"岗位模板管理","icon":"","href":"http://middle.test.cai-inc.com/privilege/positionTemplateManage","path":null,"privileges":[],"child":[],"alias":null},{"name":"流程模板","icon":"","href":"http://middle.test.cai-inc.com/privilege/procedureManage","path":null,"privileges":[],"child":[],"alias":null},{"name":"工作流配置","icon":"","href":"http://middle.test.cai-inc.com/front-workflow/workflowConfig","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"业务管理","icon":"icon-jigouguanli","href":"","path":null,"privileges":[],"child":[{"name":"用户管理","icon":"","href":"http://middle.test.cai-inc.com/orgmanage/biz-user-manage","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"业务查询","icon":"icon-yusuanguanli","href":"","path":null,"privileges":[],"child":[{"name":"用户查询","icon":"","href":"http://customer.test.cai-inc.com/customer-service/reporting/user-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"预算指标查询","icon":"","href":"http://pay.test.cai-inc.com/customer-service/reporting/budget-quota","path":null,"privileges":[],"child":[],"alias":null},{"name":"采购计划查询","icon":"","href":"http://pay.test.cai-inc.com/customer-service/reporting/pplan","path":null,"privileges":[],"child":[],"alias":null},{"name":"项目查询","icon":"","href":"http://bidding.test.cai-inc.com/xmgl/projectQuery/list","path":null,"privileges":[],"child":[],"alias":null},{"name":"需求单查询","icon":"","href":"http://www.test.cai-inc.com/customer/requisitions","path":null,"privileges":[],"child":[],"alias":null},{"name":"预购单查询","icon":"","href":"http://www.test.cai-inc.com/customer/purchases","path":null,"privileges":[],"child":[],"alias":null},{"name":"订单查询","icon":"","href":"http://www.test.cai-inc.com/customer/orders","path":null,"privileges":[],"child":[],"alias":null},{"name":"结算单查询","icon":"","href":"http://pay.test.cai-inc.com/customer-service/reporting/settlement","path":null,"privileges":[],"child":[],"alias":null},{"name":"网商银行来款查询","icon":"","href":"http://pay.test.cai-inc.com/customer-service/reporting/receivablesRecord","path":null,"privileges":[],"child":[],"alias":null},{"name":"付款记录查询","icon":"","href":"http://pay.test.cai-inc.com/customer-service/reporting/payment-record","path":null,"privileges":[],"child":[],"alias":null},{"name":"在线询价查询","icon":"","href":"http://inquiry.test.cai-inc.com/online-agree/operate/inquiryProject","path":null,"privileges":[],"child":[],"alias":null},{"name":"协议采购查询","icon":"","href":"http://test.cai-inc.com/lasvegas/online-agree/operate/biddingProject","path":null,"privileges":[],"child":[],"alias":null},{"name":"合同查询","icon":"","href":"http://test.cai-inc.com/vienna/online-agree/operate/contract","path":null,"privileges":[],"child":[],"alias":null},{"name":"品牌查询","icon":"","href":"http://customer.test.cai-inc.com/customer-service/reporting/brands-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"商品查询","icon":"","href":"http://customer.test.cai-inc.com/customer-service/reporting/goodslist?step=1#1","path":null,"privileges":[],"child":[],"alias":null},{"name":"定点协议查询","icon":"","href":"http://fixed-hotel.test.cai-inc.com/operator/fixed_protocol/fixed_protocol_list","path":null,"privileges":[],"child":[],"alias":null},{"name":"定点会议交易查询","icon":"","href":"http://fixed-hotel.test.cai-inc.com/operator/fixed_protocol/meeting_training_trade_list","path":null,"privileges":[],"child":[],"alias":null},{"name":"委托单查询","icon":"","href":"http://test.cai-inc.com/bidding-open/agentOrder/query","path":null,"privileges":[],"child":[],"alias":null},{"name":"医疗采购查询","icon":"","href":"http://test.cai-inc.com/health/online-agree/operate/biddingProject","path":null,"privileges":[],"child":[],"alias":null},{"name":"委托协议查询","icon":"","href":"http://test.cai-inc.com/bidding-open/commission/query","path":null,"privileges":[],"child":[],"alias":null},{"name":"通用定点联系单查询","icon":"","href":"http://fixed.test.cai-inc.com/universal/operator/contact-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"通用定点合同查询","icon":"","href":"http://fixed.test.cai-inc.com/universal/operator/order-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"车辆入库查询","icon":"","href":"http://vehicle.test.cai-inc.com/office/car/informationListYunying","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"业务统计","icon":"icon-yusuanguanli","href":"","path":null,"privileges":[],"child":[{"name":"订单统计","icon":"","href":"http://customer.test.cai-inc.com/statistics/order","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"结算管理","icon":"icon-yusuanguanli","href":"","path":null,"privileges":[],"child":[{"name":"应收账款列表","icon":"","href":"http://pay.test.cai-inc.com/customer-service/settlement/payRecords","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"专家库管理","icon":"icon-zhuanjiachouquguanli","href":"","path":null,"privileges":[],"child":[{"name":"专家管理","icon":"","href":"http://experts.test.cai-inc.com/expert/service/expert-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"代抽项目管理","icon":"","href":"http://experts.test.cai-inc.com/expert/service/project-list","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"抽取专家审核","icon":"icon-zhuanjiachouqushenhe","href":"","path":null,"privileges":[],"child":[{"name":"抽取专家审核","icon":"","href":"http://experts.test.cai-inc.com/expert/extraction/check","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"标签管理","icon":"icon-shangpinleimuguanli","href":"","path":null,"privileges":[],"child":[{"name":"类目标签","icon":"","href":"http://admin.test.cai-inc.com/categories/label-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"采购单位标签","icon":"","href":"http://admin.test.cai-inc.com/labelManage/purchase-unit-label","path":null,"privileges":[],"child":[],"alias":null},{"name":"供应商标签","icon":"","href":"http://admin.test.cai-inc.com/labelManage/supplier-label","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"入围申请","icon":"icon-menu_pzgl_pbgzp","href":"","path":null,"privileges":[],"child":[{"name":"招标式入围","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/protocolList/supplierBidList","path":null,"privileges":[],"child":[],"alias":null},{"name":"承诺式入围","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/protocolList/supplierPromiseList","path":null,"privileges":[],"child":[],"alias":null},{"name":"协议录入","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/protocolList/supplierFillList","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"商品配件","icon":"icon-menu_pzgl_fxjjp","href":"","path":null,"privileges":[],"child":[{"name":"协议配件管理","icon":"","href":"http://protocol.test.cai-inc.com/Goodsmanage/parts-manage/list","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"供货商","icon":"icon-menu_pzgl_zxxjp","href":"","path":null,"privileges":[],"child":[{"name":"供货商管理","icon":"","href":"http://protocol.test.cai-inc.com/protocolSupplier/dealer/list","path":null,"privileges":[],"child":[],"alias":null},{"name":"供应商管理","icon":"","href":"http://protocol.test.cai-inc.com/protocolSupplier/supplier/list","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"入围协议","icon":"icon-yusuanguanli","href":"","path":null,"privileges":[],"child":[{"name":"协议管理","icon":"","href":"http://protocol.test.cai-inc.com/agrproject/protocolList/supplierManageList","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"服务协议","icon":"icon-shangpinguanli","href":null,"path":null,"privileges":[],"child":[{"name":"服务协议管理","icon":null,"href":"http://admin.test.cai-inc.com/service/service-manage","path":null,"privileges":[],"child":[],"alias":null},{"name":"供应商服务管理","icon":null,"href":"http://admin.test.cai-inc.com/service/supplier-service-manage","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"医疗设备入围","icon":"icon-xieyiruweiguanli","href":"","path":null,"privileges":[],"child":[{"name":"商品列表","icon":"","href":"http://protocol.test.cai-inc.com/medical/agreement/supervision-manage-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"配件列表","icon":"","href":"http://protocol.test.cai-inc.com/medical/Goodsmanage/parts-audit/supervision-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"供货商列表","icon":"","href":"http://protocol.test.cai-inc.com/medical/protocolSupplier/purchase/supervision-list","path":null,"privileges":[],"child":[],"alias":null},{"name":"协议列表","icon":"","href":"http://protocol.test.cai-inc.com/medical/agrproject/protocolList/supervision-signedList","path":null,"privileges":[],"child":[],"alias":null},{"name":"项目列表","icon":"","href":"http://protocol.test.cai-inc.com/medical/agrproject/list/supervision-offLineModeList","path":null,"privileges":[],"child":[],"alias":null},{"name":"抽取专家审核","icon":"","href":"http://protocol.test.cai-inc.com/medical/agrproject/supplierAuth","path":null,"privileges":[],"child":[],"alias":null},{"name":"抽取专家审核","icon":"","href":"http://protocol.test.cai-inc.com/medical/agrproject/supplierAuthList","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"通用定点","icon":"icon-htgl","href":null,"path":null,"privileges":[],"child":[{"name":"通用定点设置","icon":"","href":"http://fixed.test.cai-inc.com/universal/operator/business-setup","path":null,"privileges":[],"child":[],"alias":null},{"name":"竞价规则设置","icon":"","href":"http://fixed.test.cai-inc.com/universal/operator/bidding-setup","path":null,"privileges":[],"child":[],"alias":null},{"name":"评分模板","icon":"","href":"http://fixed.test.cai-inc.com/universal/operator/rating-temp","path":null,"privileges":[],"child":[],"alias":null},{"name":"业务设置","icon":"","href":"http://fixed.test.cai-inc.com/universal/pm/business-setup","path":null,"privileges":[],"child":[],"alias":null},{"name":"自定义字段","icon":"","href":"http://fixed.test.cai-inc.com/universal/operator/custom-field","path":null,"privileges":[],"child":[],"alias":null}],"alias":null},{"name":"流程管理","icon":"icon-navicon-lcpz","href":"","path":null,"privileges":[],"child":[{"name":"平台配置","icon":"","href":"http://middle.test.cai-inc.com/front-workflow/workflowConfigSys?type=1","path":null,"privileges":[],"child":[],"alias":null},{"name":"租户配置","icon":"","href":"http://middle.test.cai-inc.com/front-workflow/workflowConfigDist?type=2","path":null,"privileges":[],"child":[],"alias":null}],"alias":null}],"error":null}
  },
  "/api/test": function () {
    const data = Mock.mock({
      'list|1-10': [{
        name: Mock.Random.cname(),
        'age|18-60': 1,
        email:Mock.mock('@EMAIL()'),
      }]
    })
    return data.list
  },
  '/operating/inspection/result/get': function() {
    return {
      code:200,
      data: {
        createdAt: '2018年04月27日',
        finishedAt: '2018年04月29日',
        protocolItemTotal: '116',
        attrViolationTotal: '14',
        categorys: ['京东','taobao'],
        channels: ['网上超市','电子卖场'],
        designatedNum: '0',
        districts: ['浙江省本级'],
        insContent: '价格，属性',
        insTaskName: '测试任务',
        isComparePrice: 0,
        onlySelling: 0,
        onlyShelf: 1,
        priceViolationTotal: 15,
        supplierViolationTotal: 2,
        suppliers: ['供应商A','gysB'],
        timeCost: '2天13小时',
        total: 1000,
        violationTotal: 51,
      }
    }
  },
  '/operating/inspection/sku/price/paging': function () {
    return {
      "code": "0",
      "data": {
        "data": [
          {
            "averagePrice": 8000,
            "categoryName": "手机",
            "channel": "网上超市",
            "compareResult": -25,
            "districtName": "浙江省本级",
            "prices": [
              {
                "imageUrl": "www",
                "price": 8000,
                "priceUrl": "www"
              },
              {
                "imageUrl": "yyy",
                "price": 7900,
                "priceUrl": "yyy"
              },
              {
                "imageUrl": "zzz",
                "price": 8100,
                "priceUrl": "zzz"
              }
            ],
            "skuName": "iPhoneX Red",
            "supplier": "A供应商"
          }
        ],
        "total": 1
      },
      "message": "成功！",
      "success": true
    }
  },
  '/operating/common/channel/price/paging': function() {
    return {
      "code": 0,
      "data": [
        {
          "proLowPercent": "true",
          "districtCode": "",
          "dateMonth": 12,
          "districtName": 'zhejiang',
          "netHighNumbers": 120,
          "netLowNumbers": 34,
          "netLowPercent": 14,
          "netSkuNumbers": 45,
          "proHighNumbers": 56,
          "proLowNumbers": 23,
          "proSkuNumbers": 34,
        },
        {
          "proLowPercent": "true",
          "districtCode": "",
          "dateMonth": 12,
          "districtName": 'zhejiang',
          "netHighNumbers": 120,
          "netLowNumbers": 34,
          "netLowPercent": 14,
          "netSkuNumbers": 45,
          "proHighNumbers": 56,
          "proLowNumbers": 23,
          "proSkuNumbers": 34,
        }
      ],
      "message": "成功！",
      "success": true
    }
  },
  '/operating/inspection/bench/next/item/info': function() {
    return {
      "code":"0",
      "message":"成功！",
      "success":true,
      "data":{
        "itemId":9381789,
        "channelType":2,
        "checkPrice":true,
        "checkAttribute":true,
        "baseInfo":{
          "id":9381789,
          "name":"HP云舒测试商品",
          "mainImage":"http://demo-item.img-cn-hangzhou.aliyuncs.com//2018013116593143541138.png",
          "images":null,
          "brandName":null,
          "itemCode":"123456783214",
          "status":0,
          "lowPrice":100,
          "highPrice":100,
          "origin":{
            "limit":"0",
            "countryId":"2",
            "countryName":"阿富汗",
            "provinceId":"110000",
            "provinceName":"北京",
            "cityId":"110100",
            "cityName":"北京市",
            "regionId":"0",
            "regionName":""
          },
          "source":null,
          "layer":null,
          "baseItemId":null,
          "channelItemId":null,
          "agreementId":null,
          "richText":"",
          "extra":{
            "unit":"件",
            "selfPlatformLink":"",
            "birthday":"",
            "firm":"惠普",
            "weight":"1kg",
            "needInstalled":"1"
          }
        },
        "currentNumber":10,
        "completeNumber":9,
        "taskItemTotal":10,
        "insTaskName":"协议网超双渠道-泠墨",
        "groupOtherAttributes":[
          {
            "group":"普通属性",
            "otherAttributes":[
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"需要",
                "composite":null,
                "attrKey":"是否需要安装",
                "propertyId":82547,
                "group":"普通属性",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"惠普",
                "composite":null,
                "attrKey":"生产厂商",
                "propertyId":82546,
                "group":"普通属性",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"畅游人Pavilion360-11",
                "composite":null,
                "attrKey":"型号",
                "propertyId":82542,
                "group":"普通属性",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"惠普/HP",
                "composite":null,
                "attrKey":"品牌",
                "propertyId":82541,
                "group":"普通属性",
                "multi":false
              }
            ]
          },
          {
            "group":"服务信息",
            "otherAttributes":[
              {
                "unit":"个月",
                "readOnlyBySeller":null,
                "attrVal":"36",
                "composite":null,
                "attrKey":"质保时间 (个月)",
                "propertyId":77121,
                "group":"服务信息",
                "multi":false
              }
            ]
          },
          {
            "group":"技术参数",
            "otherAttributes":[
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"4G",
                "composite":null,
                "attrKey":"内存容量",
                "propertyId":82637,
                "group":"技术参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"Windows7",
                "composite":null,
                "attrKey":"操作系统",
                "propertyId":82023,
                "group":"技术参数",
                "multi":false
              },
              {
                "unit":"GB",
                "readOnlyBySeller":null,
                "attrVal":"4",
                "composite":null,
                "attrKey":"硬盘容量 (GB)",
                "propertyId":77440,
                "group":"技术参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"性能级独立显卡",
                "composite":null,
                "attrKey":"显卡类型",
                "propertyId":77775,
                "group":"技术参数",
                "multi":false
              }
            ]
          },
          {
            "group":"USER_DEFINED",
            "otherAttributes":[
              {
                "unit":"英寸",
                "readOnlyBySeller":null,
                "attrVal":"22.1",
                "composite":null,
                "attrKey":"屏幕尺寸(英寸)",
                "propertyId":79578,
                "group":"USER_DEFINED",
                "multi":false
              }
            ]
          },
          {
            "group":"主要参数",
            "otherAttributes":[
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"20mm",
                "composite":null,
                "attrKey":"厚度",
                "propertyId":80646,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"4芯锂电池",
                "composite":null,
                "attrKey":"锂电池电芯数量",
                "propertyId":82482,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"一级",
                "composite":null,
                "attrKey":"能效等级",
                "propertyId":79712,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"0.5",
                "composite":null,
                "attrKey":"屏幕比例",
                "propertyId":79581,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"FHD背光，防炫目屏",
                "composite":null,
                "attrKey":"屏幕类型",
                "propertyId":79576,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"是",
                "composite":null,
                "attrKey":"是否PC平板二合一",
                "propertyId":82503,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"是",
                "composite":null,
                "attrKey":"是否超极本",
                "propertyId":82505,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"触摸板#触摸屏",
                "composite":null,
                "attrKey":"输入设备",
                "propertyId":82508,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"无线网卡#蓝牙",
                "composite":null,
                "attrKey":"通信技术类型",
                "propertyId":82509,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"触摸屏",
                "composite":null,
                "attrKey":"是否触摸屏",
                "propertyId":79095,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"1kg",
                "composite":null,
                "attrKey":"重量",
                "propertyId":82545,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":"ppi",
                "readOnlyBySeller":null,
                "attrVal":"1366x768",
                "composite":null,
                "attrKey":"屏幕分辨率 (ppi)",
                "propertyId":79577,
                "group":"主要参数",
                "multi":false
              },
              {
                "unit":null,
                "readOnlyBySeller":null,
                "attrVal":"无光驱",
                "composite":null,
                "attrKey":"光驱类型",
                "propertyId":80787,
                "group":"主要参数",
                "multi":false
              }
            ]
          }
        ],
        "groupSkuAttributes":[
    
        ],
        "skuInfos":[
          {
            "skuId":86090,
            "skuCode":null,
            "status":null,
            "outerSkuId":null,
            "image":null,
            "thumbnail":null,
            "name":"HP云舒测试商品",
            "attrs":null,
            "extraPrice":null,
            "price":100,
            "layer":null,
            "fullPrice":{
              "agreementPrice":100
            },
            "baseSkuId":null,
            "channelSkuId":null
          }
        ],
        "snapshotId":36,
        "backCategoryInfoList":[
          {
            "id":4400,
            "code":"d6jqqng24g",
            "pid":0,
            "name":"3C数码",
            "level":1,
            "status":1,
            "hasChildren":true,
            "hasSpu":false,
            "outerId":null,
            "priceCompareAttrId":null,
            "priceCompareUnitVal":null
          },
          {
            "id":4411,
            "code":"42gj012x36",
            "pid":4400,
            "name":"电脑/服务器/工作站",
            "level":2,
            "status":1,
            "hasChildren":true,
            "hasSpu":false,
            "outerId":null,
            "priceCompareAttrId":null,
            "priceCompareUnitVal":null
          },
          {
            "id":4619,
            "code":"7yjzrwe9m7",
            "pid":4411,
            "name":"笔记本电脑",
            "level":3,
            "status":1,
            "hasChildren":false,
            "hasSpu":false,
            "outerId":null,
            "priceCompareAttrId":null,
            "priceCompareUnitVal":null
          }
        ]
      }
    }
  },
  '/operating/common/category/top': function () {
    const data = Mock.mock({
      'data|1-10': [{
        code: Mock.Random.last(),
        'key|+1':12,
        level:1,
        hasChildren:true,
        name: Mock.Random.cname(),
        pid:1,
        children:[
          {
            code: Mock.Random.last(),
            'key|+1':50,
            name: Mock.Random.cname(),
          }
        ]
      }]
    })
    return data
  },
  '/operating/inspection/task/paging':function () {
    return {
      data: [
        {
          insTaskId:1,
          insTaskName:'test1',
          status:'0',
          taskItemNum:'100',
          taskProcessInfoes:[
            {
              insChildTaskId:11,
              insStaffId:123,
              insStaffName:'xxx1',
              taskProcess:'60'
            }
          ]
        }
      ]
    }
  },
   '/decorate/decorate/site/create':function(){
    return [
      {
        "distList": [
          "浙江省本级"
        ],
        "createTime": "2018-10-15",
        "creator": 544,
        "domain": "www.zcy.gov.cn",
        "id": 1,
        "name": "网超首页",
        "status": 0,
        "themeTone": "#65ff44",
        "updateTime": "2018-10-15",
        "updator": 33332222
      }
    ]
   },
}