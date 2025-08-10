import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Link,history } from 'umi';
import { Layout, Dropdown, Menu,Avatar } from 'antd';
import { CaretDownOutlined, LogoutOutlined, UserOutlined,HomeOutlined} from '@ant-design/icons';
import React, { useRef, useState ,useCallback,useMemo} from 'react';
import styles from './index.less';
import Logo from '@/assets/icon/logo.png';
import Home from '@/assets/icon/home.png';
import UserIconDown from '@/assets/icon/userIconDown.png';
import IconUser from '@/assets/icon/iconUser.png';
import { goHome, goLogin } from '@/utils';

export default ({getDate, getMonth, getYear,title, unit}) => {
  const [factoryRevenueCurrentClick,setFactoryRevenueCurrentClick] = useState<any>("day")
  const getDatePlan = useCallback(
    () => {
      setFactoryRevenueCurrentClick("day")
      getDate()
    },[getDate]
  )

  const getMonthPlan = useCallback(
    () => {
      setFactoryRevenueCurrentClick("month")
      getMonth()
    },[getMonth]
  )

  const getYearPlan = useCallback(
    () => {
      setFactoryRevenueCurrentClick("year")
      getYear()
    },[getYear]
  )  
  
  return (
    <div className={styles.global}>
      <div className={styles.company_title}>
        <div className={styles.company_subtitle}>
          {title}
        </div>
        <div className={styles.title_unit}>
          {unit}
        </div>
      </div>
      
      <div className={styles.date}>
        {getDate?<div className={`${styles.date_specific} ${factoryRevenueCurrentClick === "day"? styles.clickNow:""}`} onClick={()=>getDatePlan()}>
          日
        </div>:null}
        {getMonth?<div className={`${styles.date_specific} ${factoryRevenueCurrentClick === "month"? styles.clickNow:""}`} onClick={()=>getMonthPlan()}>
          月
        </div>:null}
        {getYear?<div className={`${styles.date_specific} ${factoryRevenueCurrentClick === "year"? styles.clickNow:""}`} onClick={()=> getYearPlan()}>
          年
        </div>:null}
      </div>
    </div>
  );
};
