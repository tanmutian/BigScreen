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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState({
    name: null,
    age: null,
    birthday: null,
    sex: null,
  })
  return {
    data,
    setData,
    pagination,
    setPagination,
    isModalOpen, 
    setIsModalOpen,
    modalValue, 
    setModalValue
  };
};
