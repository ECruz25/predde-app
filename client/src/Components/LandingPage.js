import React from 'react';
import { Link } from 'react-router-dom';
import CollectionsPage from './addCategoryButton';

const LandingPage = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Link
        to="/imprenta"
        style={{ backgroundColor: 'black', height: '100%', width: '100%' }}
      >
        Imprenta
      </Link>
      <Link
        to="/editorial"
        style={{ backgroundColor: 'red', height: '100%', width: '100%' }}
      >
        Editorial
      </Link>
      <CollectionsPage></CollectionsPage>
    </div>
  );
};

export default LandingPage;
