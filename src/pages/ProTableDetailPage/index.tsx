import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { history, useModel, useParams } from '@umijs/max';
import { Button, Col, Divider, message, Row, Skeleton, Space, Descriptions, Input, Spin } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, EditableProTable, ProForm, ProFormText, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { decodeURIParams } from '@/utils';
import Return from '@/assets/icon/return.png';
import Title from '@/assets/icon/title.png';
import GlobalTitleBar from '@/components/GlobalTitleBar';
import { templateAddApi, templateUpdateApi } from './api';
import styles from './index.less';

export default () => {


  return (
    <div>123</div>
  );
};

