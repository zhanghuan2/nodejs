import { Panel, Form, Table, Row, Col, ZcyBreadcrumb, Modal, Icon } from 'doraemon';
import React, { Component } from 'react';
import { connect } from 'dva';
import config from '../utils/config';
import '../less/maskManage.less';

const FormItem = Form.Item;
const breadcrumb = [{
  label: '巡检任务管理',
  to: '/maskManage/list',
}, {
  label: '巡检任务结果',
}];
const breadBtn = [{
  label: '返回',
  type: 'secondary',
  to: '/maskManage/list',
}, {
  label: '创建',
  type: 'primary',
  to: '/maskManage/create',
}];
@connect(({ viewResult }) => ({
  viewResult,
}))
export default class ViewResult extends Component {
  state = {
    visible: false,
    url: '',
    scal: 1,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      scal: 1,
    });
  }
  componentDidMount() {
    const tid = this.props.match.params.taskId;
    this.props.dispatch({
      type: 'viewResult/getTableInfo',
      payload: {
        insTaskId: tid,
      },
    });
    this.props.dispatch({
      type: 'viewResult/getinfoTablemsg',
      payload: {
        insTaskId: tid,
      },
    });
    this.props.dispatch({
      type: 'viewResult/getinfoTablePrice',
      payload: {
        insTaskId: tid,
      },
    });
  }
  getColumns = () => {
    const columns = [
      { title: '区划', width: 150, dataIndex: 'districtName', key: 'districtName', fixed: 'left' },
      { title: '渠道', dataIndex: 'channel', key: 'channel' },
      { title: '供应商', dataIndex: 'supplierName', key: 'supplierName' },
      { title: '类目', dataIndex: 'categoryName', key: 'categoryName' },
      { title: '商品', dataIndex: 'skuName', key: 'skuName' },
      { title: '商品ID', dataIndex: 'itemId', key: 'itemId' },
      { title: '违规属性项', dataIndex: 'violationAttrName', key: 'violationAttrName' },
      { title: '违规条例', dataIndex: 'violationDesc', key: 'violationDesc' },
      { title: '快照链接',
        dataIndex: 'snapshotUrl',
        key: 'snapshotUrl',
        render: (text, index) => {
          const keys = `snapshotUrl_${index}`;
          if (text) {
            return (
              <a href={text} target="_blank" key={keys} rel="noopener noreferrer">查看</a>
            );
          } else {
            return '-';
          }
        },
      },
    ];
    return columns;
  };
  getColumns2 = () => {
    const columns = [
      { title: '区划',
        width: 150,
        dataIndex: 'districtName',
        key: 'districtName',
        render: (text) => {
          return (
            <div className="overflow-r" title={text} style={{ width: 60 }}>{text}</div>
          );
        },
      },
      { title: '渠道',
        width: 150,
        dataIndex: 'channel',
        key: 'channel',
        render: (text) => {
          return (
            <div className="overflow-r" title={text} style={{ width: 60 }}>{text}</div>
          );
        },
      },
      { title: '供应商',
        width: 150,
        dataIndex: 'supplierName',
        key: 'supplierName',
        render: (text) => {
          return (
            <div className="overflow-r" style={{ width: 150 }} title={text}>{text}</div>
          );
        },
      },
      { title: '类目',
        width: 150,
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: (text) => {
          return (
            <div className="overflow-r" style={{ width: 100 }} title={text}>{text}</div>
          );
        },
      },
      { title: '商品名称',
        width: 100,
        dataIndex: 'skuName',
        key: 'skuName',
        render: (text) => {
          return (
            <div className="overflow-r" style={{ width: 80 }} title={text}>{text}</div>
          );
        },
      },
      { title: '商品Id',
        width: 100,
        dataIndex: 'itemId',
        key: 'itemId',
        render: (text) => {
          return (
            <div className="overflow-r" style={{ width: 80 }} title={text}>{text}</div>
          );
        },
      },
      { title: 'SKUID',
        width: 100,
        dataIndex: 'skuId',
        key: 'skuId',
        render: (text) => {
          return (
            <div className="overflow-r" style={{ width: 80 }} title={text}>{text}</div>
          );
        },
      },
      { title: '销售属性',
        width: 100,
        dataIndex: 'skuAttr',
        key: 'skuAttr',
        render: (text) => {
          return (
            <div className="overflow-r" style={{ width: 80 }} title={text}>{text}</div>
          );
        },
      },
      { title: '渠道价',
        width: 100,
        dataIndex: 'protocolPrice',
        key: 'price',
        render: (text) => {
          const zhanshi = text / 100;
          return (
            <div className="overflow-r" style={{ width: 80 }} title={zhanshi}>{zhanshi}</div>
          );
        },
      },
      { title: '是否合规',
        width: 100,
        dataIndex: 'isPriceViolation',
        key: 'isPriceViolation',
        render: (text) => {
          let textName = null;
          if (text === 1) {
            textName = '违规';
          } else if (text === 0) {
            textName = '不违规';
          } else if (text === -1) {
            textName = '忽略';
          } else {
            textName = '未知';
          }
          return (
            <div className="overflow-r" style={{ width: 80 }} title={textName}>{textName}</div>
          );
        },
      },
      { title: '市场均价',
        width: 130,
        dataIndex: 'averagePrice',
        key: 'averagePrice',
        render: (text) => {
          const zhanshi = text / 100;
          return (
            <div className="overflow-r" style={{ width: 80 }} title={zhanshi}>{zhanshi}</div>
          );
        },
      },
      { title: '比价结果',
        width: 130,
        dataIndex: 'compareResult',
        key: 'compareResult',
        render: (text) => {
          return (
            <div className="overflow-r" style={{ width: 80 }} title={text}>{text}</div>
          );
        },
      },
      { title: '市场价1',
        dataIndex: 'prices',
        width: 130,
        key: 'prices1',
        render: (text) => {
          if (text[0]) {
            const zhanshi = text[0].price / 100;
            return (
              <div className="overflow-r" style={{ width: 80 }} title={zhanshi}>{zhanshi}</div>
            );
          } else {
            return (
              <div style={{ width: 80 }}>
                -
              </div>
            );
          }
        },
      },
      { title: '市场价链接1',
        dataIndex: 'prices',
        width: 150,
        key: 'priceUrl1',
        render: (text) => {
          if (text[0]) {
            return (
              <a href={text[0].priceUrl} style={{ display: 'block', width: 100 }}>查看</a>
            );
          }
        },
      },
      { title: '市场价截图1',
        dataIndex: 'prices',
        width: 100,
        key: 'imageUrl1',
        render: (text) => {
          if (text[0]) {
            const path = text[0].imageUrl;
            return (
              <div style={{ width: 100 }}>
                <img style={{ display: 'inline-block', width: '45px', height: '45px' }} src={path} alt=" " onClick={() => { this.prewImg(path); }} />
              </div>
            );
          }
        },
      },
      { title: '市场价2',
        dataIndex: 'prices',
        width: 100,
        key: 'prices2',
        render: (text) => {
          if (text[1]) {
            const zhanshi = text[1].price / 100;
            return (
              <div className="overflow-r" style={{ width: 80 }} title={zhanshi}>{zhanshi}</div>
            );
          } else {
            return (
              <div style={{ width: 80 }}>
                -
              </div>
            );
          }
        },
      },
      { title: '市场价链接2',
        dataIndex: 'prices',
        width: 100,
        key: 'priceUrl2',
        render: (text) => {
          if (text[1]) {
            return (
              <a href={text[1].priceUrl} style={{ display: 'block', width: 100 }}>查看</a>
            );
          } else {
            return (
              <div style={{ width: 100 }}>
                -
              </div>
            );
          }
        },
      },
      { title: '市场价截图2',
        dataIndex: 'prices',
        width: 100,
        key: 'imageUrl2',
        render: (text) => {
          if (text[1]) {
            const path = text[1].imageUrl;
            return (
              <div style={{ width: 100 }}>
                <img style={{ display: 'inline-block', width: '45px', height: '45px' }} src={path} alt=" " onClick={() => { this.prewImg(path); }} />
              </div>
            );
          } else {
            return (
              <div style={{ width: 100 }}>
                -
              </div>
            );
          }
        },
      },
      { title: '市场价3',
        dataIndex: 'prices',
        width: 100,
        key: 'prices3',
        render: (text) => {
          if (text[2]) {
            const zhanshi = text[2].price / 100;
            return (
              <div className="overflow-r" style={{ width: 80 }} title={zhanshi}>{zhanshi}</div>
            );
          } else {
            return (
              <div style={{ width: 100 }}>
                -
              </div>
            );
          }
        },
      },
      { title: '市场价链接3',
        dataIndex: 'prices',
        width: 100,
        key: 'priceUrl3',
        render: (text) => {
          if (text[2]) {
            return (
              <a href={text[2].priceUrl} style={{ display: 'block', width: 100 }}>查看</a>
            );
          } else {
            return (
              <div style={{ width: 100 }}>
                -
              </div>
            );
          }
        },
      },
      { title: '市场价截图3',
        dataIndex: 'prices',
        width: 100,
        key: 'imageUrl3',
        render: (text) => {
          if (text[2]) {
            const path = text[2].imageUrl;
            return (
              <div style={{ width: 100 }}>
                <img style={{ display: 'inline-block', width: '45px', height: '45px' }} src={path} alt=" " onClick={() => { this.prewImg(path); }} />
              </div>
            );
          } else {
            return (
              <div style={{ width: 80 }}>
                -
              </div>
            );
          }
        },
      },
      { title: '快照链接',
        dataIndex: 'snapshotUrl',
        width: 130,
        key: 'snapshotUrl',
        render: (text, index) => {
          const keys = `snapshotUrl_${index}`;
          if (text) {
            return (
              <div style={{ width: 80 }}>
                <a href={text} target="_blank" key={keys} rel="noopener noreferrer">查看</a>
              </div>

            );
          } else {
            return (
              <div style={{ width: 80 }}>
              -
              </div>
            );
          }
        },
      },
    ];
    return columns;
  };
  prewImg = (path) => {
    const arr = path.split('/');
    this.setState({
      visible: true,
      url: path,
      name: arr.pop(),
    });
  };
  addScal = () => {
    const { scal } = this.state;
    if (scal >= 1) {
      this.setState({
        scal: this.state.scal + 0.2,
      });
    }
  };
  minusScal = () => {
    const { scal } = this.state;
    if (scal !== 1) {
      this.setState({
        scal: this.state.scal - 0.2,
      });
    }
  };
  render() {
    const { viewResult } = this.props;
    const { url, name, visible, scal } = this.state;
    const data = viewResult.panel.data || {};
    const table1Data = viewResult.table1.data;
    const table2Data = viewResult.table2.data;
    const ble = true;
    const scalString = `scale(${scal})`;
    const titls = `${config.baseInfoTitle1} : ${data.insTaskName || ''}`;
    return (
      <div>
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={breadBtn}
        />
        <Panel
          title={titls}
        >
          <Form>
            <Row>
              <Col span={12}>
                <FormItem
                  label="创建时间"
                  {...config.formItemLayout}
                >
                  {data.createdAt}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="结束时间"
                  {...config.formItemLayout}
                >
                  {data.finishedAt}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="总计商品数量"
                  {...config.formItemLayout}
                >
                  {data.protocolItemTotal}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="总计违规商品数量"
                  {...config.formItemLayout}
                >
                  {data.violationTotal}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="总计价格违规商品数量"
                  {...config.formItemLayout}
                >
                  {data.priceViolationTotal}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="总计属性违规商品数量"
                  {...config.formItemLayout}
                >
                  {data.attrViolationTotal}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="总计违规供应商数量"
                  {...config.formItemLayout}
                >
                  {data.supplierViolationTotal}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="总计用时"
                  {...config.formItemLayout}
                >
                  {data.timeCost}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel
          title={config.baseInfoTitle2}
        >
          <Form>
            <Row>
              <Col span={12}>
                <FormItem
                  label="巡检渠道"
                  {...config.formItemLayout}
                >
                  {data.channels && data.channels.join(' ')}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="巡检区划"
                  {...config.formItemLayout}
                >
                  {data.districts && data.districts.join(' ')}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="巡检类目"
                  {...config.formItemLayout}
                >
                  {data.categorys && data.categorys.join(' ')}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="巡检供应商"
                  {...config.formItemLayout}
                >
                  {data.suppliers && data.suppliers.join(' ')}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="是否仅检测"
                  {...config.formItemLayout}
                >
                  {data.onlySelling === 1 ? '是' : '否'}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel
          title={config.baseInfoTitle3}
        >
          <Form>
            <Row>
              <Col span={12}>
                <FormItem
                  label="巡检内容"
                  {...config.formItemLayout}
                >
                  {data.insContent}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="是否开机指数价过滤"
                  {...config.formItemLayout}
                >
                  {data.isComparePrice === 1 ? '是' : '否'}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="巡检数量"
                  {...config.formItemLayout}
                >
                  {data.designatedNum}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel title={config.baseInfoTitle4}>
          <h4 style={{ fontSize: '16px', margin: '20px 10px' }}>商品信息违规明细</h4>
          <Table columns={this.getColumns()} dataSource={table1Data.data} scroll={{ x: 1300 }} />
          <h4 style={{ fontSize: '16px', margin: '20px 10px' }}>{config.baseInfoTitle5}</h4>
          <Table columns={this.getColumns2()} dataSource={table2Data.data} scroll={{ x: 1300 }} />
        </Panel>
        <Modal
          title={name}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          mask={!ble}
          footer={null}
        >
          <div className="viewResult-img-prew">
            <div className="viewResult-img-div" style={{ overflow: 'scroll' }}>
              <img style={{ transform: scalString }} src={url} alt="" />
            </div>
            <div className="viewResult-img-oprate">
              <a href={url} target="_blank" rel="noopener noreferrer"><Icon type="download" /></a>
              <a className="viewResult-img-plus" onClick={this.addScal}><Icon type="plus" /></a>
              <a className="viewResult-img-plus" onClick={this.minusScal}><Icon type="minus" /></a>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
