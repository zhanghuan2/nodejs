import React, { Component } from 'react';
import { connect } from 'dva';
import { ZcyBreadcrumb, Panel, Steps, Modal, Select, message, Button, ZcySpin, Upload } from 'doraemon';
// import config from '../utils/config';
import { Step0 } from '../utils/step0';
import { Step1 } from '../utils/step1';
import { Step2 } from '../utils/step2';
import { Step3 } from '../utils/step3';
import '../less/workdesk.less';
import { getRullOption, saveData, screenshot } from '../services/index';

const Option = Select.Option;
const Step = Steps.Step;
const breadcrumb = [{
  label: '巡检工作台',
}];
const SAVADATA = {};
let ATTR = '';
let RULEDATA = {};
let TEMP = '';
let shotStart = false;
let rect = '';
@connect(({ workDeskStep }) => ({
  workDeskStep,
}))
export default class WorkDeskStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      markModal: false,
      markSource: {},
      option1: [],
      option2: [],
      secondRule: '',
      imglinkshow: false,
      imglink: '',
      selfshowModal: false,
      selfshow: '',
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      showbtn: 'none',
      loading: false,
    };
  }
  componentDidMount() {
    const insTaskId = this.props.match.params.insChildTaskId;
    this.props.dispatch({
      type: 'workDeskStep/workDeskitemInfo',
      payload: {
        insTaskId: insTaskId.toString(),
      },
    });
  }
  delStep = () => {
    this.setState({
      step: this.state.step -= 1,
    });
  };
  addStep = () => {
    this.setState({
      step: this.state.step += 1,
    });
  };
  getStep = () => {
    const { step, markSource } = this.state;
    const { workDeskStep } = this.props;
    if (step === 0) {
      return (
        <Step0
          data={workDeskStep}
          markFn={this.markFn}
          markSource={markSource}
        />
      );
    } else if (step === 1) {
      return (
        <Step1
          data={workDeskStep}
          markFn={this.markFn}
          markSource={markSource}
        />
      );
    } else if (step === 2) {
      const checkp = workDeskStep.productInfo.data.checkPrice;
      if (checkp) {
        return (
          <Step2
            data={workDeskStep}
            markFn={this.priceFn}
            markSource={markSource}
            imgClick={this.imgEvt}
            showModalEvt={this.showviewModal}
            selfClick={this.selfClick}
          />
        );
      } else {
        return (
          <Step3
            data={workDeskStep}
            markSource={markSource}
          />
        );
      }
    } else if (step === 3) {
      return (
        <Step3
          data={workDeskStep}
          markSource={markSource}
        />
      );
    }
  };
  showviewModal = (src) => {
    this.setState({
      imglinkshow: true,
      imglink: src,
    });
  }
  selfClick = (prop) => {
    // const src = obj.imageUrl;
    // this.setState({
    //   selfupload: prop,
    //   selfshow: src,
    // });
    // imgprop = prop;
    if (SAVADATA[prop]) {
      SAVADATA[prop].selfupload = true;
      this.setState({
        markSource: SAVADATA,
      });
    }
  }
  startShot = (evt) => {
    shotStart = !shotStart;
    rect = evt.target.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;
    const ex = evt.clientX;
    const ey = evt.clientY;
    if (shotStart) {
      this.setState({
        x: ex - left,
        y: ey - top,
      });
    } else {
      this.setState({
        showbtn: 'inline-block',
      });
    }
  }
  moveShot = (evt) => {
    if (shotStart) {
      const { x, y } = this.state;
      const ex = evt.clientX;
      const ey = evt.clientY;
      this.setState({
        w: ex - rect.left - x,
        h: ey - rect.top - y,
      });
    }
  };
  confirmShot = () => {
    // shotStart = false;
    // const { x, y, w, h } = this.state;
    // const that = this;
    // const url = encodeURIComponent(SAVADATA[imgprop].priceUrl);
    // const xhr = new XMLHttpRequest();
    // xhr.open('GET', `/node/nodeTool/selfScreenShot?path=${url}&x=${x}&y=${y}&w=${w}&h=${h}`);
    // xhr.responseType = 'blob';
    // xhr.onload = function () {
    //   if (this.status === 200) {
    //     const blob = this.response;
    //     SAVADATA[imgprop].imageUrl = window.URL.createObjectURL(blob);
    //     that.setState({
    //       markSource: SAVADATA,
    //     });
    //   }
    // };
    // xhr.send();
    // this.setState({
    //   x: 0,
    //   y: 0,
    //   w: 0,
    //   h: 0,
    //   showbtn: 'none',
    // });
    // e.preventDefault();
    // e.stopPropagation();
  };
  cancelShot = (e) => {
    this.setState({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      showbtn: 'none',
    });
    shotStart = false;
    e.preventDefault();
    e.stopPropagation();
  };
  imgEvt = (prop, obj) => {
    const that = this;
    const url = encodeURIComponent(obj.priceUrl);
    this.setState({
      loading: true,
    });
    screenshot({
      path: url,
      bizCode: 1072,
    }).then((d) => {
      SAVADATA[prop].imageUrl = d;
      SAVADATA[prop].selfupload = false;
      that.setState({
        markSource: SAVADATA,
      });
    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
    // const xhr = new XMLHttpRequest();
    // xhr.open('GET', `/node/nodeTool/screenShot?path=${url}`, true);
    // xhr.responseType = 'blob';
    // xhr.onload = function () {
    //   if (this.status === 200) {
    //     const blob = this.response;
    //     SAVADATA[prop].imageUrl = window.URL.createObjectURL(blob);
    //     that.setState({
    //       markSource: SAVADATA,
    //     });
    //   }
    // };
    // xhr.send();
  }
  priceFn = (prop, v) => {
    SAVADATA[prop] = v;
    this.setState({
      markSource: SAVADATA,
    });
  }
  markFn = (prop, v) => {
    ATTR = prop;
    TEMP = v;
    if (this.state.option1.length > 0) {
      this.setState({
        markModal: true,
      });
    } else {
      getRullOption({
        pcode: '0000',
      }).then((d) => {
        d.success && this.setState({
          markModal: true,
          option1: d.data,
        });
      });
    }
  }
  confirmModal = () => {
    SAVADATA[ATTR] = TEMP;
    SAVADATA[ATTR].violationCode = RULEDATA.value;
    SAVADATA[ATTR].violationDesc = RULEDATA.description;
    this.setState({
      markSource: SAVADATA,
      markModal: false,
    });
  }
  cancelFn = () => {
    this.setState({
      markModal: false,
      imglinkshow: false,
      selfshowModal: false,
    });
  }
  getBtn = () => {
    const { step } = this.state;
    const { workDeskStep } = this.props;
    const checkp = workDeskStep.productInfo.data.checkPrice;
    const source = workDeskStep.productInfo.data;
    const globalBtn = [{
      label: '上一步',
      type: 'primary',
      onClick: () => {
        this.delStep();
      },
    }, {
      label: '下一步',
      type: 'primary',
      onClick: () => {
        this.addStep();
      },
    }, {
      label: '下一个商品',
      type: 'primary',
      onClick: () => {
        this.saveData();
      },
    }, {
      label: '保存',
      type: 'primary',
      onClick: () => {
        this.saveData();
      },
    }];
    const btn = [];
    const length = checkp ? 3 : 2;
    if (step === 0) {
      btn.push(globalBtn[1]);
    } else if (step === length) {
      btn.push(globalBtn[0]);
      !source.lastItem ?
        btn.push(globalBtn[2]) : btn.push(globalBtn[3]);
    } else {
      btn.push(globalBtn[0]);
      btn.push(globalBtn[1]);
    }
    return btn;
  };
  saveDasaveData = () => {
    const { markSource } = this.state;
    const insTaskId = this.props.match.params.insChildTaskId;
    const childTaskId = Number(this.props.match.params.taskid);
    const { workDeskStep } = this.props;
    const source = workDeskStep.productInfo.data;
    const obj = {
      baseInfos: [],
      insTaskId,
      childTaskId,
      itemId: workDeskStep.productInfo.data.itemId,
      insStaffId: 1,
    };
    const errorMap = {};
    for (const pop in markSource) {
      if (pop.indexOf('|') < 0) {
        obj.baseInfos.push(markSource[pop]);
      } else if (pop.indexOf('|') > 0 && Object.keys(markSource[pop]).length > 0) {
        const keys = pop.split('|')[0];
        obj[keys] = obj[keys] ? obj[keys] : [];
        obj[keys].push(markSource[pop]);
        if (pop.indexOf('skuPrices') > -1) {
          errorMap[pop] = markSource[pop];
        }
      }
    }
    if (source.checkPrice) {
      const iferror = this.checkData(obj, errorMap);
      if (!iferror.result) {
        message.error(iferror.message);
        return;
      }
    }
    delete obj.backCategoryInfoList;
    if (obj.skuPrices && obj.skuPrices.length > 0) {
      let len = 0;
      obj.skuPrices.map(async (item) => {
        if (!item.selfupload) {
          delete item.defaultFileList;
          delete item.fileId;
          len += 1;
          if (len === obj.skuPrices.length) {
            this.sendReq(obj, source);
            len = 0;
          }
          return item;
        }
        const id = item.fileId;
        let url = '';
        if (id) {
          url = await Upload.getFileUrl({
            fileId: id,
            bizCode: 1072,
          });
        }
        item.imageUrl = url;
        len += 1;
        delete item.defaultFileList;
        delete item.fileId;
        if (len === obj.skuPrices.length) {
          this.sendReq(obj, source);
          len = 0;
        }
      });
    } else {
      this.sendReq(obj, source);
    }
  }
  checkData = (obj, errorMap) => {
    if (!obj.skuPrices) {
      return {
        result: false,
        message: '您未输入任何商品，最少需要输入一项',
      };
    }
    if (obj.skuPrices.length === 0) {
      return {
        result: false,
        message: '您未输入任何商品，最少需要输入一项',
      };
    }
    let keys = 0;
    const rearr = [0];
    const textarr = [];
    for (const pop in errorMap) {
      if (pop.indexOf('|')) {
        const arr = pop.split('|');
        textarr.push(errorMap[pop].attrs);
        if (Number(arr[1]) !== keys) {
          keys = arr[1];
          rearr.push(0);
          textarr.push(errorMap[pop].attrs);
        }
        if (errorMap[pop].price && errorMap[pop].priceUrl && errorMap[pop].fileId) {
          rearr[keys] = 1;
        }
      }
    }
    const arrStr = (rearr.join('')).toString();
    const indexs = arrStr.indexOf(0);
    if (indexs > -1) {
      return {
        result: false,
        message: `销售属性${textarr[indexs] || ''}中市场价，最低价链接，市场价截图未填写完整`,
      };
    } else {
      return {
        result: true,
      };
    }
  }
  sendReq = (obj, source) => {
    console.log(obj);
    saveData(obj).then((d) => {
      if (d.success) {
        if (!source.lastItem) {
          location.reload();
        } else {
          this.props.history.push('/workDesk/list');
        }
      } else {
        message.error(d.message);
      }
    });
  }
  getTitle = () => {
    const { workDeskStep } = this.props;
    const source = workDeskStep.productInfo.data;
    return (
      <div>
        <p>任务名称：{source.insTaskName}</p>
        <p style={{ fontSize: '16px', color: '#606060' }}>当前商品序号：{source.currentNumber}   &nbsp;&nbsp;&nbsp;已完商品数{source.completeNumber}&nbsp;/&nbsp;总计商品数{source.taskItemTotal}</p>
      </div>
    );
  }
  handleProvinceChange = (value, e) => {
    const text = e.props.children;
    getRullOption({
      pcode: value,
    }).then((d) => {
      if (d.success) {
        if (d.data.length === 0) {
          RULEDATA = {
            value,
            description: text,
          };
          this.setState({
            option2: d.data,
            secondRule: '',
          });
        } else {
          RULEDATA = {
            value: d.data[0].code,
            description: d.data[0].description,
          };
          this.setState({
            option2: d.data,
            secondRule: (d.data)[0].code,
          });
        }
      }
    });
  }
  onSecondCityChange = (values, op) => {
    RULEDATA = {
      value: values,
      description: op.props.children,
    };
    this.setState({
      secondRule: values,
    });
  };
  getOption = (options) => {
    return options.map(
      item => <Option key={item.code} value={item.code}>{item.description}</Option>
    );
  }
  render() {
    const { step, x, y, w, h, showbtn } = this.state;
    const { workDeskStep } = this.props;
    const checkp = workDeskStep.productInfo.data.checkPrice;
    return (
      <div className="zcy-work-do">
        <ZcySpin size="large" spinning={this.state.loading} tip="图片截取中..." className="zcy-work-do-spins" />
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={this.getBtn()}
        />
        <Panel
          title={this.getTitle()}
          shrink
        >
          <Steps current={step} className="zcy-step">
            <Step title="商品信息" />
            <Step title="商品详情" />
            {checkp && <Step title="商品价格" />}
            <Step title="确认留底" />
          </Steps>
        </Panel>
        {
          this.getStep()
        }
        <Modal
          title="违规标注"
          visible={this.state.markModal}
          onOk={this.confirmModal}
          onCancel={this.cancelFn}
          width="600px"
        >
          <div id="selectBody" style={{ padding: '30px 0' }}>
            <span>违规理由：</span>
            <Select
              style={{ width: 200, marginRight: '20px' }}
              onChange={this.handleProvinceChange}
              getPopupContainer={() => document.getElementById('selectBody')}
              placeholder="请选择违规理由"
            >
              { this.getOption(this.state.option1) }
            </Select>
            <Select
              value={this.state.secondRule}
              style={{ width: 200 }}
              onChange={this.onSecondCityChange}
              getPopupContainer={() => document.getElementById('selectBody')}
              placeholder="请选择违规理由"
            >
              { this.getOption(this.state.option2) }
            </Select>
          </div>
        </Modal>
        <Modal
          title="预览"
          visible={this.state.imglinkshow}
          width="600px"
          onCancel={this.cancelFn}
        >
          <img src={this.state.imglink} alt="" style={{ width: '100%' }} />
        </Modal>
        <Modal
          title="手动截图"
          visible={this.state.selfshowModal}
          width="900px"
          onCancel={this.cancelFn}
          className="shotModal"
        >
          <div
            onClick={(e) => { this.startShot(e); }}
            style={{ position: 'relative', border: '3px solid #eee' }}
            onMouseMove={(e) => { this.moveShot(e); }}
          >
            <img src={this.state.selfshow} alt="" style={{ width: '100%' }} />
            <div className="work-do-shot-clip" style={{ top: y, left: x, width: w, height: h }}> &nbsp;</div>
            <div className="work-do-shot-btn" style={{ top: y + h, left: x, width: w, display: showbtn }}>
              <Button onClick={(e) => {
                this.cancelShot(e);
              }}
              >
                取消截图
              </Button>
              <Button onClick={(e) => {
                this.confirmShot(e);
              }}
              >
                确认截图
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
