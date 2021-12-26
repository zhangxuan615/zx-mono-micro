import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './index.less';

function UserInfo() {
  const [cnt, setCnt] = useState(0);

  return (
    <div className={styles['container']}>
      UserInfo1122212222222
      <div>用户信息2：{cnt}</div>
      <Button onClick={() => setCnt(pre => pre + 1)}>点击</Button>
    </div>
  );
}

export default UserInfo;
