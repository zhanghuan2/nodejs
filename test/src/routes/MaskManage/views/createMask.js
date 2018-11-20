import debounce from 'lodash/debounce';
import { Panel, Form, Row, Col, Radio, Select, Switch, Input, Checkbox, ZcyBreadcrumb, Spin, message, MultiCascader } from 'doraemon';
import React, { Component } from 'react';
import { connect } from 'dva';
import { SearchTree } from '../utils/treeNode';
import { treeList, treequery, treeSearch, supplierList, saveForm, getTotalServ, getDiscode, getChildDiscode } from '../services';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
let searchV = '';
let originV = '';
let idArr = [];
const rules1 = {
  rules: [{
    required: true,
    message: '必选!',
  }],
};
const rules2 = {
  rules: [{
    required: true,
    message: '不能为空且名称必须小于40!',
    max: 40,
  }],
};
const breadcrumb = [{
  label: '巡检任务管理',
}, {
  label: '创建巡检任务',
}];
const selectoptions = [
  { label: '协议供货', value: 2 },
  { label: '网上超市', value: 1 },
];
const option2 = [
  { label: '价格', value: 'price' },
  { label: '属性', value: 'attribute' },
];
let treeTemp = '';
const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};
const RadioGroup = Radio.Group;
let checkArr = [];
let switchResult = true;
let allID = [];
@connect(({ createTask }) => ({
  createTask,
}))
class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    treeNode: [],
    data: [],
    value: [],
    fetching: false,
    save: false,
    total: 0,
    selectId: [],
    options: [],
    districtCodes: [],
    nodeKey: new Date().getTime(),
    showPrice: false,
    allselect: true,
  };
  fetchUser = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    const { districtCodes } = this.state;
    supplierList({
      categoryIds: checkArr,
      channels: [1, 2],
      districtCodes,
      queryName: value,
    })
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.map(user => ({
          text: user.supplierName,
          value: user.supplierId,
        }));
        this.setState({ data, fetching: false });
      });
  };
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
    const arr = value.map(item => item.key - 0);
    this.getTotal('supplierIds', arr);
  };
  componentDidMount() {
    treeList().then((d) => {
      if (d.success) {
        treeTemp = d.data;
        idArr = treeTemp.map(item => (item.id).toString());
        this.setState({
          treeNode: treeTemp,
          selectId: idArr,
        });
        checkArr = idArr;
        allID = checkArr;
        this.getTotal('categoryIds', idArr);
      } else {
        message.error(d.message);
      }
    });
    getDiscode().then((d) => {
      if (d.success) {
        const arr = this.changeOption(d.data);
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
  getBtn = () => {
    const { save } = this.state;
    const button = save ? [{
      label: '返回',
      type: 'secondary',
      to: '/maskManage/list',
    }] : [{
      label: '返回',
      type: 'secondary',
      to: '/maskManage/list',
    }, {
      label: '创建',
      type: 'primary',
      onClick: () => {
        this.saveform();
      },
    }];
    return button;
  };
  saveform = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = this.changeParams(values);
        saveForm(result).then((d) => {
          if (d.success) {
            message.success('创建成功');
            location.href = '/operating-front/#/maskManage/list';
          } else {
            message.error(d.message);
          }
        });
      }
    });
  };
  getTotalParam = () => {
    const { value, districtCodes } = this.state;
    const arr = value.map(item => item.key - 0);
    const temp = this.props.form.getFieldsValue();
    const result = {};
    result.categoryIds = checkArr;
    result.channelIds = temp.channelCodes;
    result.onlySelling = Number(temp.onlySelling);
    result.onlyShelf = Number(temp.onlyShelf);
    result.supplierIds = arr;
    result.districtCodes = districtCodes;
    return result;
  };
  changeParams = (d) => {
    const { value, districtCodes } = this.state;
    const arr = value.map(item => item.key);
    const result = d || this.props.form.getFieldsValue();
    result.categoryIds = checkArr;
    result.designatedNum = Number(result.designatedNum);
    result.onlySelling = Number(result.onlySelling);
    result.onlyShelf = Number(result.onlyShelf);
    result.marketPriceType = Number(result.marketPriceType); // 市场价计算方式 0, "算术平均数".   1, "加权平均数"
    result.insMethod = (result.insMethod || []).join(',');
    if (result.insMethod.indexOf('price') > -1) {
      result.isComparePrice = switchResult ? 1 : 0;
    } else {
      result.isComparePrice = 0;
    }
    result.supplierIds = arr;
    result.districtCodes = districtCodes;
    return result;
  };
  onCheck = (d) => {
    checkArr = d;
    console.log(d);
    this.setState({
      selectId: checkArr,
      allselect: allID.toString() === checkArr.toString(),
    });
    this.getTotal();
  };
  getTotal = (name, v) => {
    // const param = {};
    // param.categoryIds = checkArr;
    const param = this.getTotalParam();
    if (name) {
      param[name] = v;
    }
    getTotalServ(param).then((d) => {
      if (d.success) {
        this.setState({
          total: d.data || 0,
        });
      }
    });
  };
  changeBox = (v) => {
    const param = this.getTotalParam();
    param.channelIds = v;
    getTotalServ(param).then((d) => {
      if (d.success) {
        this.setState({
          total: d.data || 0,
        });
      }
    });
  }
  // onlySelling
  changeradio = (v) => {
    const param = this.getTotalParam();
    param.onlySelling = Number(v.target.value);
    getTotalServ(param).then((d) => {
      if (d.success) {
        this.setState({
          total: d.data || 0,
        });
      }
    });
  };
  // onlyShelf
  changeradio2 = (v) => {
    const param = this.getTotalParam();
    param.onlyShelf = Number(v.target.value);
    getTotalServ(param).then((d) => {
      if (d.success) {
        this.setState({
          total: d.data || 0,
        });
      }
    });
  };
  search = () => {
    if (!searchV) {
      if (originV !== searchV) {
        originV = searchV;
        this.setState({
          treeNode: treeTemp,
          nodeKey: new Date().getTime(),
        });
      }
    } else {
      if (originV === searchV) {
        return;
      }
      originV = searchV;
      treeSearch({
        name: searchV,
      }).then((d) => {
        if (d.success) {
          this.setState({
            treeNode: this.changeData(d.data),
          });
        } else {
          this.setState({
            treeNode: [],
          });
        }
      });
    }
  };
  changeData = (d) => {
    const result = {};
    const newData = d.map((item) => {
      let temp = {};
      if (item.parent) {
        if (item.parent.parent) {
          temp = item.parent.parent;
          temp.children = [item.parent];
          temp.children[0].children = [item];
        } else {
          temp = [item.parent];
          temp.children = [item];
        }
      } else {
        temp = item;
      }
      return temp;
    });
    newData.map((item) => {
      const id = item.id;
      if (!result[id]) {
        result[id] = {
          pdata: item,
          children: item.children || false,
        };
      } else {
        const index = this.getIndex(result[id].children, item.children[0]);
        index > -1 ?
          result[id].children[index].children.push(item.children[0].children[0])
          :
          result[id].children.push(item.children[0]);
      }
    });
    const dataArr = [];
    for (const pop in result) {
      if (result[pop].pdata) {
        const obj = result[pop].pdata;
        obj.children = result[pop].children;
        dataArr.push(obj);
      }
    }
    return dataArr;
  };
  getIndex = (data, item) => {
    let result = -1;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id === item.id) {
        result = i;
        break;
      }
    }
    return result;
  }
  onChange = (e) => {
    searchV = e.target.value;
  };
  onLoadData = (treeNode) => {
    if (treeNode.props.children) {
      return new Promise((resolve) => {
        resolve();
        return '';
      });
    }
    return treequery({ pid: treeNode.props.dataRef.id }).then((d) => {
      treeNode.props.dataRef.children = d;
      this.setState({
        treeNode: [...this.state.treeNode],
      });
    });
  }
  selectall = (e) => {
    if (e.target.checked) {
      this.setState({
        allselect: true,
        selectId: idArr,
      });
      checkArr = idArr;
    } else {
      this.setState({
        allselect: false,
        selectId: [],
      });
      checkArr = [];
    }
    this.getTotal();
  };
  qhonChange = (value) => {
    this.setState({
      districtCodes: value,
    });
    this.getTotal('districtCodes', value);
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
  getQh = (op) => {
    if (op && op.length > 0) {
      return (
        <MultiCascader
          options={op}
          onChange={this.qhonChange}
          loadData={this.loadData}
          changeOnSelect
        />
      );
    }
  };
  priceChange = (e) => {
    e.includes('price') ? this.setState({
      showPrice: true,
    }) :
      this.setState({
        showPrice: false,
      });
  };
  switch = (v) => {
    switchResult = v;
  };
  getPriceRow = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="是否开启指数价"
            >
              {getFieldDecorator('isComparePrice')(
                <Switch defaultChecked style={{ marginRight: '10px' }} onChange={this.switch} />
              )}
              <span>开启后，价格巡检部分，会通过指数价进行初选，高于指数价以及无指数价部分进行人工巡检。
              </span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="价格违规计算公司"
            >
              {getFieldDecorator('marketPriceType', {
                initialValue: 0,
              })(
                <RadioGroup>
                  <Radio value={0} >市场价等于算术平均数，按高于市场价10%计算违规</Radio>
                  <Radio value={1} >市场价按最低价*20%+畅销价*70%+最高价*10%高于市场价计算违规</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  };
  render() {
    const { treeNode, fetching, data, allselect,
      value, total, selectId, options, nodeKey, showPrice } = this.state;
    const { getFieldDecorator } = this.props.form;
    const baseInfoTitle = (
      <div>
        <p>本次巡检任务：预计巡检商品数：{total}</p>
        <p>巡检商品范围</p>
      </div>
    );
    return (
      <div>
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={this.getBtn()}
        />
        <Panel
          title={baseInfoTitle}
        >
          <Form>
            <Row>
              <Col span={12}>
                <FormItem
                  label="任务名称"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('taskName', rules2)(
                      <Input />
                    )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="巡检渠道"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('channelCodes', rules1)(
                      <CheckboxGroup options={selectoptions} onChange={this.changeBox} />
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="巡检区划"
                  {...formItemLayout}
                >
                  {this.getQh(options)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="巡检类目"
                  {...formItemLayout}
                >
                  <SearchTree
                    dataSource={treeNode}
                    search={this.search}
                    onChange={this.onChange}
                    onLoadData={this.onLoadData}
                    onCheck={this.onCheck}
                    selectall={this.selectall}
                    ckeckids={selectId}
                    key={nodeKey}
                    allselect={allselect}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="巡检供应商"
                  {...formItemLayout}
                >
                  <Select
                    mode="multiple"
                    labelInValue
                    value={value}
                    placeholder="请输入你想添加的供应商"
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={this.fetchUser}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  >
                    {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="仅检测有动销商品"
                >
                  {getFieldDecorator('onlySelling', {
                    initialValue: 1,
                  })(
                    <RadioGroup onChange={this.changeradio}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="仅检测上架商品"
                >
                  {getFieldDecorator('onlyShelf', {
                    initialValue: 1,
                  })(
                    <RadioGroup onChange={this.changeradio2}>
                      <Radio value={1} >是</Radio>
                      <Radio value={0} >否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel
          title="巡检方式"
        >
          <Row>
            <Col span={12}>
              <FormItem
                label="商品巡检内容"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('insMethod', rules1)(
                    <CheckboxGroup options={option2} onChange={this.priceChange} />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          {showPrice && this.getPriceRow()}
          <Row>
            <Col span={12}>
              <FormItem
                label="指定巡检数量"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('designatedNum')(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Panel>
      </div>
    );
  }
}

export default Form.create()(CreateTask);
