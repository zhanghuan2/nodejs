import { Tree, Input, Button, Checkbox } from 'doraemon';
import React, { Component } from 'react';
import '../less/maskManage.less';

const TreeNode = Tree.TreeNode;
export class SearchTree extends Component {
  loop = (data) => {
    const searchValue = '';
    return data.map((item) => {
      const index = item.name.indexOf(searchValue);
      const beforeStr = item.name.substr(0, index);
      const afterStr = item.name.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.name}</span>;
      if (item.children || (item.hasChildren && item.children)) {
        return (
          <TreeNode key={item.id} title={title}>
            { this.loop(item.children) }
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.id}
          title={title}
          dataRef={item}
          isLeaf={item.isLeaf || !item.hasChildren}
        />);
    });
  };
  render() {
    const { search, onChange,
      dataSource, onLoadData, onCheck,
      selectall, ckeckids, allselect } = this.props;
    return (
      <div className="treeNodeBox">
        <div className="treeNodeBox-search">
          <span>类目搜索：</span>
          <Input onChange={onChange} placeholder="请输入" style={{ width: '190px' }} />
          <Button onClick={search}>搜索</Button>
        </div>
        <div className="treeNodeBox-content">
          <Tree
            loadData={onLoadData}
            checkable
            onCheck={onCheck}
            checkedKeys={ckeckids}
          >
            {this.loop(dataSource)}
          </Tree>
        </div>
        <div className="select-all" style={{ padding: '0 27px', borderTop: '1px solid #eee' }}>
          <Checkbox onChange={selectall} checked={allselect}>全选</Checkbox>
        </div>
      </div>
    );
  }
}
