import React from 'react';

import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const ProductList = ({
  products,
  title,
}) => {
  const [addCart, { error }] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const handleAddCart = async ( productId ) => {
    try {
      const { data } = await addCart({
          variables: { productId },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };


  if (!products.length) {
    return <h3>No Products Yet</h3>;
  }

  return (
    <div className="row">
      {<h3 className="col-12">{title}</h3>}
      <div className="row">
      {products &&
        products.map((products) => (
          <div key={products._id} className="card mb-3 col-lg-6">
            <div className="card-body bg-light p-2">
            <img
               alt="productimage"
              src={products.imageUrl}
              />
              <p>{products.productName}</p>
              <p>{products.price}</p>
              <p>{products.stock}</p>
            </div>
            <button onClick={() => handleAddCart(products._id)}>Add to cart</button>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ProductList;
