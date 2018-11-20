module.exports = {
  list: {
    breadcrumb: [{
      label: '巡检工作台',
      to: '/Inspection/workDesk/list',
    }],
    columns: [
      { title: '任务ID', width: 100, dataIndex: 'age', key: 'age' },
      { title: '任务名称', width: 200, dataIndex: 'address', key: '1' },
      { title: '任务商品数', dataIndex: 'address', key: '2' },
      { title: '完成进度', dataIndex: 'address', key: '3' },
      { title: '操作', dataIndex: 'address', key: '4' },
    ],
  },
  step: {
    formItemLayout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    },
    formItemLayoutLine: {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 18,
      },
    },
  },
};
