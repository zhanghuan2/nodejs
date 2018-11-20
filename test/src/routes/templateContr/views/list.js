import React, { Component } from 'react';
import { connect } from 'dva';
import { ZcyList, ZcyBreadcrumb, MultiCascader, Input, Select, DropList, message, Modal, Form } from 'doraemon';
import { create, getChildDiscode, getDiscode } from '../services';

let tempkeys = '';
const Option = Select.Option;
const breadcrumb = [{
  label: '模板管理',
  to: '',
}];
const FormItem = Form.Item;
@connect(({ siteManger }) => ({
  siteManger,
}))

class InspectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        tabList: [{
          label: '全部模板',
          key: 1,
        }],
      },
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
    return [{
      label: '模板名称',
      id: 'queryMonth',
      render: () => {
        return <Input />;
      },
    }, {
      label: '模板类型',
      id: 'districtCodes',
      render: () => {
        return (
          <Select
            style={{ width: 200 }}
          >
            <Option key="aa1">频道页</Option>
            <Option key="aa11">列表页</Option>
            <Option key="aa121">详情页</Option>
            <Option key="aa1211">提示页</Option>
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
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    }, {
      title: '模板类型',
      dataIndex: 'themeTone',
      key: 'domain',
      width: 200,
    }, {
      title: '已应用站点/页面数',
      dataIndex: 'distList',
      key: 'distList',
      render: (text) => {
        if (text === null) {
          return '-';
        } else {
          return text;
        }
      },
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
      title: '最近更新时间1',
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
      title: '操作',
      dataIndex: 'proHighNumbers',
      key: 'proHighNumbers',
      fixed: 'right',
      width: 200,
      render: (text) => {
        return (
          <div>
            <a onClick={() => { this.editTemplate(text); }} style={{ marginRight: '20px' }}>编辑</a>
            <a style={{ marginRight: '20px' }}>删除</a>
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
  editTemplate = () => {
    window.open('http://localhost:8084/eevees/sites', '_blank');
  };
  componentDidMount() {
    this.getColumns();
    // this.props.dispatch({
    //   type: 'siteManger/getCollect',
    // });
    getDiscode().then((d) => {
      if (d.success) {
        const arr = this.changeOption(d.data);
        tempkeys = new Date().getTime();
        this.setState({
          options: arr,
        });
      }
    });
  }
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
    this.props.dispatch({
      type: 'siteManger/getCollect',
      payload: params,
    });
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
      console.log(param);
      param.createTime = `2018-10-18 ${new Date().getHours()}:${new Date().getMinutes()}`;
      param.updateTime = `2018-10-18 ${new Date().getHours()}:${new Date().getMinutes()}`;
      param.distList = '0/0';
      // create(param).then((d) => {
      //   this.setState({
      //     list: d,
      //   });
      // });
      const list = this.state.list;
      list.push(param);
      this.setState({
        list,
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
  render() {
    const { siteManger } = this.props;
    const { tabs, table, operationCol, list } = this.state;
    const paginations = {
      pageSize: 10,
      total: siteManger.list.total,
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const globalBtn = [{
      label: '新增模板',
      type: 'primary',
      onClick: () => {
        this.createSite();
      },
    }];
    const keys = tempkeys || new Date().getTime();
    return (
      <div>
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={globalBtn}
        />
        <ZcyList
          customItem={this.getClum()}
          tabs={tabs}
          tabKey="type"
          table={{
            ...table,
            dataSource: list, //siteManger.list.data,
            scroll: {
              x: 1300,
            },
            pagination: paginations,
          }}
          operationCol={operationCol}
          onSearch={this.handleSearch}
        />
        <Modal
          ref={this.saveFormRef}
          visible={this.state.visible}
          title="新建"
          okText="创建"
          onCancel={this.handleCancel}
          onOk={this.handleCreate}
        >
          <Form layout="horizontal" id="siteform">
            <FormItem label="模板名称"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入模板名称' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="模板类型"
              {...formItemLayout}
            >
              {getFieldDecorator('themeTone', {
                rules: [{ required: true, message: '请输入模板类型' }],
              })(
                <Select
                  style={{ width: 200 }}
                  getPopupContainer={() => document.getElementById('siteform')}
                >
                  <Option key="aa1">频道页</Option>
                  <Option key="aa11">列表页</Option>
                  <Option key="aa121">详情页</Option>
                  <Option key="aa1211">提示页</Option>
                </Select>
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
  createSite() {
    this.setState({
      visible: true,
    });
  }
}
export default Form.create()(InspectionList);
