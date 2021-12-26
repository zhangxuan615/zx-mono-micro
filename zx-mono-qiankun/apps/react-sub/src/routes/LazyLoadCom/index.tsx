import React, { Suspense } from 'react';
import Loader from 'react-loader-spinner';
import { Spin } from 'antd';

// 资源请求失败，间隔1s重复请求三次
function tryLoad(
  factory: () => Promise<{ default: React.ComponentType }>,
  tryCnt = 3,
  interval = 1000
): Promise<{ default: React.ComponentType }> {
  return new Promise((resolve, reject) => {
    factory()
      .then(resolve)
      .catch(err => {
        setTimeout(() => {
          if (tryCnt <= 0) {
            reject(err);
            return;
          }
          tryLoad(factory, tryCnt - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

function LazyLoadCom(lazyFunc: () => Promise<{ default: React.ComponentType }>) {
  const LazyComponent = React.lazy(() => tryLoad(lazyFunc));

  return function (props: any) {
    return (
      <Suspense
        fallback={
          <div
            style={{
              margin: '20px 0',
              marginBottom: '20px',
              padding: '30px 50px',
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.05)'
            }}
          >
            <Spin />
          </div>
        }
      >
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default LazyLoadCom;
