import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';

import styles from './index.less';

function Home() {
  const [cnt, setCnt] = useState(0);

  return (
    <div className={styles['home-container']}>
      Home23421dafd123eee112122
      <div>{cnt}</div>
      <Button onClick={() => setCnt(pre => pre + 1)}>点击</Button>
      <UserInfo></UserInfo>
    </div>
  );
}

export default Home;
