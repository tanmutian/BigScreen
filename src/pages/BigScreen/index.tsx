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
import clear_icon from '@/assets/bigScreen/pic/clear.png'
import * as echarts from 'echarts';
import BarChart from './components/barChart'
import BarChart2 from './components/Barchart2'
import TitleBar from '@/components/TitleBar';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import dayjs from 'dayjs';
import { useMutableCallback } from '@react-three/fiber/dist/declarations/src/core/utils';
import {getUserCountApi} from './api'
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
    setComponentParamsPrivate,
    factoryRevenue,
    setFactoryRevenue,
    capacity,
    setCapacity,
    plan,
    setPlan,
    device,
    setDevice,
    currentTime,
    setCurrentTime,
    showScreen,
    setShowScreen,
    userCount,
    setUserCount,
  } = useModel('BigScreen.model');

  const getDateRevenue = useCallback(
    () => {
      setFactoryRevenue({revenue:8,refund:5})
    },[setFactoryRevenue]
  )

  const getMonthRevenue = useCallback(
    () => {
      setFactoryRevenue({revenue:120,refund:80})
    },[setFactoryRevenue]
  )

  const getYearRevenue = useCallback(
    () => {
      setFactoryRevenue({revenue:800,refund:680})
    },[setFactoryRevenue]
  )
  
  const getDateCapacity = useCallback(
    () => {
      setCapacity({dataArray:[100,200,300,400]})
    },[setCapacity]
  )

  const getMonthCapacity = useCallback(
    () => {
      setCapacity({dataArray:[300,500,700,900]})
    },[setCapacity]
  )

  const getYearCapacity = useCallback(
    () => {
      setCapacity({dataArray:[1000,1500,2000,2500]})
    },[setCapacity]
  )

    const getDatePlan = useCallback(
    () => {
      setPlan({
        plan_value:12,
        achieved_value:15,
        x:['2025-07-01','2025-07-02','2025-07-03','2025-07-04','2025-07-05','2025-07-06','2025-07-07'],
        data1:[1,7,5,8,9,4,5],
      })
    },[setPlan]
  )

  const getMonthPlan = useCallback(
    () => {
      setPlan({
        plan_value:122,
        achieved_value:155,
        x:['01','02','03','04','05','06'],
        data1:[15,85,45,68,92,150],
      })
    },[setPlan]
  )

  const getYearPlan = useCallback(
    () => {
      setPlan({
        plan_value:1222,
        achieved_value:1555,
        x:['2019','2020','2021','2022','2023','2024','2025'],
        data1:[120,150,167,121,142,180,158],
      })
    },[setPlan]
  )

  const getDateDevice = useCallback(
    () => {
      setDevice({
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
    },[setDevice]
  )

  const getMonthDevice = useCallback(
    () => {
      setDevice({
        total:150,
        data:[
          {
            status_name: "点检",
            complete: 17,
            wait_complete: 5,
            total: 22,
          },
          {
            status_name: "保养",
            complete: 8,
            wait_complete: 5,
            total: 13,
          },
          {
            status_name: "维修",
            complete: 12,
            wait_complete: 2,
            total: 14,
          }
        ]
      })
    },[setDevice]
  )

  const getYearDevice = useCallback(
    () => {
      setDevice({
        total:150,
        data:[
          {
            status_name: "点检",
            complete: 30,
            wait_complete: 6,
            total: 36,
          },
          {
            status_name: "保养",
            complete: 38,
            wait_complete: 10,
            total: 48,
          },
          {
            status_name: "维修",
            complete: 50,
            wait_complete: 2,
            total: 52,
          }
        ]
      })
    },[setDevice]
  )

  const columns = [
    {
      title: "状态名称",
      dataIndex: "status_name",
      key: "status_name",
      render: (value,record,index) => {
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
        return<div className={styles.table_header_complete}>
          {value}
        </div>
      },
    },{
      title: "待完成",
      dataIndex: "wait_complete",
      key: "wait_complete",
      render: (value,record,index) => {
        return<div className={styles.table_header_incomplete}>
          {value}
        </div>
      },
    },{
      title: "总计",
      dataIndex: "total",
      key: "total",
      render: (value,record,index) => {
        return<div className={styles.table_header_total}>
          {value}
        </div>
      },
    }
  ];
  
  const threeRef = useRef<HTMLDivElement>(null);

  const loadHdr = useCallback(async () => {
    return new Promise<any>((resolve, reject) =>{
      new RGBELoader().load('./hdr/company.hdr', (texture) => {
        resolve(texture)
      })
    })
  },[]);

  const loadGlb = useCallback(async () => {
    return new Promise<any>((resolve, reject) => {
      new GLTFLoader().load('./model/company.glb',(gltf)=>{
        resolve(gltf)
      })
    })
  },[]);

  const init = useCallback(async (renderer) => {
    if(threeRef.current){
      const scene = new THREE.Scene();

      const texture = await loadHdr();
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      scene.background = envMap;
      texture.dispose();
      pmremGenerator.dispose();

      const gltf = await loadGlb();
      scene.add(gltf.scene);

      const camera = new THREE.PerspectiveCamera(
        75,
        threeRef.current.clientWidth / threeRef.current.clientHeight,
        0.1,
        1000000
      );
      camera.position.z = 200;
      camera.position.y = 200;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.rotateSpeed = 5;
      controls.panSpeed = 2;

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update()
        renderer.render(scene, camera);
      };
      animate();
    }
  },[loadGlb, loadHdr])

  const changeShowScreen = useCallback(() => {
    if(showScreen === true){
      setShowScreen(false)
    }else{
      setShowScreen(true)
    }
  },[setShowScreen, showScreen])

  useEffect(() => {
    let renderer;
    if(threeRef.current){
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(threeRef.current.clientWidth, threeRef.current.clientHeight);
      threeRef.current.appendChild(renderer.domElement);
      init(renderer)
    }

    return () => {
      if(threeRef.current){
        threeRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    }
  },[init])  

  useEffect(() =>{
    let currentInterval = setInterval(() => {
      setCurrentTime(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    }, 300);

    return () => {
      clearInterval(currentInterval)
    }
  },[setCurrentTime])

  const getUserCount = useCallback(async () => {
    const response = await getUserCountApi({})
    setUserCount(response.userCount)
  },[setUserCount])

  useEffect(() => {
    getUserCount()
  },[getUserCount])


  return (
    <div className={styles.global}>
      <div ref={threeRef} className={styles.threeGlobal}>
      </div>
      <div className={styles.head_title}>
        <div className={styles.title_text}>
          新云工艺品可视化大屏
        </div>
      </div>
      <div className={`${styles.left_side} ${showScreen?'':styles.move_to_left}`}>
        <div className={styles.company_information}>

          <TitleBar 
            getDate={null} 
            getMonth={null} 
            getYear={null}
            title = "公司介绍"
            unit = ""
          >
          </TitleBar>
          
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
          <TitleBar 
            getDate={null} 
            getMonth={null} 
            getYear={null}
            title = "用户数量"
            unit = ""
          >
          </TitleBar>

          <div className={styles.user_img}>
            <img src={user_number}>
            </img>
          </div>

          <div className={styles.user_text_small}>
            用户数量
          </div>
          <div className={styles.user_text_large}>
            {userCount}
          </div>
          <div className={styles.user_text_unit}>
            人
          </div>
        </div>

        <div className={styles.device_status}>
          <TitleBar 
            getDate={()=> getDateDevice()} 
            getMonth={()=> getMonthDevice()} 
            getYear={()=> getYearDevice()}
            title = "设备状态"
            unit = ""
          >
          </TitleBar>

          <div className={styles.device_img}>
            <img src={device_stat}>
            </img>
          </div>

          <div className={styles.device_text_small}>
            设备总数
          </div>
          <div className={styles.device_text_large}>
            {device.total}
          </div>
          <div className={styles.device_text_unit}>
            台
          </div>

          <div className={styles.device_table}>
            <Table columns={columns} dataSource={device.data} pagination={false} size='small' />
          </div>
          
        </div>
      </div>



      <div className={`${styles.right_side} ${showScreen?'':styles.move_to_right}`}>
        <div className={styles.timer}>
          {currentTime}
        </div>
        <div className={styles.revenue}>
          <TitleBar 
            getDate={()=> getDateRevenue()} 
            getMonth={()=> getMonthRevenue()} 
            getYear={()=> getYearRevenue()}
            title = "工厂营收"
            unit = ""
          >
          </TitleBar>

          <div className={styles.revenue_img}>
            0%
          </div>

          <div className={styles.revenue_blue}>
            <div className={styles.blue_amount}>
              {factoryRevenue.revenue}
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
              {factoryRevenue.refund}
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

        <div className={styles.icon} onClick={changeShowScreen}>
          <img src = {clear_icon}>
          </img>
        </div>

        <div className={styles.plan}>
          <TitleBar 
            getDate={()=> getDatePlan()} 
            getMonth={()=> getMonthPlan()} 
            getYear={()=> getYearPlan()}
            title = "计划产值"
            unit = "（单位万元）"
          >
          </TitleBar>

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
                    {plan.plan_value}
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
                    {plan.achieved_value}
                  </div>
                </div>
            </div>
          </div>

          <BarChart>
          </BarChart>
        </div>
        <div className={styles.capacity}>
          <TitleBar 
            getDate={()=> getDateCapacity()} 
            getMonth={()=> getMonthCapacity()} 
            getYear={()=> getYearCapacity()}
            title = "车间产值"
            unit = "（单位万元）"
          ></TitleBar>
          <BarChart2>
          </BarChart2>
        </div>
      </div>
    </div>
  );
};
