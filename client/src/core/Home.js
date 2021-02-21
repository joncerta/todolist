import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getTasks } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [productBySell, setProductsBySell] = useState([]);
  const [productByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getTasks('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getTasks('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title='Home' description='' className="container-fluid">
      <Search/>
      <h2 className='mb-4'>Productos nuevos</h2>
      <div className='row'>
        {productByArrival.map((product, index) => (
          <div key={index} className='col-4 mb-3'>
            <Card product={product} />
          </div>
        ))}
      </div>
      <hr />
      <h2 className='mb-4'>Mejor vendidos</h2>
      <div className='row'>
        {productBySell.map((product, index) => (
          <div key={index} className='col-4 mb-3'>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
