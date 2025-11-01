import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, message, Popconfirm, Space, Upload, Input, Select, DatePicker, ConfigProvider, InputNumber } from 'antd';
import { Divider, Radio, Table, Pagination, Modal } from 'antd';
import type { TableColumnsType, TableProps, } from 'antd';
import {DownloadOutlined,PlusOutlined,UploadOutlined,} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { uuidv4 } from '@antv/xflow';
import { downloadFile, encodeURIParams } from '@/utils';
import { cloneDeep, debounce } from 'lodash';
import { proTableListApi, templateDeleteApi, templateExportApi, templateListApi } from './api';
import DetailModal from './components/DetailModal';
import DetailDrawer from './components/DetailDrawer';
import styles from './index.less';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import type { InputNumberProps } from 'antd';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const { RangePicker } = DatePicker;


export default () => {
  const {
    refLayoutContent
  } = useModel('global');
  const {
    data,
    setData,
    pagination,
    setPagination,
    isModalOpen, 
    setIsModalOpen,
    modalValue, 
    setModalValue,
  } = useModel('ProTable.model');

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  const [name, setName] = useState<any>()
  const onChangeName = useCallback((e) => {
    setName(e.target.value)
  },[])

  const [sex, setSex] = useState<any>()
  const onChangeSex = useCallback((value) => {
    setSex(value)
  },[])

  const [date, setDate] = useState<any>()
  const onChangeDate = useCallback((date) => {
    setDate(date)
  },[])

  const [ageStart, setAgeStart] = useState<any>()
  const onChangeAgeStart = useCallback((value) => {
    setAgeStart(value)
  },[])

  const [ageEnd, setAgeEnd] = useState<any>()
  const onChangeAgeEnd = useCallback((value) => {
    setAgeEnd(value)
  },[])

  const reset = useCallback(() => {
    setName(null)
    setSex(null)
    setDate(null)
    setAgeStart(null)
    setAgeEnd(null)
  },[])

  const searching = useCallback(async () => {
    const response = await proTableListApi({
      current: 1, 
      pageSize: pagination.pageSize,
      name: name,
      sex: sex,
      dateStart: date?.[0]?dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss'):undefined,
      dateEnd: date?.[1]?dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss'):undefined,
      ageStart: ageStart,
      ageEnd: ageEnd,
    })
    console.log(response)
    setData(response.data)
    setPagination(response.pagination)
  },[ageEnd, ageStart, date, name, pagination, setData, setPagination, sex])

  const columns: TableColumnsType<any> = [
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
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <div className = {styles.tableText1}>编辑</div>
          <div className = {styles.tableText1}>详情</div>
          <div className = {styles.tableText2}>删除</div>
        </Space>
      ),
    },
  ];


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(modalValue)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  
  const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const paginationChange = useCallback(async(page, pageSize) => {
    console.log(page,pageSize)
    
    const response = await proTableListApi({
      current: page, 
      pageSize: pageSize,
      name: name,
      sex: sex,
      dateStart: date?.[0]?dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss'):undefined,
      dateEnd: date?.[1]?dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss'):undefined,
      ageStart: ageStart,
      ageEnd: ageEnd,
    })
    console.log(response)
    setData(response.data)
    setPagination(response.pagination)
  },[ageEnd, ageStart, date, name, setData, setPagination, sex])

  const onOk = (value: any) => {
    console.log('onOk: ', value);
  };

  const onChangeModalName = useCallback((e) => {
    setModalValue((prev) => {
      return {
        ...prev,
        name:e.target.value
      }
    })
  },[setModalValue])

  const onChangeModalSex = useCallback((value) => {
    setModalValue((prev) => {
      return {
        ...prev,
        sex:value
      }
    })
  },[setModalValue])

    const onChangeModalDate = useCallback((value) => {
    setModalValue((prev) => {
      return {
        ...prev,
        birthday:value
      }
    })
  },[setModalValue])

    const onChangeModalAge = useCallback((value) => {
    setModalValue((prev) => {
      return {
        ...prev,
        age:value
      }
    })
  },[setModalValue])

  return (
    <div className = {styles.global}>
      <div className = {styles.finding}>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            姓名：
          </div>
          <Input placeholder="请输入" value = {name} onChange={onChangeName}/>
        </div>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            性别：
          </div>          
          <Select
            placeholder = "请选择"
            style={{ width: "100%" }}
            options={[
              { value: 'male', label: '男' },
              { value: 'female', label: '女' },
            ]}
            value = {sex}
            onChange = {onChangeSex}
          />
        </div>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            出生日期：
          </div>
          <ConfigProvider locale={locale}>
            <RangePicker showTime value = {date} onChange = {onChangeDate}/>
          </ConfigProvider>         

        </div>

        <div className = {styles.findingLabel}>
          <div className = {styles.label}>
            年龄：
          </div>          
          <InputNumber placeholder='请输入' onChange={onChangeAgeStart} value = {ageStart} style={{ width: "50%" }} />
          <div className = {styles.sign}>
            ~
          </div>
          <InputNumber placeholder='请输入' onChange={onChangeAgeEnd} value = {ageEnd} style={{ width: "50%" }}/>
        </div>
      </div>

      <div className = {styles.findingButton}>
        <Button onClick = {reset}>
          重置
        </Button>
        <Button type="primary" onClick = {searching}>
          查询
        </Button>
      </div>

      <div className = {styles.listButton}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          新增
        </Button>
        <Modal
          title="新增"
          //closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className={styles.newAddition}>
            <div className={styles.modalInput}>
              <div className={styles.addName}>
                姓名：
              </div>
              <Input 
                placeholder="请输入" 
                value = {name} 
                onChange={onChangeModalName} 
                className={styles.addInput}
              />
            </div>
            <div className={styles.modalInput}>
              <div className={styles.addName}>
                性别：
              </div>
              <Select
                placeholder = "请选择"
                style={{ width: "100%" }}
                options={[
                  { value: 'male', label: '男' },
                  { value: 'female', label: '女' },
                ]}
                value = {sex}
                onChange = {onChangeModalSex}
                className = {styles.addInput}
              />
            </div>
            <div className={styles.modalInput}>
              <div className={styles.addName}>
                出生日期：
              </div>
              <DatePicker
                showTime
                onChange={onChangeModalDate}
                onOk={onOk}
                className = {styles.addInput}
              />
            </div>
            <div className={styles.modalInput}>
              <div className={styles.addName}>
                年龄：
              </div>
              <InputNumber 
                placeholder='请输入' 
                onChange={onChangeModalAge} 
                value = {ageStart} 
                style={{ width: "50%" }}
                className = {styles.addInput} 
              />
            </div>
          </div>

        </Modal>
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
        <Table<any>
          rowSelection={{ type: selectionType, ...rowSelection }}
          columns={columns}
          dataSource={data}
          pagination = {false}
        />
        <div className = {styles.paginationStyle}>
          <ConfigProvider locale={locale}>
            <Pagination
              total={pagination.total}
              showTotal={(total, range) => `第${range[0]}-${range[1]}条/总共${total}条`}
              showQuickJumper
              onChange = {paginationChange}
            />
          </ConfigProvider>       
        </div>

      </div>
    </div>
  );
};


