import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Checkout from './Checkout';
import { getCart } from './cartHelpers';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, index) => (
          <Card
            key={index}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        Your cart is empty. <br /> <Link to='/shop'>Continua comprando</Link>
      </h2>
    );
  };

  return (
    <Layout
      title='Cart'
      description='Manage your catr items. Add remove checkout or continue shopping'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-6'>
          <h2 className="mb-4">Your cart summary</h2>
          <hr/>
          <Checkout products={items} setRun={setRun} run={run}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
