import { Form, Modal, Row, Col, Select, Spin } from 'doraemon';
import React, { Component } from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const formItemLayout3 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};
const formItemLayout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
export class MaskModal extends Component {
  render() {
    const { visible, okFn, title,
      canFn, values, fetching, fetchUser, handleChanges, datas, modalData } = this.props;
    // console.log(datas);
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={okFn}
        onCancel={canFn}
        width="640px"
      >
        <Form id="manageform">
          <Row>
            <Col span={24}>
              <FormItem
                label="任务累计商品数量"
                {...formItemLayout1}
              >
                {modalData.itemTotal || '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                label="涉及渠道 "
                {...formItemLayout}
              >
                {modalData.channels ? modalData.channels.join('，') : '-'}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="涉及类目"
                {...formItemLayout}
              >
                {modalData.categorys ? modalData.categorys.join('，') : '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                label="涉及供应商"
                {...formItemLayout}
              >
                {modalData.suppliers ? modalData.suppliers.join('，') : '-'}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="涉及区划"
                {...formItemLayout}
              >
                {modalData.districts || '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                label="商品分配规划"
                {...formItemLayout}
              >
                {modalData.distributeRule || '-'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                label="价格违规计算公式"
                {...formItemLayout}
              >
                {modalData.marketPriceType === 1 ? '市场价按最低价*20%+畅销价*70%+最高价*10%高于市场价计算违规' : '市场价等于算术平均数，按高于市场价10%计算违规'}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                label="添加巡检员"
                {...formItemLayout3}
              >
                <Select
                  mode="multiple"
                  labelInValue
                  value={values}
                  placeholder="请输入你想添加的巡检员"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={fetchUser}
                  onChange={handleChanges}
                  style={{ width: '100%' }}
                  getPopupContainer={() => document.getElementById('manageform')}
                >
                  {datas.map(d => <Option key={d.value}>{d.text}</Option>)}
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
