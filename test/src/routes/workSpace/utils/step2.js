import { Panel, Input, Upload, Button, Icon } from 'doraemon';
import React, { Component } from 'react';
// import config from './config';

// const FormItem = Form.Item;
const saveData = {};
export class Step2 extends Component {
  getTable = (items, index) => {
    const keys = `linepanel_${index}`;
    const attrs = (items.attrs || []).map(v => v.attrVal);
    const zhanshiprice = items.price / 100;
    return (
      <Panel key={keys}>
        <div className="step2-table-box">
          <div className="step2-table-head">
            <span style={{ width: '15%' }}>销售属性</span>
            <span style={{ width: '10%' }}>渠道报价</span>
            <span className="p45" style={{ width: '25%' }}>市场最低价1</span>
            <span style={{ width: '25%' }}>市场最低价链接1</span>
            <span style={{ width: '25%' }}>市场价1截图</span>
          </div>
          <div className="step2-table-content1 inlineBlock" style={{ width: '25%' }}>
            <span className="inlineBlock" style={{ width: '60%' }}>{attrs.join(',')}</span>
            <span className="inlineBlock" style={{ width: '40%' }}>{zhanshiprice}</span>
          </div>
          <div className="step2-table-content2 inlineBlock" style={{ width: '75%' }}>
            {this.getLine(items, index, 1)}
            {this.getTitle(2)}
            {this.getLine(items, index, 2)}
            {this.getTitle(3)}
            {this.getLine(items, index, 3)}
          </div>
        </div>
      </Panel>
    );
  };
  createImg = () => {
    return '';
  };
  getTitle = (cindex) => {
    return (
      <div className="step2-table-head">
        <span className="p45" style={{ width: '33.3%' }}>市场最低价{cindex}</span>
        <span style={{ width: '33.3%' }}>市场最低价链接{cindex}</span>
        <span style={{ width: '33.3%' }}>市场价{cindex}截图</span>
      </div>
    );
  };
  getLine = (items, index, cindex) => {
    const attrs = (items.attrs || []).map(v => v.attrVal);
    const { markFn, markSource, imgClick, showModalEvt, selfClick } = this.props;
    const propIndex = `skuPrices|${index}|${cindex}`;
    saveData[propIndex] = saveData[propIndex] ? saveData[propIndex] : {};
    markSource[propIndex] = markSource[propIndex] ? markSource[propIndex] : {};
    console.log(markSource[propIndex].selfupload);
    const cardProps = {
      listType: 'picture-card',
      bizCode: 1072,
      fileNum: 1,
      showUploadList: true,
      defaultFileList: markSource[propIndex].defaultFileList || [],
      onChange: (e) => {
        if (e.fileList.length > 0) {
          saveData[propIndex].imageUrl = e.fileList[0].thumbUrl;
          saveData[propIndex].skuId = items.skuId;
          saveData[propIndex].fileId = e.fileList[0].fileId;
          saveData[propIndex].defaultFileList = e.fileList;
          saveData[propIndex].attrs = attrs.join(',');
          saveData[propIndex].oringPrice =
            items.price;
          markFn(propIndex, saveData[propIndex]);
        }
      },
    };
    return (
      <div className="step2-table-line">
        <span className="inlineBlock p45 pt15" style={{ width: '33.3%' }}>
          <Input
            defaultValue={markSource[propIndex].price}
            onBlur={(e) => {
              saveData[propIndex].price = e.target.value;
              saveData[propIndex].skuId = items.skuId;
              saveData[propIndex].attrs = attrs.join(',');
              saveData[propIndex].oringPrice =
                items.price;
              markFn(propIndex, saveData[propIndex]);
            }}
          />
        </span>
        <span className="inlineBlock pt15" style={{ width: '33.3%' }}>
          <Input
            defaultValue={markSource[propIndex].priceUrl}
            onBlur={(e) => {
              let links = '';
              if (e.target.value) {
                links = e.target.value.indexOf('http') > -1 ?
                  e.target.value : `http://${e.target.value}`;
              }
              saveData[propIndex].priceUrl = links;
              saveData[propIndex].skuId = items.skuId;
              markFn(propIndex, saveData[propIndex]);
            }}
          />
        </span>
        <span className="inlineBlock work-do-span" style={{ width: '33.3%' }}>
          {
            !markSource[propIndex].selfupload &&
            (
              <div style={{
                display: 'inline-block',
                width: '20%',
                marginRight: '10px',
                height: '50px',
                verticalAlign: 'top',
                border: '1px solid #eee' }}
              >
                <img src={markSource[propIndex].imageUrl}
                  alt=""
                  style={{ width: '100%', height: '100%' }}
                  onClick={() => {
                    showModalEvt(markSource[propIndex].imageUrl);
                  }}
                />
              </div>
            )
          }
          {
            markSource[propIndex].selfupload &&
            (
              <Upload {...cardProps} style={{ height: '50px' }}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            )
          }
          <Button onClick={() => {
            imgClick(propIndex, saveData[propIndex]);
          }}
          >
            自动截图
          </Button>
          <Button onClick={() => {
            selfClick(propIndex, saveData[propIndex]);
          }}
          >
            手动截图
          </Button>
        </span>
      </div>
    );
  }
  render() {
    const { data } = this.props;
    const resource = data.productInfo.data.skuInfos;
    return (
      <div>
        {
          resource.map((item, index) => {
            return this.getTable(item, index);
          })
        }
      </div>
    );
  }
}
