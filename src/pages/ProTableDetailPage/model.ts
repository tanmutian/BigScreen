import type { ActionType, Key, ProFormInstance } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { templateDetailApi } from './api';

export default () => {
  const [modalDetailValue, setModalDetailValue] = useState<any>({
    name: undefined,
    age: undefined,
    birthday: undefined,
    sex: undefined,
    member:undefined,
  })
  return {
    modalDetailValue, 
    setModalDetailValue,
  };
};
