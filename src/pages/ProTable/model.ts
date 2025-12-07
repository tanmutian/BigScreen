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

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [modalEditValue, setModalEditValue] = useState<any>({
    name: undefined,
    age: undefined,
    birthday: undefined,
    sex: undefined,
  })

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

  const [modalDetailValue, setModalDetailValue] = useState<any>({
    name: undefined,
    age: undefined,
    birthday: undefined,
    sex: undefined,
  })

  const [isDrawerDetailOpen, setDrawerDetailOpen] = useState(false);

  

  return {
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
  };
};
