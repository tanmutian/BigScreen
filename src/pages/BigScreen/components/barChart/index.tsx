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
    setComponentParamsPrivate
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
    // let option;

    // option = {
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: [120, 200, 150, 80, 70, 110, 130],
    //       type: 'bar'
    //     }
    //   ]
    // };

const payload = {
    id: '',
    data: {
        title: ['生态指数'],
        unit: ['%'],
        x: ['1月', '2月', '3月', '4月', '5月', '6月'],
        data1: [20, 80, 100, 40, 34, 90],
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
      tooltip: {
          // 触发类型  经过轴触发axis  经过轴触发item
          trigger: 'axis',
    //      backgroundColor: 'rgba(9, 30, 60, 0.6)',
          extraCssText: 'box-shadow: 0 0 8px rgba(0, 128, 255, 0.27) inset;',
          borderWidth: 0,
          confine: false,
          appendToBody: true,
          textStyle: {
              color: '#fff',
              fontSize: 10,
          },
          // 轴触发提示才有效
          axisPointer: {
              type: 'shadow',
          },
          shadowStyle: {
              color: 'rgba(157, 168, 245, 0.1)',
          },

          formatter: (data) => {
              var tip = '<h5 class="echarts-tip-h5">' + data[0].name + '</h5>';
              data.forEach((item) => {
                  let unit = '';
                  if (item.seriesType === 'bar') {
                      tip += '<div class="echarts-tip-div">';
                      tip += '<div class="left">' + item.marker + item.seriesName + '：</div>';
                      tip += '<div class="right">' + item.value + unit + '</div>';
                      tip += '</div>';
                  }
              });
              return tip;
          },
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
  },[])

  return (
    <>
      <div id="main" className={styles.chart}>
      </div>
    </>
  );
};
