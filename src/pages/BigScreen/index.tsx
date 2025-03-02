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
import company_introduction from '@/assets/bigScreen/pic/company_introduction.png';
import introduce2 from '@/assets/bigScreen/pic/introduce2.png'
import user_number from '@/assets/bigScreen/pic/user_number.png'

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
          设备状态
        </div>
      </div>

      <div className={styles.right_side}>
        <div className={styles.revenue}>
          工厂营收
        </div>
        <div className={styles.plan}>
          计划产值
        </div>
        <div className={styles.capacity}>
          车间产值
        </div>
      </div>
    </div>
  );
};
