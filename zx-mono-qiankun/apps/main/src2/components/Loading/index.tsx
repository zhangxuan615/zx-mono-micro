import React from 'react';

const Loading: React.FC<{ loading?: boolean }> = props => {
  const { loading } = props;
  return <>{loading && <h4 className="mainapp-loading">loading...</h4>}</>;
};

export default Loading;
