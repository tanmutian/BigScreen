import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from '../../api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useModel } from '@umijs/max';
import styles from './index.less';
import React, { useRef, useState ,useCallback,useEffect} from 'react';
import * as echarts from 'echarts';

export default () => {
  const {
    componentParamsPrivate,
    setComponentParamsPrivate,
    plan,
    setPlan,
  } = useModel('BigScreen.model');

  const onClickTemplateComponentPrivate = useCallback(async () => {
    setComponentParamsPrivate({
      ...componentParamsPrivate,
      test:componentParamsPrivate.test+1,
    })
  },[componentParamsPrivate, setComponentParamsPrivate]);

  useEffect(()=>{
    let chartDom:any = document.getElementById('main');
    let myChart = echarts.init(chartDom);


    const payload = {
        id: '',
        data: {
            title: ['生态指数'],
            unit: ['%'],
            x: plan.x,
            data1: plan.data1,
        },
    };

    const unit = payload.data.unit || [];
    const x = payload.data.x || [];
    const data1 = payload.data.data1 || [];
    const title = payload.data.title || [];

    let option = {
    //  backgroundColor: '#001037',
      grid: {
          top: 35,
          left: 15,
          right: 15,
          bottom: 10,
          // 是否包含文本
          containLabel: true,
      },
      xAxis: {
          data: x,
          axisLine: {
              lineStyle: {
                  type: 'solid',
                  color: '#4176a3',
                  width: '0.5', //坐标线的宽度
              },
          },
          axisLabel: {
              textStyle: {
                  color: '#fff', //底部文字颜色
                  fontSize: 12,
              },
          },
      },
      yAxis: [
          {
              name: '单位: ' + unit[0],
              nameTextStyle: {
                  align: 'left',
                  fontSize: 11,
                  color: '#4176a3',
              },
              type: 'value',
              axisLine: {
                  show: false,
                  lineStyle: {
                      color: 'transparent', //左边框颜色
                  },
              },
              splitLine: { show: false },
              axisTick: { show: false },
              axisLabel: {
                  show: true,
                  fontSize: 12,
                  textStyle: {
                      color: '#ADD6FF', //左文字颜色
                  },
              },
          },
      ],
      series: [
          {
              name: title[0],
              type: 'bar',
              barWidth: 30,
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(21,136,209,0.1)',
              },
              itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                          offset: 0,
                          color: '#1893FE', //渐变1
                      },
                      {
                          offset: 1,
                          color: '#1EE3E8', //渐变2
                      },
                  ]),
              },
              data: data1,
              z: 0,
              zlevel: 0,
          },
          {
              type: 'pictorialBar',
              barWidth: 30,
              itemStyle: {
                  color: '#021C46', //数据的间隔颜色
              },
              symbolRepeat: 'true',
              symbolMargin: 3,
              symbol: 'rect',
              symbolSize: [30, 4],
              data: data1,
              z: 1,
              zlevel: 0,
              label: {
                  show: true,
                  position: 'top',
                  fontSize: 14,
                  color: '#fff', //柱状顶部文字颜色
                  formatter: function (params) {
                      return params.data;
                  },
              }
          },
      ],
    };

    option && myChart.setOption(option);
  },[plan.data1, plan.x])

  return (
    <>
      <div id="main" className={styles.chart}>
      </div>
    </>
  );
};
