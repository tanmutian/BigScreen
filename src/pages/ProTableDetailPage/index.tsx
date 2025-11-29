import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { history, useModel, useParams } from '@umijs/max';
import { Button, Col, Divider, message, Row, Skeleton, Space, Descriptions, Input, Spin, Table } from 'antd';
import type { TableColumnsType, TableProps, } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, EditableProTable, ProForm, ProFormText, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { decodeURIParams } from '@/utils';
import Return from '@/assets/icon/return.png';
import Title from '@/assets/icon/title.png';
import GlobalTitleBar from '@/components/GlobalTitleBar';
import { templateAddApi, templateUpdateApi, getIdApi } from './api';
import styles from './index.less';

export default () => {

  const {
    modalDetailValue, 
    setModalDetailValue,
  } = useModel('ProTable.model');

  const { id , status }=decodeURIParams(window.location.href);

  const init = useCallback(async(id) => {
    const response = await getIdApi({
      id:id,
    })
    console.log(response)
    setModalDetailValue({
      ...response.data,
      birthday: dayjs(response.data.birthday).format('YYYY-MM-DD HH:mm:ss')
    })
  },[setModalDetailValue])

  useEffect(() => {
    console.log(id)
    init(id)
  },[id, init])

  const familyMembers: TableColumnsType<any>= [
    {
      title: '成员姓名',
      dataIndex: 'memberName',
      key: 'memberName',
    },
    {
      title: '成员性别',
      dataIndex: 'memberSex',
      key: 'memberSex',
      render:(_,record) => (
        <div>{record.memberSex === 'male'? '男':'女'}</div>
      )
    },
    {
      title: '成员出生日期',
      dataIndex: 'memberBirthTime',
      key: 'memberBirthTime',
    },
    {
      title: '年龄',
      dataIndex: 'memberAge',
      key: 'memberAge',
    },
  ];

  const returnMain = useCallback(() => {
    history.push('/proTable')
  },[])

  return (
    <div className = {styles.global}>
      <div className={styles.returnBlock} onClick = {returnMain}>
        <LeftOutlined />
        <div className={styles.returnText} >
          返回查询表格
        </div>
      </div>

      <div className={styles.basicBlock}>
        <div className = {styles.basicTitle}>
          <div className = {styles.colorBlock1}>
          </div>
          <div className = {styles.textBlock}>
            基本信息
          </div>              
        </div>

        <div className = {styles.basicValue}>
          <div className={styles.outRow}>
            <div className={styles.inRow}>
              <div className={styles.rowName}>
                姓名：
              </div>
              <div className = {styles.rowValue}>
                {modalDetailValue.name} 
              </div>
            </div>

            <div className={styles.inRow}>
              <div className={styles.rowName}>
                性别：
              </div>
              <div className = {styles.rowValue}>
                {modalDetailValue.sex === 'male'? '男':'女'}
              </div>                  
            </div>

            <div className={styles.inRow}>
              <div className={styles.rowName}>
                出生日期：
              </div>
              <div className = {styles.rowValue}>
                {modalDetailValue.birthday}
              </div>
            </div>
          </div>

          <div className={styles.outRow}>
            <div className={styles.inRow}>
              <div className={styles.rowName}>
                年龄：
              </div>
              <div className = {styles.rowValue}>
                {modalDetailValue.age}
              </div>    
            </div>
          </div>
        </div>
      </div>


      <div className={styles.familyBlock}>
        <div className = {styles.familyTitle}>
          <div className = {styles.colorBlock1}>
          </div>
          <div className = {styles.textBlock}>
            家庭成员
          </div>              
        </div>

        <div className={styles.drawerTable}>
          <Table  dataSource={modalDetailValue.member} columns={familyMembers} pagination={false} />  
        </div>
      </div>

    </div>
  );
};

