import { db } from "../../db.js";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      const result = db.products.find(
        (product) => product.id === args.productId
      );

      return result;
    },
  },
};
