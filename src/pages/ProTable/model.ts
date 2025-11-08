import type { ActionType, Key, ProFormInstance } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { templateDetailApi } from './api';

export default () => {
  const [data,setData] = useState<any>()
  const [pagination, setPagination] = useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
  })
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [modalAddValue, setModalAddValue] = useState({
    name: undefined,
    age: undefined,
    birthday: undefined,
    sex: undefined,
  })
  return {
    data,
    setData,
    pagination,
    setPagination,
    isModalAddOpen, 
    setIsModalAddOpen,
    modalAddValue, 
    setModalAddValue
  };
};
