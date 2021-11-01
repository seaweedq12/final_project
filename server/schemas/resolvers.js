const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('cart').populate('previousOrder');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    products: async () => {
      return Product.find();
    },
   
  },
  Mutation: {
    addUser: async (parent, { email, password, name, phoneNumber, address }) => {
      const user = await User.create({ email, password, name, phoneNumber, address });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCart: async (parent, { productId }, context) => {
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { cart: productId } }
      ).populate('cart');
      
      return user;
    },
    removeCart: async (parent, { productId }, context) => {
      const user = await User.findOneAndUpdate(
        { _id: context.user._id},
        { $pull: { cart: productId } }
      ).populate('cart');

      return user;
      
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const newOrder = await Order.create({});

        for (let i = 0; i < products.length; i++) {
          const updateOrder = await Order.findOneAndUpdate(
            { _id: newOrder._id },
            {
              $addToSet: {
                productList: products[i]._id,
              },
            }
          );
        }

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: newOrder._id } }
        );

        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
  },
};

module.exports = resolvers;
