module.exports = {
  list: {
    columns: [{
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      fixed: 'left',
    }, {
      title: '区划',
      dataIndex: 'districtName',
      key: 'districtName',
      width: 200,
      fixed: 'left',
    }, {
      title: 'SPU挂载网超SKU数',
      dataIndex: 'netSkuNumbers',
      key: 'netSkuNumbers',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: '高于指数价SKU数',
      dataIndex: 'netHighNumbers',
      key: 'netHighNumbers',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: '网超低价比',
      dataIndex: 'netLowPercent',
      key: 'netLowPercent',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: 'SPU挂载协议供货SKU数',
      dataIndex: 'proSkuNumbers',
      key: 'proSkuNumbers',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: '高于指数价SKU数',
      dataIndex: 'proHighNumbers',
      key: 'proHighNumbers',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: '协议供货低价比',
      dataIndex: 'proLowPercent',
      key: 'proLowPercent',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: '综合低价比',
      dataIndex: 'allPercent',
      key: 'allPercent',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }],
  },
};
