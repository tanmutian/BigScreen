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
    </div>
  );
};


