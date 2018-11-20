import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { ZcyList, ZcyBreadcrumb, Input, DropList, Icon, Progress, message } from 'doraemon';
import { MaskModal } from '../utils/modal';
import { getUserList, saveTask, cancelTask, exportExl, getModalDetail } from '../services';
import '../less/maskManage.less';

const customItem = [{
  label: '任务ID',
  id: 'insTaskId',
  render: () => {
    return <Input />;
  },
}, {
  label: '任务名称',
  id: 'insTaskName',
  render: () => {
    return <Input />;
  },
}];

const breadcrumb = [{
  label: '巡检任务管理',
  to: '/price/list',
}];
let taskId = '';
@connect(({ maskList }) => ({
  maskList,
}))
export default class MaskList extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    tabs: {
      tabList: [{
        label: '全部',
        key: -1,
      }, {
        label: '生成中',
        key: 0,
      }, {
        label: '待分派',
        key: 1,
      }, {
        label: '执行中',
        key: 2,
      }, {
        label: '已完成',
        key: 3,
      }, {
        label: '已撤销',
        key: 4,
      }],
    },
    globalBtn: [{
      label: '创建任务',
      type: 'primary',
      to: '/maskManage/create',
    }],
    showSetMask: false,
    selectData: [],
    value: [],
    fetching: false,
    showpro: {},
    modalData: {},
  };
  getColumns = () => {
    const columns = [
      { title: '任务ID',
        width: 120,
        dataIndex: 'insTaskId',
        key: 'insTaskId',
        fixed: 'left',
        render: (text, record, index) => {
          const keys = `insTaskId_${index}`;
          return (<div key={keys} className="overflow-r">{text}</div>);
        },
      },
      { title: '任务名称',
        width: 140,
        dataIndex: 'insTaskName',
        key: 'insTaskName',
        render: (text, record, index) => {
          const keys = `insTaskName_${index}`;
          return (<div key={keys} className="overflow-r">{text}</div>);
        },
      },
      { title: '任务商品数', width: 130, dataIndex: 'taskItemNum', key: 'taskItemNum' },
      {
        title: '完成进度',
        width: 650,
        dataIndex: 'taskProcessInfoes',
        key: 'taskProcessInfoes',
        render: (text, record, indexs) => {
          const { showpro } = this.state;
          const ifshow = showpro[record.insTaskId];
          const keys = `taskProcessInfoes_${indexs}`;
          return (
            <div key={keys}>
              { text.map((d, index) => {
                if (index > 1 && !ifshow) {
                  return '';
                }
                const mapkeys = `${keys}_map_${index}`;
                if (text.length > 2 && index === 1 && !ifshow) {
                  return (
                    <div key={mapkeys} className="table-process">
                      执行者 : <span className="table-process-num" title={d.insStaffName}>{d.insStaffName}</span>
                      商品数 : <span title={d.taskItemNum} className="pronum">{d.taskItemNum}</span>
                      完成度 :
                      <div style={{ width: 80, display: 'inline-block', paddingLeft: 5 }}>
                        <Progress percent={d.taskProcess} size="small" />
                      </div>
                      <a className="table-process-icon" onClick={() => { this.renderMore(record); }}>
                        更多<Icon type="down" />
                      </a>
                    </div>
                  );
                }
                if (index + 1 === text.length && ifshow) {
                  return (
                    <div key={mapkeys} className="table-process">
                      执行者 : <span className="table-process-num" title={d.insStaffName}>{d.insStaffName}</span>
                      商品数 : <span title={d.taskItemNum} className="pronum">{d.taskItemNum}</span>
                      完成度 :
                      <div style={{ width: 80, display: 'inline-block', paddingLeft: 5 }}>
                        <Progress percent={d.taskProcess} size="small" />
                      </div>
                      <a className="table-process-icon" onClick={() => { this.renderMore(record); }}>
                        收起<Icon type="up" />
                      </a>
                    </div>
                  );
                }
                return (
                  <div key={mapkeys} className="table-process">
                    执行者 : <span className="table-process-num" title={d.insStaffName}>{d.insStaffName}</span>
                    商品数 : <span title={d.taskItemNum} className="pronum">{d.taskItemNum}</span>
                    完成度 :
                    <div style={{ width: 80, display: 'inline-block', paddingLeft: 5 }}>
                      <Progress percent={d.taskProcess} />
                    </div>
                  </div>
                );
              })
              }
            </div>
          );
        },
      },
      { title: '任务状态',
        dataIndex: 'status',
        key: '4',
        render: (text, record, index) => {
          const keys = `status_${index}`;
          let result = '';
          if (text === 0) {
            result = '生成中';
          } else if (text === 1) {
            result = '待分派';
          } else if (text === 2) {
            result = '执行中';
          } else if (text === 3) {
            result = '已完成';
          } else if (text === 4) {
            result = '已撤销';
          } else {
            result = '失败';
          }
          return (
            <div key={keys}>
              <div>{result}</div>
              <div className="overflow-r" style={{ color: '#a5a3a3', fontSize: '12px' }}>{text === 5 ? record.remark : ''}</div>
            </div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'status',
        align: 'center',
        width: 180,
        key: '5',
        render: (text, record, index) => {
          const keys = `oprate_${index}`;
          if (record.status === 0 || record.status === 5) {
            return '';
          } else if (record.status === 3 || record.status === 4) {
            const itemList = [{
              label: '导出',
              key: 'exprod',
              to: `${location.origin}/operating/inspection/result/export?insTaskId=${record.insTaskId}`,
              target: '_blank',
            }];
            const href = `/maskManage/result/${record.insTaskId}`;
            return (
              <DropList
                itemList={itemList}
                key={keys}
              >
                <Link to={href}>查看结果</Link>
              </DropList>
            );
          } else if (record.status === 2) {
            const itemList = [{
              label: '导出',
              key: 'exprod',
              to: `${location.origin}/operating/inspection/result/export?insTaskId=${record.insTaskId}`,
              target: '_blank',
            }];
            const href = `/maskManage/result/${record.insTaskId}`;
            return (
              <div>
                <a className="operat-r"
                  key={keys}
                  onClick={() => {
                    this.cancelTask(record);
                  }}
                >撤销任务
                </a>
                <DropList
                  itemList={itemList}
                  key={keys}
                >
                  <Link to={href}>查看结果</Link>
                </DropList>
              </div>
            );
          } else if (record.status === 1) {
            const itemList = [{
              label: '撤销任务',
              key: 'cancel',
              handleClick: () => {
                this.cancelTask(record);
              },
            }];
            return (
              <DropList
                key={keys}
                itemList={itemList}
              >
                <a onClick={() => {
                  this.setTask(record);
                }}
                >
                  分派任务
                </a>
              </DropList>
            );
          }
        },
      }];
    return {
      columns,
    };
  }
  renderMore = (obj) => {
    const id = obj.insTaskId;
    const objs = this.state.showpro;
    objs[id] = !objs[id];
    this.setState({
      showpro: objs,
    });
  };
  cancelTask = (obj) => {
    taskId = obj.insTaskId;
    cancelTask({
      insTaskId: taskId,
    }).then((d) => {
      d.success && this.props.dispatch({
        type: 'maskList/getmaskList',
        payload: {
          status: -1,
        },
      });
    });
  }
  exportExl = (obj) => {
    exportExl({
      insTaskId: obj.insTaskId,
    }).then((d) => {
      console.log(d);
    });
  };
  setTask = (obj) => {
    taskId = obj.insTaskId;
    getModalDetail({
      insTaskId: taskId,
    }).then((d) => {
      if (d.success) {
        this.setState({
          modalData: d.data,
          value: [],
          showSetMask: true,
        });
      } else {
        message.error(d.message);
      }
    });
  }
  handleSearch = (params) => {
    const param = params;
    if (!param.insTaskName) {
      delete param.insTaskName;
    }
    if (!param.insTaskId) {
      delete param.insTaskId;
    }
    this.props.dispatch({
      type: 'maskList/getmaskList',
      payload: param,
    });
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'maskList/getmaskList',
      payload: {
        status: -1,
      },
    });
  }
  handleOk = () => {
    const arr = this.state.value.map((item) => {
      return Number(item.key);
    });
    const params = {
      insStaffIds: arr,
      insTaskId: taskId,
    };
    saveTask(params).then((d) => {
      this.setState({
        showSetMask: false,
      });
      d.success && this.props.dispatch({
        type: 'maskList/getmaskList',
        payload: {
          status: -1,
        },
      });
    });
  }
  handleCancel = () => {
    this.setState({
      showSetMask: false,
    });
  }
  fetchUser = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ selectData: [], fetching: true });
    getUserList({
      displayName: value,
      pageSize: 10,
    })
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = (body.data.data || []).map(user => ({
          text: user.displayName,
          value: user.id,
        }));
        this.setState({ selectData: data, fetching: false });
      });
  }
  handleChanges = (value) => {
    this.setState({
      selectData: [],
      value,
      fetching: false,
    });
  }
  render() {
    const { maskList } = this.props;
    const { tabs, operationCol, globalBtn, value, selectData, fetching, modalData } = this.state;
    const columns = this.getColumns();
    const paginations = {
      pageSize: 10,
      total: maskList.list.data.total,
    };
    return (
      <div>
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={globalBtn}
        />
        <ZcyList
          customItem={customItem}
          tabs={tabs}
          tabKey="status"
          table={{
            ...columns,
            dataSource: maskList.list.data.data,
            scroll: {
              x: 1300,
            },
            pagination: paginations,
          }}
          operationCol={operationCol}
          onSearch={this.handleSearch}
          pagination={paginations}
        />
        <MaskModal
          title="任务分派"
          visible={this.state.showSetMask}
          okFn={this.handleOk}
          canFn={this.handleCancel}
          values={value}
          fetching={fetching}
          fetchUser={this.fetchUser}
          handleChanges={this.handleChanges}
          datas={selectData}
          modalData={modalData}
        />
      </div>
    );
  }
}
