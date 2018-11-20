import React, { Component } from 'react';
import { connect } from 'dva';
import { Panel, Button, ZcyBreadcrumb, Table, MultiCascader, Input, Select, DropList, message, Modal, Form } from 'doraemon';
import { create, getChildDiscode } from '../services';

let tempkeys = '';
const Option = Select.Option;
const breadcrumb = [{
  label: '站点管理',
  to: '',
}, {
  label: '页面管理',
  to: '',
}];
const FormItem = Form.Item;
// @connect(({ siteManger }) => ({
//   siteManger,
// }))

class pageMange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        columns: [],
      },
      options: [],
      visible: false,
      stopVisible: false,
      list: [],
    };
  }
  getClum = () => {
    const { options } = this.state;
    return [{
      label: '站点名称',
      id: 'queryMonth',
      render: () => {
        return <Input />;
      },
    }, {
      label: '生效区划',
      id: 'districtCodes',
      render: () => {
        const keys = tempkeys || new Date().getTime();
        return (
          <MultiCascader
            key={keys}
            options={options || []}
            loadData={this.loadData}
            changeOnSelect
          />
        );
      },
    }, {
      label: '站点状态',
      id: 'districtCodesa',
      render: () => {
        return (
          <Select
            style={{ width: 200 }}
          >
            <Option key="aa1">启用</Option>
            <Option key="aa11">停用</Option>
            <Option key="aa121">待发布</Option>
          </Select>
        );
      },
    }];
  };
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    getChildDiscode({
      pcode: targetOption.value,
    }).then((d) => {
      targetOption.loading = false;
      if (d.success) {
        const dataArr = this.changeOption(d.data);
        targetOption.children = dataArr;
        this.setState({
          options: [...this.state.options],
        });
      }
    });
  };
  getColumns() {
    const columns = [{
      title: '页面名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      fixed: 'left',
    }, {
      title: '页面地址',
      dataIndex: 'domain',
      key: 'domain',
      width: 200,
      fixed: 'left',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text === 0 ? '待发布' : '已停用';
        }
      },
    }, {
      title: '操作',
      dataIndex: 'proHighNumbers',
      key: 'proHighNumbers',
      render: () => {
        const itemList = [{
          label: '添加子页面',
          handleClick: () => {
            this.setState({
              stopVisible: true,
            });
          },
        }, {
          label: '撤回',
          handleClick: () => {
            console.log('back');
          },
        }, {
          label: '回退',
          handleClick: () => {
            console.log('back2');
          },
        }];
        return (
          <div>
            <a onClick={this.turn} style={{ marginRight: '20px' }}>装修</a>
            <DropList
              itemList={itemList}
            >
              <span>更多</span>
            </DropList>
          </div>
        );
      },
    }];
    this.setState({
      table: {
        columns,
      },
    });
  }
  componentDidMount() {
    this.getColumns();
  }
  turn = () => {
    window.open('http://localhost:8084/eevees/sites?page=main&type=page', '_blank');
  };
  changeOption = (d) => {
    const result = d.map((item) => {
      return {
        value: item.code,
        label: item.name,
        isLeaf: item.isLeaf,
        id: item.id,
      };
    });
    return result;
  }
  handleSearch = (params) => {
    const result = params;
    delete result.type;
    if (result.districtCodes && result.districtCodes.length === 0) {
      delete result.districtCodes;
    }
    // this.props.dispatch({
    //   type: 'siteManger/getCollect',
    //   payload: params,
    // });
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      const param = values;
      param.createTime = `2018-10-18 ${new Date().getHours()}:${new Date().getMinutes()}`;
      param.updateTime = `2018-10-18 ${new Date().getHours()}:${new Date().getMinutes()}`;
      console.log(param)
      // create(param).then((d) => {
      //   this.setState({
      //     list: d,
      //   });
      // });
      const arr = this.state.list || [];
      arr.push(param);
      this.setState({
        list: arr,
      });
      this.setState({ visible: false });
      message.success('新增成功');
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };
  stopSite = () => {
    this.setState({
      stopVisible: false,
      list: [
        {
          distList: [
            '浙江省本级',
          ],
          createTime: '2018-10-15',
          creator: 544,
          domain: 'www.zcy.gov.cn',
          id: 1,
          name: '网超首页',
          status: 1,
          themeTone: '#65ff44',
          updateTime: '2018-10-15',
          updator: 33332222,
        },
      ],
    });
  };
  getExtra = () => {
    return (
      <span>状态：待发布</span>
    );
  };
  addPage() {
    this.setState({
      visible: true,
    });
  }
  render() {
    const { list } = this.state;
    const paginations = {
      pageSize: 10,
      total: 10,
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const globalBtn = [{
      label: '返回',
      type: 'primary',
      to: '/sites',
    }];
    const keys = tempkeys || new Date().getTime();
    return (
      <div>
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={globalBtn}
        />
        <Panel
          title="政府采购云平台"
          extra={this.getExtra()}
        >
          <span>站点域名：网超首页 &nbsp;&nbsp;&nbsp;|</span>
          <span>&nbsp;&nbsp;&nbsp;主题色：</span>
          <div>生效区划：<b>浙江省本级、杭州市</b></div>
        </Panel>
        <Panel
          title="页面管理"
        >
          <p style={{ textAlign: 'right', marginBottom: '10px' }}>
            <Button onClick={this.createSite}>添加一级页面</Button>
          </p>
          <Table dataSource={list} columns={this.state.table.columns} />
        </Panel>
        <Modal
          ref={this.saveFormRef}
          visible={this.state.visible}
          title="新建"
          okText="创建"
          onCancel={this.handleCancel}
          onOk={this.handleCreate}
        >
          <Form layout="horizontal" id="siteform">
            <h3>页面信息</h3>
            <FormItem label="页面名称"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入页面名称' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="页面类型"
              {...formItemLayout}
            >
              {getFieldDecorator('lei', {
                rules: [{ required: true, message: '请输入页面名称' }],
              })(
                <Select
                  style={{ width: 200 }}
                  getPopupContainer={() => document.getElementById('siteform')}
                >
                  <Option key="red">频道页</Option>
                  <Option key="blue">搜索页</Option>
                  <Option key="green">商品页</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="页面模板"
              {...formItemLayout}
            >
              {getFieldDecorator('lei2', {
                rules: [{ required: true, message: '请输入页面名称' }],
              })(
                <Select
                  style={{ width: 200 }}
                  getPopupContainer={() => document.getElementById('siteform')}
                >
                  <Option key="main">首页模板</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="地址参数"
              {...formItemLayout}
            >
              {getFieldDecorator('domain', {
                rules: [{ required: true, message: '请输入站点域名' }],
              })(
                <span>
                  www.zcy.gov.cn&nbsp;&nbsp;
                  <Input style={{ width: '70px' }} />
                </span>
              )}
            </FormItem>
            <h3>SEO信息</h3>
            <FormItem label="页面标题"
              {...formItemLayout}
            >
              {getFieldDecorator('title2', {
                rules: [{ required: true, message: '请输入页面标题' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="关键词"
              {...formItemLayout}
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入关键词' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="页面描述"
              {...formItemLayout}
            >
              {getFieldDecorator('mark', {
                rules: [{ required: true, message: '请输入描述' }],
              })(
                <textarea style={{ border: '1px solid #d9d9d9', borderRadius: '6px', width: '220px' }} />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="停用站点"
          visible={this.state.stopVisible}
          onOk={this.stopSite}
        >
          <p style={{ textAlign: 'center' }}>停用后该站点下的所有子页面均无法访问</p>
          <p style={{ textAlign: 'center' }}>确认停用？</p>
        </Modal>
      </div>
    );
  }
  createSite = () => {
    this.setState({
      visible: true,
    });
  }
}
export default Form.create()(pageMange);
