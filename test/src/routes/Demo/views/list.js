import React, { Component } from 'react';
import { connect } from 'dva';
import { ZcyList, Input, ZcyBreadcrumb, Upload, Button, DatePicker } from 'doraemon';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  width: 120,
  fixed: true,
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  width: 150,
  fixed: true,
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '采购组织',
  dataIndex: 'purchaseOrg',
  key: 'purchaseOrg',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '创建日期',
  dataIndex: 'createDate',
  key: 'createDate',
}, {
  title: '创建人',
  dataIndex: 'creater',
  key: 'creater',
}];

const customItem = [{
  label: '名字',
  id: 'name',
  render: () => {
    return <Input />;
  },
}, {
  label: '年龄',
  id: 'age',
  render: () => {
    return <DatePicker />;
  },
}];

const breadcrumb = [{
  label: '首页',
  to: '/home',
}, {
  label: '列表',
  to: '/demo/list',
}];

@connect(({ demoList, privileges }) => ({
  demoList,
  privileges,
}))
export default class DemoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        tabList: [{
          label: 'test1',
          key: 1,
        }, {
          label: 'test2',
          key: 2,
        }],
      },
      table: {
        columns,
      },
      operationCol: {
        operationList: [{
          label: '编辑',
          handleClick: () => {
            console.log('edit');
          },
        }],
      },
      globalBtn: [{
        label: '保存',
        type: 'primary',
        to: '/demo/detail',
        onClick: () => {
          console.log('save');
        },
      }, {
        label: '提交',
        type: 'primary',
        onClick: () => {
          console.log('submit');
        },
      }],
    };
  }

  handleSearch = (params) => {
    this.props.dispatch({
      type: 'demoList/getCollect',
      payload: params,
    });
  }

  render() {
    const { demoList, privileges } = this.props;
    const { tabs, table, operationCol, globalBtn } = this.state;
    console.log(privileges);
    return (
      <div>
        <Upload.Download
          fileList={[{
            fileId: '1099OT/339900/100012584/20185/0cafda10-7e58-4972-8ab5-5b30d436880c',
            name: 'test',
          }]}
          bizCode="1099"
        />
        <Upload bizCode="1099"
          listType="picture-card"
          defaultFileList={[{
            fileId: '1099OT/339900/100012584/20185/7cdae5b2-cf52-4a12-ac15-787b6877f7df',
            name: 'test1',
          }, {
            fileId: '1099OT/339900/100012584/20185/0cafda10-7e58-4972-8ab5-5b30d436880c',
            name: 'test',
          }, {
            fileId: '1099OT/339900/100012584/20185/06d73505-10bc-4851-a0b9-bcc14a211fdf',
            name: 'test2',
          }]}
        ><Button>tset</Button>
        </Upload>
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={globalBtn}
        />
        <ZcyList
          customItem={customItem}
          tabs={tabs}
          tabKey="type"
          table={{
            ...table,
            dataSource: demoList.data,
          }}
          operationCol={operationCol}
          onSearch={this.handleSearch}
        />
      </div>
    );
  }
}
