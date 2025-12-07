import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { message, Modal, notification, Form, Button, Spin, Drawer, Table, TableColumnsType } from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProForm, EditableProTable, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { templateAddApi, templateUpdateApi } from '../../api';
import styles from './index.less';
import { getDetailTitle } from '@/utils';
import Title from '@/assets/icon/title.png';
import Close from '@/assets/icon/close.png';

export default () => {
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

  const handleDetailCancel = () => {
    //console.log("asdfasdfaswdfasdfasdfa")
    setIsModalDetailOpen(false);
  };

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
  return (
    <Drawer
      open={isModalDetailOpen}
      onClose={handleDetailCancel}
      size = {'large'}
      closable = {false}
    >
      <div className = {styles.drawerGlobal}>
        <div className={styles.globalTitle}>
          <div className={styles.titleValue}>
            详情
          </div>
          <CloseOutlined className={styles.closeIcon} onClick={handleDetailCancel}/>
        </div>

        <div className = {styles.basicDetail}>
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
            </div>

            <div className={styles.outRow}>
              <div className={styles.inRow}>
                <div className={styles.rowName}>
                  出生日期：
                </div>
                <div className = {styles.rowValue}>
                  {modalDetailValue.birthday}
                </div>
              </div>
              <div className={styles.inRow}>
                <div className={styles.rowName}>
                  年龄：
                </div>
                <div className = {styles.rowValue}>
                  {modalDetailValue.age}
                </div>    
              </div>
            </div>
          </div >
        </div>
        
        <div className={styles.familyDetail}>
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
    </Drawer>
  );
};

