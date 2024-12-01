import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback} from 'react';
import { useModel } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';

export default () => {
  const {
    serviceParamsGet,
    setServiceParamsGet,
    serviceParamsPost,
    setServiceParamsPost,
    serviceParamsPut,
    setServiceParamsPut,
    serviceParamsDelete,
    setServiceParamsDelete,
    componentParamsPrivate,
    setComponentParamsPrivate
  } = useModel('Template.model');

  const onClickGet = () => {
    setTest(test+'a')
    setHaha({

      ...haha,


      b:haha.b+'b'
    })
  };

  const onClickGetLink = () => {
    setLink(link*2)
  };

  const onClickGetObject = () => {
    const i = myObject.list
    i.push(i[i.length-1]+1)
    setMyObject({
      ...myObject,

      list:i
    })
  };

  const [test,setTest]=useState('a')

  const [haha,setHaha]=useState({
    a:1,
    b:'b',
    c:[1,2,3],
    d:{
      d1:'d1',
      d2:100,
    }
  })

  const [link,setLink]=useState(1)

  const [myObject,setMyObject]=useState({
    item:'list',
    number:10,
    list:[1,2,3,4,5,6,7],
    obj:{
      item1:'ad',
      item2:'sd'
    }
  })
  return (
    <div>
      <Button
        type="primary"
        onClick={()=>onClickGet()}
      >
        {test}
      </Button>
      <Button
        type="primary"
        onClick={()=>onClickGet()}
      >
        {haha.b}
      </Button>
      <Button
        type="primary"
        onClick={()=>onClickGetLink()}
      >
        {link}
      </Button>
      <Button
        type="primary"
        onClick={()=>onClickGetObject()}
      >
        {myObject.list}
      </Button>
    </div>
  );
};
