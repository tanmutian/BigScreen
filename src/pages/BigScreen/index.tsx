import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message, Carousel} from 'antd';
import React, { useRef, useState ,useCallback,useEffect} from 'react';
import { useModel } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import company_introduction from '@/assets/bigScreen/pic/company_introduction.png';
import introduce2 from '@/assets/bigScreen/pic/introduce2.png'
import user_number from '@/assets/bigScreen/pic/user_number.png'
import device_stat from '@/assets/bigScreen/pic/device_status.png'
import revenue_img from '@/assets/bigScreen/pic/revenue.png'
import plan_blue from '@/assets/bigScreen/pic/plan_blue.png'
import plan_green from '@/assets/bigScreen/pic/plan_green.png'
import * as echarts from 'echarts';
//https://appstore.jiuxiniot.com/xy-3d-web/#/home

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
  } = useModel('BigScreen.model');

  useEffect(()=>{
    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  },[])

  const columns = [
    {
      title: "状态名称",
      dataIndex: "status_name",
      key: "status_name",
      render: (value,record,index) => {
        console.log(value,record,index)
        return<div className={styles.status_name}>
          {value}
        </div>
      },
    },
    {
      title: "已完成",
      dataIndex: "complete",
      key: "complete",
      render: (value,record,index) => {
        console.log(value,record,index)
        return<div className={styles.table_header_complete}>
          {value}
        </div>
      },
    },{
      title: "待完成",
      dataIndex: "wait_complete",
      key: "wait_complete",
      render: (value,record,index) => {
        console.log(value,record,index)
        return<div className={styles.table_header_incomplete}>
          {value}
        </div>
      },
    },{
      title: "总计",
      dataIndex: "total",
      key: "total",
      render: (value,record,index) => {
        console.log(value,record,index)
        return<div className={styles.table_header_total}>
          {value}
        </div>
      },
    }
  ];
  
  const data = [
    {
      status_name: "点检",
      complete: 0,
      wait_complete: 0,
      total: 0,
    },
    {
      status_name: "保养",
      complete: 0,
      wait_complete: 0,
      total: 0,
    },
    {
      status_name: "维修",
      complete: 0,
      wait_complete: 0,
      total: 0,
    }
  ];

  return (
    <div className={styles.global}>
      <div className={styles.left_side}>
        <div className={styles.company_information}>

          <div className={styles.company_title}>
            <div className={styles.company_subtitle}>
              公司介绍
            </div>
          </div>
          
          <div className={styles.company_carousel}>
            <Carousel autoplay dots={false}>
              <div>
                <h3 className={styles.contentStyle}>
                  <img src={company_introduction}>
                  </img>
                </h3>
              </div>
              <div>
                <h3 className={styles.contentStyle}>
                  <img src={introduce2}>
                  </img>
                </h3>
              </div>
              <div>
                <h3 className={styles.contentStyle}>
                浙江新云木业集团是木制、幼教玩具行业的龙头企业。是目前全国乃至世界较大的一家集研发、生产、经营幼教玩具及文化与动漫为主的民营企业。企业与沃尔玛、COSCO、迪士尼等国际大型联锁集团建立长久战略合作。
                </h3>
              </div>
            </Carousel>
          </div>
          
        </div>

        <div className={styles.user_number}>
          <div className={styles.company_title}>
            <div className={styles.company_subtitle}>
              用户数量
            </div>
          </div>

          <div className={styles.user_img}>
            <img src={user_number}>
            </img>
          </div>

          <div className={styles.user_text_small}>
            用户数量
          </div>
          <div className={styles.user_text_large}>
            50
          </div>
          <div className={styles.user_text_unit}>
            人
          </div>
        </div>

        <div className={styles.device_status}>
          <div className={styles.company_title}>
            <div className={styles.company_subtitle}>
              设备状态
            </div>
          </div>
          <div className={styles.date}>
              <div className={styles.date_select}>
                日
              </div>
              <div className={styles.date_specific}>
                月
              </div>
              <div className={styles.date_specific}>
                年
              </div>
          </div>

          <div className={styles.device_img}>
            <img src={device_stat}>
            </img>
          </div>

          <div className={styles.device_text_small}>
            设备总数
          </div>
          <div className={styles.device_text_large}>
            0
          </div>
          <div className={styles.device_text_unit}>
            台
          </div>

          <div className={styles.device_table}>
            <Table columns={columns} dataSource={data} pagination={false} size='small' />
          </div>
          
        </div>
      </div>

      <div className={styles.right_side}>
        <div className={styles.revenue}>
          <div className={styles.company_title}>
            <div className={styles.company_subtitle}>
            工厂营收
            </div>
          </div>
          
          <div className={styles.date}>
              <div className={styles.date_select}>
                日
              </div>
              <div className={styles.date_specific}>
                月
              </div>
              <div className={styles.date_specific}>
                年
              </div>
          </div>

          <div className={styles.revenue_img}>
            0%
          </div>

          <div className={styles.revenue_blue}>
            <div className={styles.blue_amount}>
              0.00
            </div>
            <div className={styles.blue_unit}>
              /万元
            </div>
            <div className={styles.dash_line}>
            </div>
            <div className={styles.blue_name}>
              工厂营收
            </div>
          </div>

          <div className={styles.revenue_green}>
            <div className={styles.green_amount}>
              0.00
            </div>
            <div className={styles.green_unit}>
              /万元
            </div>
            <div className={styles.dash_line}>
            </div>
            <div className={styles.green_name}>
              工厂回款
            </div>
          </div>
        </div>


        <div className={styles.plan}>
          <div className={styles.company_title}>
            <div className={styles.company_subtitle}>
            工厂营收
            </div>
          </div>
          
          <div className={styles.date}>
              <div className={styles.date_select}>
                日
              </div>
              <div className={styles.date_specific}>
                月
              </div>
              <div className={styles.date_specific}>
                年
              </div>
          </div>

          <div className={styles.values}>
            <div className={styles.values_plan}>
                <div className={styles.values_img}>
                  <img src={plan_blue}>
                  </img>
                </div>
                <div className={styles.values_text}>
                  <div className={styles.text_up}>
                    计划产值
                  </div>
                  <div className={styles.text_down}>
                    1222
                  </div>
                </div>
            </div>

            <div className={styles.values_achieved}>
                <div className={styles.values_img}>
                  <img src={plan_green}>
                  </img>
                </div>
                <div className={styles.values_text}>
                  <div className={styles.text_up}>
                    实际产值
                  </div>
                  <div className={styles.text_down}>
                    0.00
                  </div>
                </div>
            </div>
          </div>

          <div id="main" className={styles.chart}>
          </div>
        </div>
        <div className={styles.capacity}>
          车间产值
        </div>
      </div>
    </div>
  );
};
