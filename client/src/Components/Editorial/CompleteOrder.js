import React, { useEffect, useState } from 'react';
import { Empty, List, Skeleton, Avatar } from 'antd';

const CompleteOrder = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const cartInStorage = JSON.parse(localStorage.getItem('predde-cart')) || {};
    const newData = Object.values(cartInStorage).map(val => ({
      ...val,
      total: val.amount * val.price
    }));
    setData(newData);
    setIsLoading(false);
  }, [setData]);
  return (
    <div>
      {data.length > 0 ? (
        <div>
          <List
            className="demo-loadmore-list"
            loading={isLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={`books/${item.image}`} />}
                    title={item.name}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default CompleteOrder;
