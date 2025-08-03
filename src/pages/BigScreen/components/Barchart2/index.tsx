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
    capacity,
    setCapacity,
  } = useModel('BigScreen.model');

  const onClickTemplateComponentPrivate = useCallback(async () => {
    setComponentParamsPrivate({
      ...componentParamsPrivate,
      test:componentParamsPrivate.test+1,
    })
  },[componentParamsPrivate, setComponentParamsPrivate]);

  useEffect(()=>{
   let chartDom:any = document.getElementById('main1');
   let myChart = echarts.init(chartDom);

   


   let information = {
      color: "#069DFD",
      area: ["单位一", "单位二", "单位三", "单位四"],
      dataArray: capacity.dataArray,
   };

   let style = {
      width: 32,
      height: 24,
      padding: [5, 6, 0, 0],
      fontSize: 20,
      align: "center",
      color: "#ffffff"
   }

   let option = {
      //backgroundColor: "#021032",
      tooltip: {
         trigger: "axis",
         backgroundColor: "rgba(9,40,84,0.8)",
         borderColor: "rgba(9,40,84,0.8)",
         textStyle: {
            fontSize: 20,
            color: "#fff",
         },
         axisPointer: {
            type: "shadow",
         },
         formatter: function (params) {
            return (
               params[0].name +
               "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-weight:bold;color:'#fff'>" +
               params[0].value +
               "KM</span>"
            );
         },
      },
      grid: {
         left: "5%",
         right: "5%",
         top: "10%",
         bottom: "20%", // 特殊
         containLabel: true,
      },
      xAxis: [
         {
            type: "value",
            show: false,
         },
      ],
      yAxis: [
         {
            type: "category",
            splitLine: {
               show: false,
            },
            axisLine: {
               show: false,
            },
            axisTick: {
               show: false,
            },
            inverse: true,
            data: information.area,
            axisLabel: {
               color: "rgba(96, 98, 102, 1)",
               margin: 10,
               formatter: (name, index) => {
                  const id = index + 1;
                  if (id <5) {
                     return `{id|${id}}{nameStyle|${name}}`;
                  } else {
                     return `{ids|${id}}{nameStyle|${name}}`;
                  }
               },
               rich: {
                  id:{
                     padding: [0, 0, 0, 2],
                     fontSize: 16,
                     color: '#fff',
                  },
                  ids:{
                     padding: [0, 0, 0, 2],
                     fontSize: 16,
                     color: '#b4bec8',
                  },
                  nameStyle: {
                     padding: [0, 10, 0, 2],
                     fontSize: 16,
                     color: '#fff',
                  },
                  rank: {
                     ...style,
                     backgroundColor: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                        {
                           offset: 0,
                           color: '#E7F4FF',
                        },
                        {
                           offset: 0.95,
                           color: '#fff',
                        },
                     ]),
                  },
                  rank1: {
                     ...style,
                     color: "#FF992B",
                     backgroundColor: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                        {
                           offset: 0,
                           color: '#E7F4FF',
                        },
                        {
                           offset: 0.95,
                           color: '#fff',
                        },
                     ]),
                  },
               },
            },
         },
         {
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
               color: "#59c5c6",
               fontSize: 20,
               margin: 20,
               formatter: function (value) {
                  return value+'万元';
               },
            },
            data: information.dataArray,
         },
      ],
      series: [
         {
            type: "bar",
            barWidth: 10, // 柱子宽度
            MaxSize: 0,
            showBackground: true,
            backgroundStyle: {
               color: "rgb(10, 51, 126)",
               borderRadius: 5, //设置背景的圆角
            },
            data: information.dataArray.map((item) => {
               return {
                  value: item,
                  itemStyle: {
                     borderRadius: 5,
                     color: information.color,
                  },
               };
            }),
         },
         {
         type: 'scatter',
         emphasis: {
         scale: false
         },
         symbol: 'rect',
         itemStyle: {
         barBorderRadius: [30, 0, 0, 30],
         color: '#fff',
         shadowColor: '#fff',
         shadowBlur: 1,
         borderWidth: 1,
         opacity: 1
         },
         symbolSize: [4, 10], // 进度条白点的大小
         z: 2,
         data: [560, 480, 350, 280, 220, 180],
      },
      ],
   };


    option && myChart.setOption(option);
  },[capacity.dataArray])

  return (
    <>
      <div id="main1" className={styles.chart}>
      </div>
    </>
  );
};
