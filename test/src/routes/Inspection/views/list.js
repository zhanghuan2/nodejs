import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'dva';
import { ZcyList, ZcyBreadcrumb, DatePicker, MultiCascader } from 'doraemon';
import config from '../utils/config';
import { getDiscode, getChildDiscode } from '../services';

const monthFormat = 'YYYY/MM';
const { MonthPicker } = DatePicker;
const columns = config.list.columns;
let tempkeys = '';
const breadcrumb = [{
  label: '渠道价格状态查询',
  to: '/price/list',
}];
@connect(({ inspectionList }) => ({
  inspectionList,
}))
export default class InspectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        tabList: [{
          label: '政采指数平均设置系数：',
          key: 1,
        }],
      },
      table: {
        columns,
      },
      options: [],
    };
  }
  getClum = () => {
    const { options } = this.state;
    const date = new Date();
    const datem = date.getMonth() < 10 ? `0${(date.getMonth())}` : date.getMonth();
    const dateR = `${date.getFullYear()}${datem}`;
    return [{
      label: '选择时间',
      id: 'queryMonth',
      render: () => {
        return <MonthPicker />;
      },
      decoratorOptions: {
        initialValue: moment(`${dateR}/${datem}`, monthFormat),
      },
    }, {
      label: '选择区划',
      id: 'districtCodes',
      render: () => {
        const keys = tempkeys || new Date().getTime();
        return (
          <MultiCascader
            key={keys}
            options={options || []}
            loadData={this.loadData}
            changeOnSelect
          />
        );
      },
    }];
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
  componentDidMount() {
    this.props.dispatch({
      type: 'inspectionList/getCollect',
    });
    getDiscode().then((d) => {
      if (d.success) {
        const arr = this.changeOption(d.data);
        tempkeys = new Date().getTime();
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
  handleSearch = (params) => {
    const result = params;
    if (result.queryMonth) {
      const date = new Date(result.queryMonth);
      const datem = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
      const dateR = `${date.getFullYear()}${datem}`;
      result.queryMonth = dateR;
    }
    delete result.type;
    if (result.districtCodes && result.districtCodes.length === 0) {
      delete result.districtCodes;
    }
    // result.districtCodes = districtCodesTemp;
    this.props.dispatch({
      type: 'inspectionList/getCollect',
      payload: params,
    });
  };
  render() {
    const { inspectionList } = this.props;
    const { tabs, table, operationCol } = this.state;
    console.log(inspectionList.list);
    const paginations = {
      pageSize: 10,
      total: inspectionList.list.total,
    };
    return (
      <div>
        <ZcyBreadcrumb
          routes={breadcrumb}
        />
        <ZcyList
          customItem={this.getClum()}
          tabs={tabs}
          tabKey="type"
          table={{
            ...table,
            dataSource: inspectionList.list.data,
            scroll: {
              x: 1300,
            },
            pagination: paginations,
          }}
          operationCol={operationCol}
          onSearch={this.handleSearch}
        />
      </div>
    );
  }
}
