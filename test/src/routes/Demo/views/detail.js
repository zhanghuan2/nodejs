import React, { Component } from 'react';
import { connect } from 'dva';
import { Panel, MultiCascader, ZcyTimeline, Form, Row, Col, Button, Select, DatePicker, Table, Input, Icon } from 'doraemon';

const FormItem = Form.Item;
const SelectOption = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const addressColumns = [{
  title: '序号',
  render: (text, record, index) => index + 1,
}, {
  title: '详细地址',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '收货人',
  dataIndex: 'owner',
  key: 'owner',
}, {
  title: '手机',
  dataIndex: 'mobile',
  key: 'mobile',
}, {
  title: '电话',
  dataIndex: 'telphone',
  key: 'telphone',
}, {
  title: '商品数量',
  fixed: 'right',
  width: 150,
  render: () => {
    return <Input />;
  },
}, {
  title: '操作',
  fixed: 'right',
  width: 100,
  render: () => {
    return (
      <a href="#">删除</a>
    );
  },
}];

@connect(({ demoDetail }) => ({
  demoDetail,
}))
class DemoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'demoDetail/getOrderInfo',
    });
  }

  handleAddAddress = () => {
    console.log('添加收货地址');
  }

  render() {
    const { demoDetail } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { orderInfo } = demoDetail;

    const receiptExtra = (
      <Button
        style={{ marginTop: '-5px' }}
        type="secondary"
        onClick={this.handleAddAddress}
      >添加地址
      </Button>
    );
    const baseInfoTitle = (
      <div>
        <p>公车租赁联系单【PR-ZJ01-0001】</p>
        <p className="demo-detail-sub-title">
          <span><Icon />创建人：蜗牛</span>
          <span><Icon />创建时间：2018.01.30</span>
        </p>
      </div>
    );
    const baseInfoExtra = (
      <div>
        <div />
      </div>
    );

    return (
      <div>
        <Panel
          title={baseInfoTitle}
          extra={baseInfoExtra}
          shrink
        >
          <ZcyTimeline
            data={[
              {
                id: 60857,
                userId: 100018511,
                userName: '边防总队管理员',
                orgName: '浙江边防总队',
                sectName: '采购单位经办人',
                createAt: 1514445782000,
                userAction: '提交',
                isImportant: true,
                files: [
                  {
                    url: 'http://baidu.com',
                    name: '测试数据',
                  },
                  {
                    url: 'http://baidu.com',
                    name: '测试数据1',
                  },
                ],
              },
            ]}
            hasPrint
            onClickPrint={function () { alert('print'); }}
          />
        </Panel>
        <Panel
          title="收货地址及收货人信息"
          extra={receiptExtra}
        >
          <Row>
            <Col span={12}>
              <FormItem
                label="送货方式"
                required
                {...formItemLayout}
              >
                <Select defaultValue="test">
                  <SelectOption value="test">自提</SelectOption>
                  <SelectOption value="test1">邮寄</SelectOption>
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="送货时间"
                {...formItemLayout}
              >
                <DatePicker />
              </FormItem>
            </Col>
          </Row>
          <Table
            columns={addressColumns}
          />
        </Panel>
        <Panel
          title="订单基本信息"
        >
          <Form>
            <Row>
              <Col span={12}>
                <FormItem
                  label="联系人"
                  {...formItemLayout}
                >
                  {orderInfo.name}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="手机号码"
                  {...formItemLayout}
                >
                  {orderInfo.mobile}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="邮箱"
                  {...formItemLayout}
                >
                  {orderInfo.email}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="电话号码"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('telphone', {
                      initialValue: ['320100'],
                    })(
                      <MultiCascader
                        options={this.state.test}
                      />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Button onClick={() => {
          this.setState({
            test: [{
              value: '330000',
              label: '浙江',
              children: [{
                value: '330100',
                label: '杭州',
                children: [{
                  value: '330106',
                  label: '西湖区',
                }, {
                  value: '330105',
                  label: '拱墅',
                  disabled: true,
                }, {
                  value: '330108',
                  label: '滨江',
                }],
              }],
            }, {
              value: '320000',
              label: '江苏',
              checked: true,
              children: [{
                value: '320100',
                label: '南京',
                children: [{
                  value: '320114',
                  label: '雨花区',
                }],
              }],
            }],
          });
        }}
        />
      </div>
    );
  }
}

export default Form.create()(DemoDetail);
