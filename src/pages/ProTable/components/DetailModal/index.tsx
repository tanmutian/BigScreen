import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { message, Modal, notification, Form, Button, Spin } from 'antd';
import { ProForm, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { templateAddApi, templateUpdateApi } from '../../api';
import styles from './index.less';
import { getDetailTitle } from '@/utils';

export default () => {
  const {
    isModalDetailOpen, 
    setIsModalDetailOpen,
    modalDetailValue,
    setModalDetailValue,

  } = useModel('ProTable.model');

  const handleDetailCancel = () => {
    setIsModalDetailOpen(false);
  };
  return (
    <Modal
      title="详情"
      open={isModalDetailOpen}
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
  );
};

