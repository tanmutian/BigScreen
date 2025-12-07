import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { message, Modal,Input, Select, DatePicker, InputNumber, FormProps, Form, Button, Space} from 'antd';
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

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const onFinish: FormProps<any>['onFinish'] = async(values) => {
    console.log('Success:', values);
    const response = await editApi({
        id:modalEditValue.id,
        ...values,
        birthday: dayjs(values.birthday).format('YYYY-MM-DD HH:mm:ss')
      })
      console.log(modalEditValue)
      setIsModalEditOpen(false);
      searching()
  };

  const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  useEffect(()=>{
    if(isModalEditOpen){
      form.setFieldsValue({...modalEditValue });
    }
  },[form, isModalEditOpen, modalEditValue])

  return (
  <Modal
    title="编辑"
    open={isModalEditOpen}
    footer = {null}
  >
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className={styles.newAddition}>
        <div className={styles.modalInput}>
          <Form.Item<any>
            label="姓名"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              placeholder="请输入" 
              className={styles.addInput}
            />
          </Form.Item>
        </div>
        <div className={styles.modalInput}>
          <Form.Item<any>
            label="性别"
            name="sex"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Select
              placeholder = "请选择"
              style={{ width: "100%" }}
              options={[
                { value: 'male', label: '男' },
                { value: 'female', label: '女' },
              ]}
              className = {styles.addInput}
            />
          </Form.Item>

        </div>
        <div className={styles.modalInput}>
          <Form.Item<any>
            label="出生日期"
            name="birthday"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <DatePicker
              showTime
              className = {styles.addInput}
            />
          </Form.Item>

        </div>
        <div className={styles.modalInput}>
          <Form.Item<any>
            label="年龄"
            name="age"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <InputNumber 
              placeholder='请输入' 
              className = {styles.addInput} 
            />
          </Form.Item>
        </div>
        <div className={styles.modalInput}>
          <Form.Item<any>
            label=""
          >
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={handleEditCancel}>
              取消
            </Button>
          </Space>
          </Form.Item>
        </div>
      </div>
    </Form>

  </Modal>
  );
};


