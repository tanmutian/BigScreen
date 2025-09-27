import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, message, Popconfirm, Space, Upload, Input, Select, DatePicker, ConfigProvider, InputNumber } from 'antd';
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {DownloadOutlined,PlusOutlined,UploadOutlined,} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { uuidv4 } from '@antv/xflow';
import { downloadFile, encodeURIParams } from '@/utils';
import { cloneDeep, debounce } from 'lodash';
import { templateDeleteApi, templateExportApi, templateListApi } from './api';
import DetailModal from './components/DetailModal';
import DetailDrawer from './components/DetailDrawer';
import styles from './index.less';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import type { InputNumberProps } from 'antd';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const { RangePicker } = DatePicker;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export default () => {
  const {
    refLayoutContent
  } = useModel('global');
  const {
  } = useModel('ProTable.model');

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };



  const columns: TableColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  
  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


  return (
    <div className = {styles.global}>
      <div className = {styles.finding}>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            姓名：
          </div>
          <Input placeholder="请输入" />
        </div>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            性别：
          </div>          
          <Select
            defaultValue="请选择"
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              { value: 'male', label: '男' },
              { value: 'female', label: '女' },
            ]}
          />
        </div>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            出生日期：
          </div>
          <ConfigProvider locale={locale}>
            <RangePicker showTime />
          </ConfigProvider>;          

        </div>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            年龄：
          </div>          
          <InputNumber defaultValue='请输入' onChange={onChange} style={{ width: "50%" }}/>
          <div className = {styles.sign}>
            ~
          </div>
          <InputNumber defaultValue='请输入' onChange={onChange} style={{ width: "50%" }}/>
        </div>
      </div>

      <div className = {styles.findingButton}>
        <Button>
          重置
        </Button>
        <Button type="primary">
          查询
        </Button>
      </div>

      <div className = {styles.listButton}>
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
        <Button icon={<UploadOutlined />}>
          导入
        </Button>
        <Button type="primary" icon={<DownloadOutlined />}>
          导出
        </Button>
      </div>

      <div className = {styles.userList}>
        <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
        </Radio.Group>
        <Table<DataType>
          rowSelection={{ type: selectionType, ...rowSelection }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};


