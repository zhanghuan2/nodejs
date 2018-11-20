import { Panel } from 'doraemon';
import React, { Component } from 'react';
// import config from './config';

// const FormItem = Form.Item;
export class Step1 extends Component {
  getExtra = (re) => {
    const { markFn, markSource } = this.props;
    const word = markSource.richText ? `当前已标注违规：${markSource.richText.violationDesc}` : '';
    const result = {};
    result.attrName = '商品详情';
    result.attrKey = 'richText';
    result.attrVal = re.richText;
    return (
      <h3>
        <span className="errorWord">{word}</span>
        <a
          className="show-mark-a"
          onClick={() => {
            markFn('richText', result);
          }}
        >
          违规标注
        </a>
      </h3>
    );
  }
  render() {
    const { data } = this.props;
    const result = data.productInfo.data.baseInfo;
    return (
      <div style={{ marginTop: '20px' }}>
        <Panel
          title="商品详情"
          extra={this.getExtra(result)}
        >
          <div className="zcy-product-detail" dangerouslySetInnerHTML={{ __html: result.richText }} />
        </Panel>
      </div>
    );
  }
}
