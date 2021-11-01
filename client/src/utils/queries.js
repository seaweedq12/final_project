import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
    email
    name
    phoneNumber
    address
    cart {
      _id
      productName
      price
      imageUrl
    }
    previousOrder {
      orderDate
      productList{
        productName
        price
        imageUrl
      }
    }
  }
}  
`;

export const QUERY_PRODUCTS = gql`
  query products {
    products {
      _id
      productName
      price
      stock
      imageUrl
    }
  }  
`;



