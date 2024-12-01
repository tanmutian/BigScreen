import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback} from 'react';
import { useModel } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';
import Member from '@/assets/practiceIcon/member.png'
import Mail from '@/assets/practiceIcon/mail.png'
import { Flex } from 'antd';

export default () => {


  return (
    <div className={styles.global}>
      <div className={styles.primaryBackground}>
        <div className={styles.mainTitle}>
          首页
        </div>

        <div className={styles.secondTitle}>
          番剧
        </div>

        <div className={styles.secondTitle}>
          直播
        </div>

        <div className={styles.secondTitle}>
          游戏中心
        </div>

        <div className={styles.secondTitle}>
          会员购
        </div>

        <div className={styles.secondTitle}>
          漫画
        </div>

        <div className={styles.secondTitle}>
          赛事
        </div>

        <div className={styles.search}>
          搜索
        </div>

        <div className={styles.login}>
          登录
        </div>

        <div className={styles.member}>
          <img className={styles.memberIcon} src={Member}>
          </img>
          <div className={styles.memberText}>
            大会员
          </div>
        </div>

        <div className={styles.member}>
          <img className={styles.memberIcon} src={Mail}>
          </img>
          <div className={styles.memberText}>
            消息
          </div>
        </div>

        <Button type="primary" className={styles.post}>投稿</Button>
      </div>
    </div>
  );
};
