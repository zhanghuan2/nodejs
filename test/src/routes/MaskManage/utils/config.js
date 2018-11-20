module.exports = {
  baseInfoTitle1: '任务名称',
  baseInfoTitle2: '巡检范围',
  baseInfoTitle3: '巡检方式',
  baseInfoTitle4: '巡检结果',
  baseInfoTitle5: 'SKU价格巡检明细',
  formItemLayout: {
    labelCol: {
      xs: { span: 10 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 14 },
      sm: { span: 14 },
    },
  },
  columns1: [
    { title: '任务ID', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: '任务名称', dataIndex: 'address', key: '1' },
    { title: '任务商品数', dataIndex: 'address', key: '2' },
    { title: '完成进度', dataIndex: 'address', key: '3' },
    { title: '任务状态', dataIndex: 'address', key: '4' },
    { title: '操作', dataIndex: 'address', key: '5' },
  ],
};
