import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { ZcyBreadcrumb, Panel, Progress, Table } from 'doraemon';
import config from '../utils/config';

const breadcrumb = config.list.breadcrumb;

@connect(({ workDesk }) => ({
  workDesk,
}))
export default class WorkDeskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalBtn: [{
        label: '创建任务',
        type: 'primary',
        to: '/maskManage/create',
      }],
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'workDesk/subCount',
    });
    this.props.dispatch({
      type: 'workDesk/proCount',
    });
    this.props.dispatch({
      type: 'workDesk/workTaskInfo',
    });
  }

  handleSearch = () => {
    // this.props.dispatch({
    //   type: 'priceList/getCollect',
    //   payload: params,
    // });
  };
  getColumns = () => {
    const columns = [
      { title: '任务ID',
        width: 100,
        dataIndex: 'insChildTaskId',
        key: 'insChildTaskId',
        fixed: 'left',
        render: (text, record, index) => {
          const keys = `insChildTaskId_${index}`;
          return (<div className="overflow-r" key={keys}>{text}</div>);
        },
      },
      { title: '任务名称',
        width: 200,
        dataIndex: 'insTaskName',
        key: 'insTaskName',
        render: (text, record, index) => {
          const keys = `insTaskName_${index}`;
          return (<div className="overflow-r" key={keys}>{text}</div>);
        },
      },
      { title: '任务商品数', width: 130, dataIndex: 'taskItemNum', key: 'taskItemNum' },
      {
        title: '完成进度',
        dataIndex: 'taskProcessInfoes',
        key: '123',
        render: (text, record, index) => {
          const keys = `taskProcessInfoes_${index}`;
          return (
            <div key={keys} className="table-process">
              完成度 :
              <div style={{ width: 80, display: 'inline-block', paddingLeft: 5 }}>
                <Progress percent={record.taskProcess} />
              </div>
            </div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'status',
        key: '5',
        render: (text, record, index) => {
          const keys = `status_${index}`;
          const href = `/workDesk/do/${record.insTaskId}/${record.insChildTaskId}`;
          return (
            record.taskProcess === 100 ? '' : <Link to={href} key={keys}>开始巡检</Link>
          );
        },
      }];
    return columns;
  };
  render() {
    const { globalBtn } = this.state;
    const { workDesk } = this.props;
    const columns = this.getColumns();
    const resouce = workDesk.dataSource.data ? workDesk.dataSource.data.insTaskInfoes.data : [];
    return (
      <div>
        <ZcyBreadcrumb
          routes={breadcrumb}
          globalBtn={globalBtn}
        />
        <Panel>
          <div style={{ display: 'inline-block', padding: '0 100px', borderRight: '1px solid #DFDFDF' }}>
            <Progress
              type="circle"
              status="success"
              percent={30}
              format={() => {
                return (
                  <div>
                    <p style={{ fontSize: '24px', color: '#24344e', marginBottom: '11px' }}>{workDesk.proCount.data || 0}</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>待检商品数量</p>
                  </div>
                );
              }}
            />
          </div>
          <div style={{ display: 'inline-block', padding: '0 100px' }}>
            <Progress
              type="circle"
              percent={60}
              format={() => {
                return (
                  <div style={{ display: 'inline-block' }}>
                    <p style={{ fontSize: '24px', color: '#24344e', marginBottom: '11px' }}>{workDesk.subCount.data || 0}</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>待检任务数量</p>
                  </div>
                );
              }}
            />
          </div>
        </Panel>
        <Panel>
          <Table columns={columns} dataSource={resouce} />
        </Panel>
      </div>
    );
  }
}
