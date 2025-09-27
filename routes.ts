import { Component } from "react";

//采用一级平铺定义路由，禁止嵌套定义路由
export const routes = [
  {
    path: '/',
    redirect: '/user/login',
    layout: false
  },
  {
    name: '登录',
    path: '/user/login',
    component: './Login', 
    layout: false
  },
  {
    name: '模板',
    path: '/template',
    component: './Template',
    layout: false
  },
  {
    name: '模板echarts',
    path: '/templateEcharts',
    component: './TemplateEcharts',
    layout: false
  },
  {
    name: '模板埋点',
    path: '/templateEventTracking',
    component: './TemplateEventTracking',
    layout: false
  },
  {
    name: '模板ProTable列表',
    path: '/templateProTable',
    component: './TemplateProTable',
    layout: false
  },
  {
    name: '模板ProTable详情',
    path: '/templateProTableDetailPage',
    component: './TemplateProTableDetailPage',
    layout: false,
  },
  {
    name: '布局知识点',
    path: '/layoutKnowledge',
    component: './LayoutKnowledge',
    layout: false,
  },
  {
    name: '布局知识点练习',
    path: '/layoutKnowledgePractice',
    component: './LayoutKnowledgePractice',
    layout: false,
  },
  {
    name: '大屏项目',
    path: '/bigscreen',
    component: './BigScreen',
    layout: false,
  },
  {
    name: '后台管理系统项目',
    path: '/proTable',
    component: './ProTable',
    layout: false,
  },
  {
    name:'flex布局练习',
    path: '/flexTemplate',
    component: './FlexTemplate',
    layout: false,
  },
  {
    name:'ThreeJS',
    path:'/testThreeJS',
    component: './TemplateThreeJS',
    layout: false,
  },
  {
    name: '404',
    path:'/*',
    component: './404',
    layout: false,
  },
]