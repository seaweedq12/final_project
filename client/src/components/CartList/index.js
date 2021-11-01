import React from 'react';

import { useMutation } from '@apollo/client';
import { REMOVE_PRODUCT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const CartList = ({me}) => {
  console.log(me);
  const [removeCart, { error }] = useMutation(REMOVE_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const handleRemoveCart = async ( productId ) => {
    try {
      const { data } = await removeCart({
          variables: { productId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!me.length) {
    return <h3>No Products have been added</h3>;
  }
 
  return (
    <div>
      {me.map((products , i) => (
          <div key={me[i]._id} className="card mb-3 col-12">
            <div className="card-body bg-light p-2">
            <img
               alt="productimage"
              src={me[i].imageUrl}
              />
              <p>{me[i].productName}</p>
              <p>{me[i].price}</p>
              <p>{me[i].stock}</p>
            </div>
            <button onClick={() => handleRemoveCart(me[i]._id)}>Remove</button>
          </div>
        ))}
        <button>Checkout</button>
    </div>
  );
};

export default CartList;