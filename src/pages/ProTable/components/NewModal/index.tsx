import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { message, Modal, notification, Input, Select, InputNumber, DatePicker } from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProForm, EditableProTable, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { addApi, templateAddApi, templateUpdateApi } from '../../api';
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




  return (
    <Modal
      title="新增"
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
  );
};

