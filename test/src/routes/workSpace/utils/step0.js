import { Panel, Form, Row, Col } from 'doraemon';
import React, { Component } from 'react';
import config from './config';

const FormItem = Form.Item;
// const returnObj = {};
export class Step0 extends Component {
  getCategory = (obj) => {
    const arr = obj.backCategoryInfoList.map((item) => {
      return item.name;
    });
    return arr.join(',');
  };
  getMainImgs = (obj) => {
    const { markFn, markSource } = this.props;
    const result = {};
    result.attrName = '商品主图';
    result.attrKey = 'mainImage';
    result.attrVal = obj.baseInfo.mainImage;
    const words = '当前已标注违规：';
    return (
      <div style={{ paddingLeft: '15px' }}>
        <div style={{ display: 'inline-block' }} className="imgBox">
          <img src={obj.baseInfo.mainImage} style={{ width: 120, height: 120 }} alt="mainImage" />
        </div>
        <a
          className="show-mark-a"
          onClick={() => {
            markFn('mainImage', result);
          }}
        >违规标注
        </a>
        <div className="errorWord">
          {
            markSource.mainImage ? words + markSource.mainImage.violationDesc : ''
          }
        </div>
      </div>
    );
  };
  getKeyProp = (obj) => {
    const { markFn, markSource } = this.props;
    let arr = [];
    obj.groupOtherAttributes.map((item) => {
      if (item.group !== 'USER_DEFINED') {
        arr = arr.concat(item.otherAttributes);
      }
    });
    return (
      <div className="workDesk-attr-box">
        {
          arr.map((d, index) => {
            const keyV = `workDesk-key-${index}`;
            const keyf = `otherAttrs|attr${index}`;
            const word = markSource[keyf] ? `当前已标注违规：${markSource[keyf].violationDesc}` : '';
            const result = {};
            result.attrName = d.attrKey;
            result.attrKey = d.attrKey;
            result.attrVal = d.attrVal;
            const titlew = `${d.attrKey}：${d.attrVal + (d.unit || '')}`;
            return (
              <div className="inlineBlock workDesk-attr-box-line" key={keyV} >
                <div className="inlineBlock">
                  <span className="word-span" title={titlew}>{titlew}</span>
                  <a
                    className="show-mark-a"
                    onClick={() => {
                      markFn(keyf, result);
                    }}
                  >
                    违规标注
                  </a>
                </div>
                <div className="errorWord" title={word}>{word}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
  getUserProp = (obj) => {
    const { markFn, markSource } = this.props;
    let arr = [];
    obj.groupOtherAttributes.map((item) => {
      if (item.group === 'USER_DEFINED') {
        arr = arr.concat(item.otherAttributes);
      }
    });
    return (
      <div className="workDesk-attr-box">
        {
          arr.map((d, index) => {
            const keyV = `workDesk-user-${index}`;
            const keyf = `otherAttrs|user${index}`;
            const word = markSource[keyf] ? `当前已标注违规：${markSource[keyf].violationDesc}` : '';
            const result = {};
            result.attrName = d.attrKey;
            result.attrKey = d.attrKey;
            result.attrVal = d.attrVal;
            const titlew = `${d.attrKey}：${d.attrVal + (d.unit || '')}`;
            return (
              <div className="inlineBlock workDesk-attr-box-line" key={keyV}>
                <div className="inlineBlock">
                  <span className="word-span" title={titlew}>{titlew}</span>
                  <a
                    className="show-mark-a"
                    onClick={() => {
                      markFn(keyf, result);
                    }}
                  >
                    违规标注
                  </a>
                </div>
                <div className="errorWord" title={word}>{word}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
  getRow = (item, index) => {
    const keys = `row-add${index}`;
    return (
      <Row key={keys}>
        <Col span={24}>
          <FormItem
            label={item.attrKey}
            {...config.step.formItemLayoutLine}
          >
            {this.getRowAttr(item, index)}
          </FormItem>
        </Col>
      </Row>
    );
  }
  getRowAttr = (obj, indexs) => {
    const arr = obj.skuAttributes;
    const { markFn, markSource } = this.props;
    return (
      <div className="workDesk-attr-box">
        {
          arr.map((d, index) => {
            const keyV = `row-add${indexs}-${index}`;
            const keyf = `skuAttrs|${indexs}_${index}`;
            const word = markSource[keyf] ? `当前已标注违规：${markSource[keyf].violationDesc}` : '';
            const result = {};
            result.attrName = d.attrKey;
            result.attrKey = d.attrKey;
            result.attrVal = d.attrVal;
            return (
              <div className="inlineBlock workDesk-attr-box-line" key={keyV} >
                <div className="inlineBlock">
                  <span className="word-span" title={d.attrVal + (d.unit || '')}>{d.attrVal + (d.unit || '')}</span>
                  <a
                    className="show-mark-a"
                    onClick={() => {
                      markFn(keyf, result);
                    }}
                  >
                    违规标注
                  </a>
                </div>
                <div className="errorWord" title={word}>
                  {word}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
  getBackCategoryInfoList = (d) => {
    const result = {};
    result.attrName = '商品类目';
    result.attrKey = 'backCategoryInfoList';
    const arr = d.map(item => item.id);
    result.attrVal = arr.join(',');
    return result;
  }
  getName = (d) => {
    const result = {};
    result.attrName = '商品标题';
    result.attrKey = 'name';
    result.attrVal = d.name;
    return result;
  }
  render() {
    const { data, markFn, markSource } = this.props;
    const result = data.productInfo.data;
    // console.log(result);
    const words = '当前已标注违规：';
    return (
      <div style={{ marginTop: '20px' }}>
        <Panel
          title="基本信息"
        >
          <Form>
            <Row>
              <Col span={12}>
                <FormItem
                  label="商品类目"
                  {...config.step.formItemLayout}
                >
                  <div style={{ paddingLeft: '15px' }}>
                    {this.getCategory(result)}
                    <a
                      className="show-mark-a"
                      onClick={() => {
                        const param = this.getBackCategoryInfoList(result.backCategoryInfoList);
                        markFn('backCategoryInfoList', param);
                      }}
                    >违规标注
                    </a>
                  </div>
                  <div className="errorWord">
                    {
                      markSource.backCategoryInfoList ? words + markSource.backCategoryInfoList.violationDesc : ''
                    }
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="商品标题"
                  {...config.step.formItemLayout}
                >
                  <div style={{ paddingLeft: '15px' }}>{result.baseInfo.name}
                    <a
                      className="show-mark-a"
                      onClick={() => {
                        const param = this.getName(result.baseInfo);
                        markFn('name', param);
                      }}
                    >
                      违规标注
                    </a>
                  </div>
                  <div className="errorWord">
                    {
                      markSource.name ? words + markSource.name.violationDesc : ''
                    }
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="商品图片"
                  {...config.step.formItemLayout}
                >
                  {this.getMainImgs(result)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem
                  label="关键属性"
                  {...config.step.formItemLayoutLine}
                >
                  {this.getKeyProp(result)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
        <Panel
          title="销售规格"
        >
          <Form>
            {
              result.groupSkuAttributes.map((item, index) => {
                return this.getRow(item, index);
              })
            }
          </Form>
        </Panel>
        <Panel
          title="自定义属性"
        >
          <Form>
            <Row>
              <Col span={24}>
                <FormItem
                  label="自定义属性"
                  {...config.step.formItemLayoutLine}
                >
                  {this.getUserProp(result)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Panel>
      </div>
    );
  }
}
