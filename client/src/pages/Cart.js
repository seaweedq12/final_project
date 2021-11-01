import React, { useState } from "react";
import { useQuery } from '@apollo/client';


import CartList from '../components/CartList';
import { QUERY_ME } from '../utils/queries';

const Cart = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me.cart || [];
  console.log(me);
  
  return (
    <main>
      <div className="flex-row justify-center">
        <CartList me={me}/>  
      </div>
    </main>
  );
};

export default Cart;