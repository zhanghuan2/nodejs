import { Panel, Table, Form, Col, Row } from 'doraemon';
import React, { Component } from 'react';

const FormItem = Form.Item;
const formline = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
export class Step3 extends Component {
  getExtra = () => {
    // const { workDeskStep } = this.props;
    return (
      <div>
        <p>商品信息巡检结果：<a>查看快照</a></p>
        <p>属性检测结果</p>
      </div>
    );
  }
  getColumns = () => {
    const columns = [
      { title: '违规属性项',
        width: 300,
        dataIndex: 'attrName',
        key: 'attrName',
      },
      {
        title: '违规条例',
        dataIndex: 'violationDesc',
        key: 'violationDesc',
      }];
    return columns;
  }
  getSource = () => {
    const { markSource } = this.props;
    const arr = [];
    let index = 0;
    for (const pop in markSource) {
      if (pop.indexOf('skuPrices') < 0) {
        index += 1;
        const temp = {};
        temp.attrName = markSource[pop].attrName;
        temp.violationDesc = markSource[pop].violationDesc;
        temp.key = `tableSpu1_${index}`;
        arr.push(temp);
      }
    }
    return arr;
  }
  getSpuTable = () => {
    const { markSource, data } = this.props;
    const marketPriceType = data.productInfo.data.marketPriceType
      ? data.productInfo.data.marketPriceType : 0;
    const arr = [];
    const priceArr = []; // 价格数组，取最高价，中间价，最低价
    for (const pop in markSource) {
      if (pop.indexOf('skuPrices') > -1) {
        arr.push(markSource[pop]);
        if (!isNaN(markSource[pop].price) && !!markSource[pop].price) {
          priceArr.push(markSource[pop].price);
        }
      }
    }
    let p = 0; // 加权后价格
    if (priceArr.length > 0) {
      priceArr.sort((a, b) => {
        return a - b; // 从小到大排序
      });
      if (priceArr.length === 1) {
        priceArr.push(priceArr[0]);
        priceArr.push(priceArr[0]);
      } else if (priceArr.length === 2) {
        priceArr.push(priceArr[1]);
      }
      if (marketPriceType === 0) { // 算术平均
        p = (Number(priceArr[0]) + Number(priceArr[1]) + Number(priceArr[2])) / 3;
      } else if (marketPriceType === 1) { // 加权平均
        p = (Number(priceArr[0]) * 0.2) + (Number(priceArr[1]) * 0.7) + (Number(priceArr[2]) * 0.1);
      }
    }
    return arr.map((items, index) => {
      return this.renderTable(items, index, p, marketPriceType);
    });
  }
  renderTable = (item, index, num, marketPriceType) => {
    const keys = `sputables1_${index}`;
    const price = `市场价${index + 1}`;
    const lj = `市场价链接${index + 1}`;
    let comparePrice = num; // 比较价格
    if (marketPriceType === 0) {
      comparePrice = num * 1.1; // 算术平均需要*1.1比较
    }
    return (
      <div key={keys} style={{ marginBottom: '35px' }}>
        <Form>
          <Row>
            <Col span={12}>
              <FormItem
                label="销售属性"
                {...formline}
              >
                {item.attrs}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="平均市场价"
                {...formline}
              >
                {num.toFixed(2)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                label="SKU价格"
                {...formline}
              >{item.oringPrice}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label={price}
                {...formline}
              >
                {item.price}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                label="是否合规"
                {...formline}
              >
                {item.oringPrice > comparePrice ? '不合规' : '合规'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                label={lj}
                {...formline}
              >
                <a href={item.priceUrl} target="_blank" rel="noopener noreferrer">{item.priceUrl}</a>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div style={{ background: '#f7f7f7', border: '1px solid #ddd', height: '280px', textAlign: 'center' }}>
          {
            item.imageUrl ?
              <img style={{ width: '100%', height: '280px' }} src={item.imageUrl} alt="" />
              :
              <span style={{ fontSize: '24px', color: '#ccd0d6', lineHeight: '280px' }}>网页截图</span>
          }
        </div>
      </div>
    );
  }
  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <Panel
          title={this.getExtra()}
        >
          <Table columns={this.getColumns()} dataSource={this.getSource()} />
        </Panel>
        <Panel
          title="价格巡检查询"
        >
          {this.getSpuTable()}
        </Panel>
      </div>
    );
  }
}
