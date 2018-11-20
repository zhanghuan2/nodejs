import { ZcyList, Input, DropList } from 'doraemon';

module.exports = {
  list: {
    columns: [{
      title: '站点名称',
      dataIndex: 'index',
      key: 'index',
      width: 150,
      fixed: 'left',
    }, {
      title: '域名',
      dataIndex: 'districtName',
      key: 'districtName',
      width: 200,
      fixed: 'left',
    }, {
      title: '生效区划',
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
      title: '创建时间',
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
      title: '最近更新时间',
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
      title: '状态',
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
      title: '操作',
      dataIndex: 'proHighNumbers',
      key: 'proHighNumbers',
      render: (text) => {
        const itemList = index % 2 === 0 ? [{
          label: '编辑',
          handleClick: () => {
            console.log('edit');
          },
        }, {
          label: '编辑',
          handleClick: () => {
            console.log('edit');
          },
        }] : [{
          label: 'test',
          handleClick: () => {
            console.log('edit');
          },
        }, {
          label: 'test',
          handleClick: () => {
            console.log('edit');
          },
        }];
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }],
  },
};
