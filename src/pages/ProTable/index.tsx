import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, message, Popconfirm, Space, Upload, Input, Select, DatePicker, ConfigProvider, InputNumber, Drawer } from 'antd';
import { Divider, Radio, Table, Pagination, Modal } from 'antd';
import type { TableColumnsType, TableProps, } from 'antd';
import {DownloadOutlined,PlusOutlined,UploadOutlined,} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { uuidv4 } from '@antv/xflow';
import { downloadFile, encodeURIParams } from '@/utils';
import { cloneDeep, debounce } from 'lodash';
import { proTableListApi, addApi, deleteApi, editApi,templateDeleteApi, templateExportApi, templateListApi } from './api';
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
    isModalAddOpen, 
    setIsModalAddOpen,
    modalAddValue, 
    setModalAddValue,
    isModalEditOpen,
    setIsModalEditOpen,
    modalEditValue, 
    setModalEditValue,
    isModalDetailOpen, 
    setIsModalDetailOpen,
    modalDetailValue,
    setModalDetailValue,
    isDrawerDetailOpen, 
    setDrawerDetailOpen,
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

  const deleteList = useCallback(async(record) => {
    console.log(record)
    const response = await deleteApi({id:record.id})
    searching()
  },[searching])

  const editValue = useCallback((record) => {
    setIsModalEditOpen(true);
    setModalEditValue({
      ...record,
      birthday: dayjs(record.birthday),
    })
  },[setIsModalEditOpen, setModalEditValue])


  const onOk = (value: any) => {
    console.log('onOk: ', value);
  };

  const handleEditOk = async() => {
    const response = await editApi({
      ...modalEditValue,
      birthday: dayjs(modalEditValue.birthday).format('YYYY-MM-DD HH:mm:ss')
    })
    console.log(modalEditValue)
    setIsModalEditOpen(false);
    searching()
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const onChangeEditModalName = useCallback((e) => {
    setModalEditValue((prev) => {
      return {
        ...prev,
        name:e.target.value
      }
    })
  },[setModalEditValue])

  const onChangeEditModalSex = useCallback((value) => {
    setModalEditValue((prev) => {
      return {
        ...prev,
        sex:value
      }
    })
  },[setModalEditValue])

    const onChangeEditModalDate = useCallback((value) => {
    setModalEditValue((prev) => {
      return {
        ...prev,
        birthday:value
      }
    })
  },[setModalEditValue])

  const onChangeEditModalAge = useCallback((value) => {
    setModalEditValue((prev) => {
      return {
        ...prev,
        age:value
      }
    })
  },[setModalEditValue])

  const detailValue = useCallback((record) => {
    setIsModalDetailOpen(true)
    setModalDetailValue({
      ...record,
      birthday: dayjs(record.birthday).format('YYYY-MM-DD HH:mm:ss')
    })
  },[setIsModalDetailOpen, setModalDetailValue])

  const handleDetailCancel = () => {
    console.log("asdfasdfaswdfasdfasdfa")
    setIsModalDetailOpen(false);

  };



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
      render:(_,record) =>(
        <div> {record.sex === 'male'? '男':'女'} </div>
      ),
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
          <div className = {styles.tableText1} onClick = {()=>editValue(record)}>
            编辑
          </div>
          <div className = {styles.tableText1} onClick = {()=>detailValue(record)}>
            详情
          </div>
          <Popconfirm
            title="删除数据"
            description="确定要删除这条数据吗？"
            onConfirm={()=>deleteList(record)}
            okText="确认"
            cancelText="取消"
            okButtonProps = {{danger:true}}
          >
            <div className = {styles.tableText2}>
              删除
            </div>
          </Popconfirm>

        </Space>
      ),
    },
  ];



  const showModaladd = () => {
    setIsModalAddOpen(true);
    setModalAddValue({
      name: undefined,
      age: undefined,
      birthday: undefined,
      sex: undefined,
    })
  };

  const handleAddOk = async() => {
    console.log(modalAddValue)
    const response = await addApi({
      ...modalAddValue,
      birthday: dayjs(modalAddValue.birthday).format('YYYY-MM-DD HH:mm:ss')
    })
    setIsModalAddOpen(false);
    searching()
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
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



  const onChangeAddModalName = useCallback((e) => {
    setModalAddValue((prev) => {
      return {
        ...prev,
        name:e.target.value
      }
    })
  },[setModalAddValue])

  const onChangeAddModalSex = useCallback((value) => {
    setModalAddValue((prev) => {
      return {
        ...prev,
        sex:value
      }
    })
  },[setModalAddValue])

    const onChangeAddModalDate = useCallback((value) => {
    setModalAddValue((prev) => {
      return {
        ...prev,
        birthday:value
      }
    })
  },[setModalAddValue])

  const onChangeAddModalAge = useCallback((value) => {
    setModalAddValue((prev) => {
      return {
        ...prev,
        age:value
      }
    })
  },[setModalAddValue])

  useEffect(() => {
    searching()
  },[])
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
        <Button type="primary" icon={<PlusOutlined />} onClick={showModaladd}>
          新增
        </Button>
        <Modal
          title="新增"
          //closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalAddOpen}
          onOk={handleAddOk}
          
          onCancel={handleAddCancel}
        >
          <div className={styles.newAddition}>
            <div className={styles.modalInput}>
              <div className={styles.addName}>
                姓名：
              </div>
              <Input 
                placeholder="请输入" 
                value = {modalAddValue.name} 
                onChange={onChangeAddModalName} 
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
                value = {modalAddValue.sex}
                onChange = {onChangeAddModalSex}
                className = {styles.addInput}
              />
            </div>
            <div className={styles.modalInput}>
              <div className={styles.addName}>
                出生日期：
              </div>
              <DatePicker
                showTime
                onChange={onChangeAddModalDate}
                onOk={onOk}
                className = {styles.addInput}
                value = {modalAddValue.birthday}
              />
            </div>
            <div className={styles.modalInput}>
              <div className={styles.addName}>
                年龄：
              </div>
              <InputNumber 
                placeholder='请输入' 
                onChange={onChangeAddModalAge} 
                value = {modalAddValue.age} 
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
              showTotal={(total, range) => `第${(pagination.current-1) * pagination.pageSize + 1}-${Math.min((pagination.current-1) * pagination.pageSize+pagination.pageSize, total)}条/总共${total}条`}
              showQuickJumper
              onChange = {paginationChange}
            />
          </ConfigProvider>       
        </div>

      </div>

      <Modal
        title="编辑"
        open={isModalEditOpen}
        onOk={handleEditOk}
        
        onCancel={handleEditCancel}
      >
        <div className={styles.newAddition}>
          <div className={styles.modalInput}>
            <div className={styles.addName}>
              姓名：
            </div>
            <Input 
              placeholder="请输入" 
              value = {modalEditValue.name} 
              onChange={onChangeEditModalName} 
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
              value = {modalEditValue.sex}
              onChange = {onChangeEditModalSex}
              className = {styles.addInput}
            />
          </div>
          <div className={styles.modalInput}>
            <div className={styles.addName}>
              出生日期：
            </div>
            <DatePicker
              showTime
              onChange={onChangeEditModalDate}
              onOk={onOk}
              className = {styles.addInput}
              value = {modalEditValue.birthday}
            />
          </div>
          <div className={styles.modalInput}>
            <div className={styles.addName}>
              年龄：
            </div>
            <InputNumber 
              placeholder='请输入' 
              onChange={onChangeEditModalAge} 
              value = {modalEditValue.age} 
              style={{ width: "50%" }}
              className = {styles.addInput} 
            />
          </div>
        </div>
      </Modal>

      <Modal
        title="详情"
        // open={isModalDetailOpen}
        open={false}
        footer = {false}
        onCancel={handleDetailCancel}
      >
        <div className={styles.newAddition}>
          <div className={styles.modalInput}>
            <div className={styles.detailName}>
              姓名：
            </div>
            <div className = {styles.detailValue}>
              {modalDetailValue.name}
            </div>
          </div >
          <div className={styles.modalInput}>
            <div className={styles.detailName}>
              性别：
            </div>
            <div className = {styles.detailValue}>
              {modalDetailValue.sex === 'male'? '男':'女'}
            </div>
          </div>
          <div className={styles.modalInput}>
            <div className={styles.detailName}>
              出生日期：
            </div>
            <div className = {styles.detailValue}>
              {modalDetailValue.birthday}
            </div>
          </div>
          <div className={styles.modalInput}>
            <div className={styles.detailName}>
              年龄：
            </div>
            <div className = {styles.detailValue}>
              {modalDetailValue.age}
            </div>
          </div>
        </div>
      </Modal>        

      <Drawer
        title="Basic Drawer"
        // open={isModalDetailOpen}
        open = {true}
        onClose={handleDetailCancel}
      >
        <div className = {styles.drawerGlobal}>
          <div className = {styles.basicDetail}>
            <div className = {styles.basicTitle}>
              <div className = {styles.colorBlock}>
              </div>
              <div className = {styles.textBlock}>
                基本信息
              </div>              
            </div>
            <div className = {styles.basicValue}>
              <div className={styles.firstRow}>
                <div className={styles.rowName}>
                  姓名：
                </div>
                <div className = {styles.detailValue}>
                  {modalDetailValue.name}
                </div>
              </div>
            </div >
            <div className={styles.modalInput}>
              <div className={styles.detailName}>
                性别：
              </div>
              <div className = {styles.detailValue}>
                {modalDetailValue.sex === 'male'? '男':'女'}
              </div>
            </div>
            <div className={styles.modalInput}>
              <div className={styles.detailName}>
                出生日期：
              </div>
              <div className = {styles.detailValue}>
                {modalDetailValue.birthday}
              </div>
            </div>
            <div className={styles.modalInput}>
              <div className={styles.detailName}>
                年龄：
              </div>
              <div className = {styles.detailValue}>
                {modalDetailValue.age}
              </div>            
            </div>
          </div>
          <div className = {styles.familyDetail}>
          </div>
        </div>
      </Drawer>
    </div>
  );
};


