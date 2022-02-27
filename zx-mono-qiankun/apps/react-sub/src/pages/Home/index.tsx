import { Button } from 'antd';
import React, { useState } from 'react';
import UserInfo from './UserInfo';

import styles from './index.less';

function Home() {
  const [cnt, setCnt] = useState(0);

  return (
    <div className={styles['home-container']}>
      react-spa子应用 home
      <div>{cnt}</div>
      <Button onClick={() => setCnt(pre => pre + 1)}>点击</Button>
      <UserInfo></UserInfo>
    </div>
  );
}

export default Home;
