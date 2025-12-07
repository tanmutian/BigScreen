import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { message, Modal,Input, Select, DatePicker, InputNumber} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProForm, EditableProTable, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { editApi, templateAddApi, templateUpdateApi } from '../../api';
import styles from './index.less';
import { getDetailTitle } from '@/utils';
import Title from '@/assets/icon/title.png';
import Close from '@/assets/icon/close.png';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default (props) => {
  const {searching} = props
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


  const onChangeEditModalAge = useCallback((value) => {
    setModalEditValue((prev) => {
      return {
        ...prev,
        age:value
      }
    })
  },[setModalEditValue])

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

  return (
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
  );
};


