import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback,useEffect} from 'react';
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
    seta(a+1)
  };
  //有两个变量，a和b，a初始值0，b初始值100，点击按钮递增a，当a大于10的时候，b才开始递增，在页面上打印出a和b的实时值

  const [a,seta]=useState(0)

  const [b,setb] = useState(100)

  useEffect(()=>{
    console.log('MyA',a)
    if(a>10){
      setb((prev)=>{
        return prev+1
      })
    }
  },[a])



  return (
    <div>
      <div className={styles.test}>
        <div className={styles.test1}>
        </div>
        <div className={styles.test1}>
          <div className={styles.test2}>
          </div>
        </div>

        
      </div>
    </div>
  );
};
