import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, message, Popconfirm, Space, Upload } from 'antd';
import {DownloadOutlined,PlusOutlined,UploadOutlined,} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { uuidv4 } from '@antv/xflow';
import { downloadFile, encodeURIParams } from '@/utils';
import { cloneDeep, debounce } from 'lodash';
import { templateDeleteApi, templateExportApi, templateListApi } from './api';
import DetailModal from './components/DetailModal';
import DetailDrawer from './components/DetailDrawer';
import styles from './index.less';

export default () => {
  const {
    refLayoutContent
  } = useModel('global');
  const {
  } = useModel('ProTable.model');

  
  return (
    <div className={styles.global}>
      <div className={styles.finding}>

        <div className = {styles.findingName}>
          <div className = {styles.findingName1}>
          </div>
          <div className = {styles.findingName2}>
          </div>
          <div className = {styles.findingName3}>
          </div>
        </div>

        <div className = {styles.findingSex}>
          <div className = {styles.findingSex1}>
            <div className = {styles.findingSex1_1}>
            </div>
            <div className = {styles.findingSex1_2}>
            </div>
            <div className = {styles.findingSex1_3}>
            </div>                                
          </div>

          <div className = {styles.findingSex2}>
          </div>
          <div className = {styles.findingSex3}>
          </div>                          
        </div>
        <div className = {styles.findingBirth}>
        </div>
        {/* <div className = {styles.findingAge}>
        </div> */}
      </div>
    </div>
  );
};


