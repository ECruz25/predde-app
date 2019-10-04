import React from 'react';
import { Card, Grid } from 'antd';
const { Meta } = Card;
const BooksList = () => {
  const [books, setBooks] = useState([]);
  return (
    <div>
      {books.map(book => (
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      ))}
    </div>
  );
};

export default BooksList;
