// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

export default () => {
  const [serviceParamsGet, setServiceParamsGet] = useState<any>({
    paramsGet:'get',
  });
  const [serviceParamsPost, setServiceParamsPost] = useState<any>({
    paramsPost:'post',
  });
  const [serviceParamsPut, setServiceParamsPut] = useState<any>({
    paramsPut:'put',
  });
  const [serviceParamsDelete, setServiceParamsDelete] = useState<any>({
    paramsDelete:'delete',
  });
  const [componentParamsPrivate, setComponentParamsPrivate] = useState<any>({
    test:1,
  });
  const [factoryRevenue,setFactoryRevenue] = useState<any>({
    revenue:8,
    refund:5,
  });
  const [capacity, setCapacity] = useState<any>({
    dataArray:[100,200,300,400]
  })
  const [plan, setPlan] = useState<any>({
    plan_value:12,
    achieved_value:15,
    x:['2025-07-01','2025-07-02','2025-07-03','2025-07-04','2025-07-05','2025-07-06','2025-07-07'],
    data1:[1,7,5,8,9,4,5],
  })
  const [device, setDevice] = useState<any>({
    total:150,
    data:[
      {
        status_name: "点检",
        complete: 3,
        wait_complete: 5,
        total: 8,
      },
      {
        status_name: "保养",
        complete: 4,
        wait_complete: 1,
        total: 5,
      },
      {
        status_name: "维修",
        complete: 7,
        wait_complete: 0,
        total: 7,
      }
    ]
  })
  return {
    serviceParamsGet,
    setServiceParamsGet,
    serviceParamsPost,
    setServiceParamsPost,
    serviceParamsPut,
    setServiceParamsPut,
    serviceParamsDelete,
    setServiceParamsDelete,
    componentParamsPrivate,
    setComponentParamsPrivate,
    factoryRevenue,
    setFactoryRevenue,
    capacity,
    setCapacity,
    plan,
    setPlan,
    device,
    setDevice,
  };
};